## Query Keys

```javascript
const { data, isPending, isError, error } = useQuery({
  queryKey: ["posts", pageNumber],
  queryFn: () => getPosts(pageNumber),
  // gcTime: 5000, // Garbage Collection time for cache.
  // staleTime: 10000, // Stale time --> is time k bad data fetch karega dobara is sa pahlay dobara fetch nahi karay ga server sa data means request nahi karay ga server ko. Jub ya time pass ho jay ga to means data stale/outdated ho gaya ha ab refetch karo server sa
  // refetchInterval: 1000, // Polling, refetch after every 1 sec, if polling is enabled staleTime should be 0
  // refetchIntervalInBackground: true, // Polling, keep polling in background even if tab is not active
  placeholderData: keepPreviousData, // this will keep previous data when refetching will not show loading state
});
```
