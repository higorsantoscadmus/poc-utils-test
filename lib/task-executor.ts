export class TaskExecutor {
    maxConcurrent: number;

    constructor(maxConcurrent: number) {
        this.maxConcurrent = maxConcurrent;
    }

    async executeWithConcurrencyLimit(tasks: any) {
        const results = [];
        const executing = new Set();

        for (const task of tasks) {
            if(executing.size >= this.maxConcurrent) {
                await Promise.race(executing)
            }

            const promise = Promise.resolve(task()).then(result => {
                executing.delete(promise);
                return result;
            });

            executing.add(promise)
            results.push(promise)
        }

        return Promise.all(results);
    }
}