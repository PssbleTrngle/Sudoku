import Bluebird from "bluebird"

type Subscriber<T> = (value: T) => unknown

export default class Observer<T> {

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