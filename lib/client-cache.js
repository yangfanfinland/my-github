import { useEffect } from 'react'
import LRU from 'lru-cache'

const isServer = typeof window === 'undefined'
const DEFAULT_CACHE_KEY = 'cache'
export default function initClientCache({
  lruConfig = {},
  genCacheKeyStrate,
} = {}) {
  // Default 10 seconds
  const { maxAge = 1000 * 10, ...restConfig } = lruConfig || {}

  const lruCache = new LRU({
    maxAge,
    ...restConfig,
  })

  function getCacheKey(context) {
    return genCacheKeyStrate ? genCacheKeyStrate(context) : DEFAULT_CACHE_KEY
  }

  function cache(fn) {
    // NOT cache in server side, will be shared amony different users
    if (isServer) {
      return fn
    }

    return async (...args) => {
      const key = getCacheKey(...args)
      const cached = lruCache.get(key)
      if (cached) {
        return cached
      }
      const result = await fn(...args)
      lruCache.set(key, result)
      return result
    }
  }

  function setCache(key, cachedData) {
    lruCache.set(key, cachedData)
  }

  // Allow cient side set cache manually
  function useCache(key, cachedData) {
    useEffect(() => {
      if (!isServer) {
        setCache(key, cachedData)
      }
    }, [])
  }

  return {
    cache,
    useCache,
    setCache,
  }
}
