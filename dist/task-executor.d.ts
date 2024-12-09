export declare class TaskExecutor {
    maxConcurrent: number;
    constructor(maxConcurrent: number);
    executeWithConcurrencyLimit(tasks: any): Promise<any[]>;
}
