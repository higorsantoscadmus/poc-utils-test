import { Logger } from "@nestjs/common";

export function LogExecutionTime(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function(...args: any[]) {
            const startTime = Date.now();
            const result = await originalMethod.apply(this, args);
            const endTime = Date.now();
            const executionTime = endTime - startTime;
            Logger.log(`Method ${String(propertyKey)} executionTime: ${executionTime}ms`, target.constructor.name)
            return result
        }
        return descriptor;
    }
}