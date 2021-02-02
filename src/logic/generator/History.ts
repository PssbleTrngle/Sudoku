import Bluebird from "bluebird";

type Step<T> = (current: T) => (T | Promise<T>)
type Subscriber<T> = (value: T) => unknown

export default class History<T extends Record<string, any>> {

    private history!: T[]

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
            for (let attempts = 0, i = 0; i < this.steps.length; i++, attempts++) {
                if (attempts > 1000) throw new Error('Attempts exceeded')
                try {
                    await this.push(this.steps[i])
                    if (!predicate(this.current)) {
                        this.rollback()
                        throw new Error()
                    }
                    notify(this.current)
                    await Bluebird.delay(300)
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

export class Observer<T> {

    private valueSubs = new Set<Subscriber<T>>()
    private finishSubs = new Set<Subscriber<void>>()
    private errorSubs = new Set<Subscriber<Error>>()

    static of<T>(runner: (
        notify: (t: T) => void,
        rej: (e: Error) => void,
    ) => Promise<void>, timeout?: number) {
        const observer = new Observer<T>()

        const promise = new Bluebird((res, rej) => setTimeout(() =>
            runner(
                t => observer.notify(t),
                e => observer.error(e),
            ).then(res).catch(rej), 0)
        )

        const applied = (timeout ? promise.timeout(timeout, 'Timed out') : promise)
            .then(() => observer.finish())
            .catch(e => observer.error(e))
            .then(() => observer.clear())

        observer.then(() => applied.cancel())

        return observer;
    }

    error(e: Error) {
        this.errorSubs.forEach(s => s(e))
    }

    private clear() {
        this.finishSubs.clear()
        this.errorSubs.clear()
        this.valueSubs.clear()
    }

    cancel(reason?: string) {
        if (reason) this.error(new Error(reason))
        this.finish()
        this.clear()
    }

    finish() {
        this.finishSubs.forEach(s => s())
    }

    notify(t: T) {
        this.valueSubs.forEach(s => s(t))
    }

    catch(sub: Subscriber<Error>) {
        this.errorSubs.add(sub)
        return this;
    }

    finally(sub: Subscriber<void>) {
        this.errorSubs.add(() => sub())
        this.finishSubs.add(sub)
        return this
    }

    subscribe(sub: Subscriber<T>) {
        this.valueSubs.add(sub)
        return this;
    }

    unsubscribe(sub: Subscriber<unknown>) {
        const list = [
            this.valueSubs,
            this.errorSubs,
            this.finishSubs,
        ]
        list.forEach(l => l.delete(sub))
        if (!list.some(l => l.size > 0)) this.finish()
    }

    then(sub: Subscriber<void>) {
        this.finishSubs.add(sub)
        return this;
    }

}