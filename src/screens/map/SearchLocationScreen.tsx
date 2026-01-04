import {Keyboard, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import SearchInput from '@/components/map/SearchInput';
import useUserLocation from '@/hooks/useUserLocation';
import useSearchLocation from '@/hooks/useSearchLocation';
import Pagination from '@/components/map/Pagination';
import SearchRegionResult from '@/components/map/SearchRegionResult';

const SearchLocationScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const {userLocation} = useUserLocation();
  const {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage} =
    useSearchLocation(searchKeyword, userLocation);

  const handleSubmitKeyword = () => {
    setSearchKeyword(keyword);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={setKeyword}
        onSubmit={handleSubmitKeyword}
        placeholder="검색할 장소를 입력해주세요."
      />
      <SearchRegionResult regionInfo={regionInfo} />
      <Pagination
        pageParam={pageParam}
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
        hasNextPage={hasNextPage}
        totalLength={regionInfo.length}
      />
    </View>
  );
};

export default SearchLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
});
