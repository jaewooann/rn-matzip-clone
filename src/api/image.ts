import axiosInstance from './axios';

/**
 * 이미지 업로드 API
 * @param body - FormData
 * @returns 이미지 업로드 결과
 */
async function uploadImages(body: FormData): Promise<string[]> {
  const {data} = await axiosInstance.post('/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export {uploadImages};
