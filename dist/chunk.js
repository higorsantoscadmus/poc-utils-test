"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = chunk;
function chunk(arr, size) {
    return Array.from({ "length": Math.ceil(arr.length / size) }, (_, index) => arr.slice(index * size, index * size + size));
}
