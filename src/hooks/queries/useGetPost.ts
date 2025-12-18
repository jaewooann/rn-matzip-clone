import {getPost} from '@/api/post';
import {queryKeys} from '@/constants/key';
import {useQueryCustomOptions} from '@/types/api';
import {Post} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

function useGetPost(id?: number, queryOptions?: useQueryCustomOptions<Post>) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
    ...queryOptions,
  });
}

export default useGetPost;
