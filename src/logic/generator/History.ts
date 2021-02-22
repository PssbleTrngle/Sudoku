import Bluebird from "bluebird";
import Observer from "./Observer";

type Step<T> = (current: T) => (T | Promise<T>)

export default class History<T extends Record<string, any>> {

    private history!: T[]
    private milestones: number[] = []

    get current() {
        return this.history[this.index];
    }

    get index() {
        return this.history.length - 1
    }

    constructor(initial: T) {
        this.history = [initial]
    }

    async push(next: Step<T>) {
        this.history = [...this.history, await next(this.current)]
        return this.index - 1
    }

    mark() {
        this.milestones = [...this.milestones, this.steps.length];
    }

    rollback(by = 1): T {
        if (by > 0) {
            if (this.history.length < 2) throw new Error('Unable to rollback')
            this.history = this.history.slice(0, this.history.length - 1)
            if (by > 1) return this.rollback(by - 1)
        }
        return this.current
    }

    rollbackTo(index: number): T {
        if (this.index < index) throw new Error('Unable to rollback')
        else this.rollback(this.index - index)
        return this.current
    }

    steps: Step<T>[] = []
    step(step: Step<T>) {
        this.steps.push(step)
    }

    execute() {
        return Observer.of<T>(async (notify, rej) => {
            const historyAt = new Map<number, number>()
            let jump = 0
            let milestonesDone = 0

            for (let attempts = 0, i = 0; i < this.steps.length; i++, attempts++) {

                const previousMilestones = [...this.milestones].reverse().filter(m => m < i)

                historyAt.set(i, this.index)

                if (attempts > 1000) throw new Error('Attempts exceeded')

                if (attempts > 20) {
                    const milestone = previousMilestones[Math.min(previousMilestones.length - 1, jump)]
                    const history = milestone && historyAt.get(milestone)

                    if (history !== undefined) {
                        this.rollbackTo(history)
                        i = milestone
                        attempts = 0
                        jump++
                    } else {
                        console.warn('No history at', milestone)
                    }
                }

                try {
                    const m = milestonesDone
                    milestonesDone = previousMilestones.length

                    await this.push(this.steps[i])

                    if (m < milestonesDone) {
                        jump = 0
                        notify(this.current)
                        await Bluebird.delay(30)
                    }

                } catch (e) {
                    rej(e)
                    if (i <= 1) throw new Error('Execution impossible')
                    this.rollback()
                    i -= 2;
                }
            }

            notify(this.current)
        })
    }

}