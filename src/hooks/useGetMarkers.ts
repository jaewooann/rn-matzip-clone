import {getMarkers} from '@/api/marker';
import {queryKeys} from '@/constants/key';
import {useQueryCustomOptions} from '@/types/api';
import {Marker} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

function useGetMarkers(queryOptions?: useQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkers;
