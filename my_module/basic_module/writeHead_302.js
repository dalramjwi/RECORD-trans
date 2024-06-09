/**
 * writeHead, location을 사용할 때를 함수화시켜 간단히 호출할 수 있도록 만든 함수
 * @param {object} res http 요청 객체
 * @returns res.writeHead(302, { Location: "/" }); 의 리터럴
 */
const writeHead_302 = function (res) {
  return res.writeHead(302, { Location: "/" });
};
module.exports = writeHead_302;
