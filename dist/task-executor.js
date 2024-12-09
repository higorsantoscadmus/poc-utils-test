"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskExecutor = void 0;
class TaskExecutor {
    constructor(maxConcurrent) {
        this.maxConcurrent = maxConcurrent;
    }
    executeWithConcurrencyLimit(tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            const executing = new Set();
            for (const task of tasks) {
                if (executing.size >= this.maxConcurrent) {
                    yield Promise.race(executing);
                }
                const promise = Promise.resolve(task()).then(result => {
                    executing.delete(promise);
                    return result;
                });
                executing.add(promise);
                results.push(promise);
            }
            return Promise.all(results);
        });
    }
}
exports.TaskExecutor = TaskExecutor;
