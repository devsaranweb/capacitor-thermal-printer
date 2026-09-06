export default class CallablePromise<T> {
    private promise;
    resolve_: (value: T) => void;
    reject_: (reason?: any) => void;
    constructor();
    resolve(value: T): CallablePromise<T>;
    reject(reason?: any): CallablePromise<T>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}
