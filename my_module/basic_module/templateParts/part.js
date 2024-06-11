const partTemplate = {
  /**
   * 전송받은 title, content, tag data로 리터럴을 작성하는 함수
   * @param {string} title title part
   * @param {content} content content part
   * @param {tag} tag tag part
   */
  text: function (title, content, tag) {
    return `<div id="currentDate">
    <div id="title">${title}</div>
    <div id="content">${content}</div>
    <div id="tag">${tag}</div>
  </div>`;
  },
  /**
   * form으로 감싸져 있는 버튼 리터럴 (2개) 생성 함수
   * @param {string} btn button id
   */
  btn: function (btn) {
    return `<div id="${btn}">
    <form action="./su" method="post">
      <button type="submit" id = "su">수정</button>
    </form>
    <form action="./sak" method="post" id = "sakform">
      <button type="submit" id = "sak">삭제</button>
    </form>
  </div>`;
  },
  /**
   * list 리터럴로 제작하는 함수
   */
  menu: function () {
    return `<div id = "menu"> <li id ="titleSelect"></li>
  <li id ="contentSelect"></li><li id ="tagSelect"></li></div>
 `;
  },
  /**
   * alert 창 대신 보여주는 html 창 생성 리터럴 템플릿 - 제목 존재
   * @param {string} title title Name
   */
  alertMake: function (title) {
    return `
 <form action="/write" method="post">
 <h1>"${title}"</h1>
 <p>이 제목의 문서가 이미 존재합니다. 다른 제목으로 새 문서를 만드세요.</p>
 <button type="button" onclick="location.href='/'">예</button>
</form>
 `;
  },
  /**
   * alert 창 대신 보여주는 html 창 생성 리터럴 템플릿 - 검색 비존재
   * @param {string} title title Name
   */
  alertFind: function (title) {
    return `
 <form action="/write" method="post">
 <h1>"${title}"</h1>
 <p>해당 텍스트를 포함한 문서가 존재하지 않습니다. 다른 검색어로 검색하세요.</p>
 <button type="button" onclick="location.href='/'">예</button>
</form>
 `;
  },
  /**
   * form - input 리터럴로 작성 함수
   * @param {string} title title name
   * @param {string} content content name
   * @param {tag} tag tag name
   */
  suForm: function (title, content, tag) {
    return ` <form action="/suwrite" method="post">
    <input type="text" name="title" id="title" value = "${title}">
    <input type="text" name="content" id="content" value = "${content}">
    <input type="text" name="tag" id="tag" value = "${tag}">
    <button type="submit">작성</button>
   </form>`;
  },
};
module.exports = partTemplate;
