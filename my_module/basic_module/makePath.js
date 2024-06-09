/**
 * 경로를 생성하는 모듈이다. - 파일 명, 파일 타입
 * @returns {string} - 생성된 경로 문자열
 */
const makePath = {
  /**
   *public 폴더 안 개별 폴더 안 파일 경로 설정 모듈이다.
   * @param {string} folderName 폴더 명
   * @param {string} fileName 파일 명
   * @param {string} fileType 파일 타입
   * @returns {string} 파일 경로
   */
  publicFolderPath: function (folderName, fileName, fileType) {
    let path = `./public/${folderName}/${fileName}.${fileType}`;
    return path;
  },
  /**
   * public 폴더 안 파일 경로 설정 모듈이다.
   * @param {string} fileName 파일 명
   * @param {string} fileType 파일 타입
   * @returns {string} 파일 경로
   */
  publicPath: function (fileName, fileType) {
    let path = `./public/${fileName}.${fileType}`;
    return path;
  },
};
module.exports = makePath;
