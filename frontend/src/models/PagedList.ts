export type PagedList<T> = {
    count: number;
    next?: boolean;
    previous?: boolean;
    results: T[];
}