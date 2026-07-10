"use strict";

function createCache(maxSize = Infinity) {
    if (maxSize !== Infinity && (!Number.isInteger(maxSize) || maxSize <= 0)) {
        throw new TypeError("maxSize must be a positive integer.");
    }

    const cache = new Map();
    let hits = 0;
    let misses = 0;

    function evictIfNeeded() {
        if (cache.size < maxSize) return;

        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
    }

    function set(key, value) {
        if (cache.has(key)) {
            cache.delete(key);
        } else {
            evictIfNeeded();
        }

        cache.set(key, { value, createdAt: Date.now() });
        return value;
    }

    function get(key) {
        if (!cache.has(key)) {
            misses++;
            return undefined;
        }

        hits++;
        const entry = cache.get(key);
        cache.delete(key);
        cache.set(key, entry);
        return entry.value;
    }

    function has(key) {
        return cache.has(key);
    }

    function remove(key) {
        return cache.delete(key);
    }

    function clear() {
        cache.clear();
        hits = 0;
        misses = 0;
    }

    function size() {
        return cache.size;
    }

    function keys() {
        return [...cache.keys()];
    }

    function values() {
        return [...cache.values()].map(item => item.value);
    }

    function entries() {
        return [...cache.entries()].map(([key, item]) => ({ key, value: item.value }));
    }

    function getStats() {
        return {
            size: cache.size,
            hits,
            misses,
            hitRate: hits + misses === 0 ? "0%" : ((hits / (hits + misses)) * 100).toFixed(2) + "%"
        };
    }

    function memoize(fn) {
        return function (...args) {
            const cacheKey = JSON.stringify(args);

            if (cache.has(cacheKey)) {
                hits++;
                const entry = cache.get(cacheKey);
                cache.delete(cacheKey);
                cache.set(cacheKey, entry);
                return entry.value;
            }

            misses++;
            const result = fn(...args);
            evictIfNeeded();
            cache.set(cacheKey, { value: result, createdAt: Date.now() });
            return result;
        };
    }

    return {
        set,
        get,
        has,
        remove,
        clear,
        size,
        keys,
        values,
        entries,
        getStats,
        memoize
    };
}

function createCounter(initialCount = 0, initialStep = 1) {
    const cache = createCache();

    if (!Number.isFinite(initialCount)) {
        throw new TypeError("Initial count must be a finite number.");
    }

    if (!Number.isFinite(initialStep) || initialStep === 0) {
        throw new RangeError("Step must be a non-zero finite number.");
    }

    let count = initialCount;
    let step = initialStep;
    let history = [count];

    function invalidateCache() {
        cache.clear();
        cache.set("count", count);
        cache.set("step", step);
        cache.set("history", history);
    }

    function increment() {
        count += step;
        history.push(count);
        invalidateCache();
        return count;
    }

    function decrement() {
        count -= step;
        history.push(count);
        invalidateCache();
        return count;
    }

    function reset() {
        count = initialCount;
        history.push(count);
        invalidateCache();
        return count;
    }

    function setCount(newCount) {
        if (!Number.isFinite(newCount)) {
            throw new TypeError("Count must be a finite number.");
        }

        count = newCount;
        history.push(count);
        invalidateCache();
        return count;
    }

    function setStep(newStep) {
        if (!Number.isFinite(newStep) || newStep === 0) {
            throw new RangeError("Step must be a non-zero finite number.");
        }

        step = newStep;
        invalidateCache();
        return step;
    }

    function undo() {
        if (history.length <= 1) {
            return count;
        }

        history.pop();
        count = history[history.length - 1];
        invalidateCache();
        return count;
    }

    function clearHistory() {
        history = [count];
        invalidateCache();
    }

    function getCount() {
        return cache.get("count") ?? count;
    }

    function getStep() {
        return cache.get("step") ?? step;
    }

    function getHistory() {
        return [...(cache.get("history") ?? history)];
    }

    invalidateCache();

    return {
        increment,
        decrement,
        reset,
        setCount,
        setStep,
        undo,
        clearHistory,
        getCount,
        getStep,
        getHistory,
        cache
    };
}

const counter = createCounter(0, 1);
const countElement = document.getElementById("count");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const resetBtn = document.getElementById("resetBtn");
const undoBtn = document.getElementById("undoBtn");

function renderCounter() {
    countElement.textContent = counter.getCount();
}

incrementBtn.addEventListener("click", () => {
    counter.increment();
    renderCounter();
});

decrementBtn.addEventListener("click", () => {
    counter.decrement();
    renderCounter();
});

resetBtn.addEventListener("click", () => {
    counter.reset();
    renderCounter();
});

undoBtn.addEventListener("click", () => {
    counter.undo();
    renderCounter();
});

renderCounter();
