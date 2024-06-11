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
    <div id="${tag}">${tag}</div>
  </div>`;
  },
  /**
   * form으로 감싸져 있는 버튼 리터럴 (2개) 생성 함수
   * @param {string} btn button id
   * @param {string} textOne button Text One
   * @param {string} textTwo button Text Two
   */
  btn: function (btn, textOne, textTwo) {
    return `<div id="${btn}">
    <form action="./su" method="post">
      <button type="submit" id = "su">${textOne}</button>
    </form>
    <form action="./sak" method="post" id = "sakform">
      <button type="submit" id = "sak">${textTwo}</button>
    </form>
  </div>`;
  },
  /**
   * list 리터럴로 제작하는 함수
   * @param {string} listIdOne list ID One (titleSelect)
   * @param {string} listIdTwo list ID Two (contentSelect)
   * @param {string} listIdThree list ID Three (tagSelect)
   */
  menu: function (listIdOne, listIdTwo, listIdThree) {
    return `<div id = "menu"> <li id ="${listIdOne}"></li>
  <li id ="${listIdTwo}"></li><li id ="${listIdThree}"></li></div>
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

  drop: `<ul id = "drop"><li id = "selectmenu">검색 방식&#9663;</li><li id = "titlelist">제목</li><li id ="contentlist">내용</li><li id ="taglist">태그</li></ul>`,
};
module.exports = partTemplate;
