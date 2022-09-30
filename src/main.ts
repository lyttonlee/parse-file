import jszip from 'jszip';
import * as jszipUtils from 'jszip-utils';
import { serFils } from './types/file';
export function parseFile(file: File | string) {
  return new Promise(async (resolve) => {
    if (typeof file === 'string') {
      // fetch url
      jszipUtils.getBinaryContent(file, {
        callback: async function (err: any, data: ArrayBuffer) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            const res = await readFile(data);
            resolve(res);
          }
        },
        progress: function (progress: any) {
          console.log(progress);
        },
      });
    } else {
      const res = await readFile(file);
      console.log(res);
      resolve(res);
    }
  });
}

async function readFile(file: File | ArrayBuffer) {
  return new Promise(async (resolve, reject) => {
    try {
      const zips = await jszip.loadAsync(file);
      console.log(zips);
      const serFiles: serFils = {};
      const files = zips.files;
      let len: number = Object.keys(files).length;
      let start = 0;
      Object.keys(files).forEach(async (key) => {
        if (key.includes('xml') || key.includes('json')) {
          serFiles[key] = await files[key].async('string');
          start++;
          if (start === len - 1) {
            console.log(serFiles);
            console.log('complete');
            resolve(serFiles);
          }
        }
      });
      // resolve(serFiles);
    } catch (error) {
      reject(error);
    }
  });
}

// function

// class ParseFile {
//   constructor() { }

//   parse() { }

//   onProgress(data, callback) {
//     callback(data)
//    }
// }
