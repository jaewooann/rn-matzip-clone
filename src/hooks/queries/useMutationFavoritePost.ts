import {updateFavoritePost} from '@/api/post';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants/key';
import {UseMutationCustomOptions} from '@/types/api';
import {useMutation} from '@tanstack/react-query';

function useMutationFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updatedId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updatedId],
      });
    },
    ...mutationOptions,
  });
}

export default useMutationFavoritePost;
