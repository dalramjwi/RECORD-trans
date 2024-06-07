/**
 * favicon이 적용되지 않은 채 그냥 반환시키는 함수이다.
 * @returns 없음
 */
const nullfavicon = (req) => {
  if (req.url === "/favicon.ico") return;
};
module.exports = nullfavicon;
