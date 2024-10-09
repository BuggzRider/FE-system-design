"use strict";
const dummyfetch = async (data, seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), seconds);
    })
}


class CacheManager {
    static instance = null;
    cache = {}
    constructor() {
        if (CacheManager.instance) {
            return CacheManager.instance;
        }
        CacheManager.instance = this;
    }
    clearCache(key) {
        const item = this.cache[key]
        delete this.cache[key]
        return item
    }
    clearAllCache() {
        let obj = this.cache
        this.cache = {}
        return obj
    }
}


class FetchWrapper {
    constructor() {
        this.cacheManager = new CacheManager()
        this.clearAllCache = this.cacheManager.clearAllCache
    }

    #minutesToMilliseconds(minutes) {
        return minutes * 60 * 1000
    }

    startTimerToClear(minutes, key) {
        setTimeout(() => this.cacheManager.clearCache(key), this.#minutesToMilliseconds(minutes))
    }
    async callfetch(url, queryParams, cacheOptions, key) {
        const queryKey = `${key}-${JSON.stringify(queryParams)}`
        const { clearAfter = 30, freshFetch = false, responseIntime } = cacheOptions
        if (this.cacheManager.cache[queryKey] && !freshFetch) {
            return { data: this.cacheManager.cache[queryKey], clearCache: this.cacheManager.clearCache }
        }
        return dummyfetch("url", responseIntime)
            .then(data => {
                this.cacheManager.cache[queryKey] = data
                if (clearAfter) {
                    this.startTimerToClear(clearAfter, queryKey)
                }
                return {
                    data,
                    clearCache: () => {
                        this.cacheManager.clearCache(queryKey)
                    }
                };
            })
            .catch(error => error)
    }
}

const main = async () => {
    const fetchWrapper = () => new FetchWrapper()
    const wrapper = fetchWrapper();

    const query = "hello", params = "world", key = "test1"
    const getData = await wrapper.callfetch("url", { query, params }, { clearAfter: 30, freshFetch: true, responseIntime: 1000 }, key);
    console.log("wrapper", wrapper)
    console.log("getData", getData)
    getData.clearCache()
    wrapper.clearAllCache()
    console.log("getData", getData)
    return;
}

main()


// getData.clearCache()
// wrapper.clearAllCache()