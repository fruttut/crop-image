import { fabric } from 'fabric';

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`failed to read file ${file.name}`));
    reader.onabort = () => reject(new Error(`reading file ${file.name} was aborted`));
    reader.onload = (event) => resolve(event.target.result);
    reader.readAsDataURL(file);
  });
};

export const loadFabricImageFromURL = (url, options) => {
  return new Promise((resolve, reject) => {
    const callback = (image, err) => {
      if (err) {
        reject(new Error(`failed to load fabric image`));
      } else {
        resolve(image);
      }
    };
    fabric.Image.fromURL(url, callback, options);
  });
};

export const loadFabricImageFromFile = async (file, options) => {
  const dataURL = await readFileAsDataURL(file);
  return loadFabricImageFromURL(dataURL, options);
};
