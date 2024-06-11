const headerTemplate = {
  /**
   * banner, search가 들어갈 자리가 존재하는 header
   * @param {function} banner
   * @param {string} search
   */
  header: function (banner, search) {
    return `<header>
    ${banner}
    ${search}
    </header>
    `;
  },
  /**
   * banner를 생성하는 함수
   * @param {string} img img 제목
   * @param {string} imgType img 종류
   * @param {string} bannerName 배너에 들어갈 제목
   */
  banner: function (img, imgType, bannerName) {
    return `<div id="banner"><div id ="bannerdiv"><img src="./img/${img}.${imgType}" id = "${img}img"><a href="/">${bannerName}</a></div>
  </div>`;
  },

  search: `<div id="search"><li id ="titleSelect"></li>
<li id ="contentSelect"></li><li id ="tagSelect"></li></div>`,
};
module.exports = headerTemplate;
