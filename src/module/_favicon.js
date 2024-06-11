/**
 * favicon이 적용되지 않은 채 그냥 반환시키는 함수이다.
 * 서버에서 모듈로서 불러오면 계속된 요청은 처리하지 못하기에 사용하기 부적합하다.
 * @returns 없음
 */
const nullfavicon = (req) => {
  if (req.url === "/favicon.ico") return;
};
module.exports = nullfavicon;
