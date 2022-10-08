/*
 * @Author: lyttonlee lzr3278@163.com
 * @Date: 2022-10-08 10:13:26
 * @LastEditors: lyttonlee lzr3278@163.com
 * @LastEditTime: 2022-10-08 10:17:46
 * @FilePath: \ofd-lib\src\utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const imgExts: string[] = ['jpg', 'png', 'gif', 'jpeg', 'bmp'];

export const isImg = (ext: string): boolean => {
  if (ext) {
    return imgExts.includes(ext);
  }
  return false;
};
