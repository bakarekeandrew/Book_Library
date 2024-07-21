// // src/utils/storage.ts
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const storeData = async (key: string, value: any) => {
//   try {
//     await AsyncStorage.setItem(key, JSON.stringify(value));
//   } catch (e) {
//     console.error('Error saving data', e);
//   }
// };

// export const getData = async (key: string) => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     return value != null ? JSON.parse(value) : null;
//   } catch (e) {
//     console.error('Error reading data', e);
//   }
// };




// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving data', e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error reading data', e);
  }
};
