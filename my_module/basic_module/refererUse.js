/**
 * Referer를 디코딩, html의 제목 부분을 추출하는 함수
 * @param {object} req server의 request 객체
 * @returns {string} 디코딩된 Referer 문자열
 */
function refererUse(req) {
  let referer = req.headers.referer;
  let refererSplit = referer.split("/");
  let parserefer = refererSplit[4];
  let namerefer = decodeURI(parserefer);
  return namerefer;
}

module.exports = refererUse;
