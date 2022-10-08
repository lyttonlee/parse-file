/*
 * @Author: lyttonlee lzr3278@163.com
 * @Date: 2022-10-08 13:36:06
 * @LastEditors: lyttonlee lzr3278@163.com
 * @LastEditTime: 2022-10-08 13:43:16
 * @FilePath: \ofd-lib\public\parse-file.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

declare function parseFile(file: File | string): Promise<any>;

export { parseFile };
