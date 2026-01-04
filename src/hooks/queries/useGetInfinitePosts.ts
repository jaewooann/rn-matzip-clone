import {ThrowOnError} from './../../../node_modules/@tanstack/query-core/src/types';
import {getPosts} from '@/api/post';
import {queryKeys} from '@/constants/key';
import {ResponseError} from '@/types/api';
import {Post} from '@/types/domain';
import {
  InfiniteData,
  QueryKey,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';

function useGetInfinitePosts(
  queryOptions?: UseSuspenseInfiniteQueryOptions<
    Post[],
    ResponseError,
    InfiniteData<Post[], number>,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
