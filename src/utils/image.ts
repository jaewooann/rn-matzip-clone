import {Image} from 'react-native-image-crop-picker';

function getFormDataImages(key: string = 'images', iamges: Image[]) {
  const formData = new FormData();

  iamges.forEach(({path, mime}) => {
    const file = {
      uri: path,
      type: mime,
      name: path.split('/').pop(),
    };

    formData.append(key, file);
  });

  return formData;
}

export {getFormDataImages};
