/*
 * @Author: lyttonlee lzr3278@163.com
 * @Date: 2022-09-30 10:13:36
 * @LastEditors: lyttonlee lzr3278@163.com
 * @LastEditTime: 2022-10-08 12:22:31
 * @FilePath: \ofd-lib\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import jszip from 'jszip';
import * as jszipUtils from 'jszip-utils';
import { serFils } from './types/file';
import { isImg } from './utils';
export function parseFile(file: File | string) {
  return new Promise(async (resolve, reject) => {
    try {
      // 当输入的是 url ，先获取该资源
      if (typeof file === 'string') {
        // fetch url
        jszipUtils.getBinaryContent(file, {
          callback: async function (err: any, data: ArrayBuffer) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              // console.log(data);
              const res = await readFile(data);
              resolve(res);
            }
          },
          progress: function (progress: any) {
            console.log(progress);
          },
        });
      } else {
        // 直接解析 file
        const res = await readFile(file);
        // console.log(res);
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function readFile(file: File | ArrayBuffer) {
  return new Promise(async (resolve, reject) => {
    try {
      // 装载整个文件
      const zips = await jszip.loadAsync(file);
      // console.log(zips);
      const serFiles: serFils = {};
      const files = zips.files;
      let len: number = Object.keys(files).length;
      let start = 0;
      Object.keys(files).forEach(async (key) => {
        let ext = key.split('.').pop() || '';
        //
        if (isImg(ext)) {
          // 将图片文件按 base64 解析
          const base64 = await files[key].async('base64');
          serFiles[key] = `data:image/png;base64,${base64}`;
          start++;
          if (start === len) {
            // console.log(serFiles);
            // console.log('complete');
            resolve(serFiles);
          }
        } else {
          serFiles[key] = await files[key].async('string');
          start++;
          if (start === len) {
            // console.log(serFiles);
            // console.log('complete');
            resolve(serFiles);
          }
        }
      });
      // resolve(serFiles);
    } catch (error) {
      // 有错误先尝试直接解析文件
      const fd = new FileReader();
      fd.readAsText(file as File);
      fd.onloadend = function () {
        const content = fd.result;
        if (content) {
          resolve(content);
        } else {
          reject(new Error('未知文件，解析错误'));
        }
      };
      fd.onerror = function (err) {
        reject(err);
      };
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
