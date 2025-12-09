import {createPost} from '@/api/post';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants/key';
import {UseMutationCustomOptions} from '@/types/api';
import {useMutation} from '@tanstack/react-query';

function useMutationCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
}

export default useMutationCreatePost;
