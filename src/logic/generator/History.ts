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

    execute(predicate: (current: T) => boolean = () => true) {
        return Observer.of<T>(async (notify, rej) => {
            const historyAt = new Map<number, number>()

            for (let attempts = 0, i = 0; i < this.steps.length; i++, attempts++) {

                historyAt.set(i, this.index)

                if (attempts > 1000) throw new Error('Attempts exceeded')
                if (attempts > 20) {
                    const milestone = [...this.milestones].reverse().find(m => m < i)
                    const history = milestone && historyAt.get(milestone)

                    if (history !== undefined) {
                        console.log('Jumping to ', milestone, history)
                        this.rollbackTo(history)
                        i = milestone as number
                        attempts = 0
                    } else {
                        console.warn('No history at', milestone)
                    }
                }

                try {
                    await this.push(this.steps[i])
                    if (!predicate(this.current)) {
                        this.rollback()
                        throw new Error()
                    }
                    notify(this.current)
                    await Bluebird.delay(50)
                } catch (e) {
                    rej(e)
                    if (i <= 1) throw new Error('Execution impossible')
                    this.rollback()
                    i -= 2;
                }
            }
        })
    }

}