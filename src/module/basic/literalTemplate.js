const getCurrentDate = require("../post/postMethod/getCurrentDate");
const topTemplate = require("./templateParts/top");
const headerTemplate = require("./templateParts/header");
const mainTemplate = require("./templateParts/main");
const partTemplate = require("./templateParts/part");
const endTemplate = require("./templateParts/end");

const template = {
  htmlTempalte: function (title, content, tag) {
    return (
      topTemplate.pageTop("./css/page", getCurrentDate()) +
      headerTemplate.header(
        headerTemplate.banner("record", "png", "수록"),
        headerTemplate.search
      ) +
      mainTemplate.main(
        mainTemplate.aside("joy", "my", "", ""),
        mainTemplate.root("htmlList", "write", "", "")
      ) +
      `<div id = "page">` +
      partTemplate.text(title, content, tag) +
      partTemplate.btn("btn", "수정하기", "삭제하기") +
      `</div>` +
      endTemplate.baseEnd("./js/page")
    );
  },

  createTemplate: function (htmlList) {
    return (
      topTemplate.baseTop("./html/css/index") +
      headerTemplate.header(
        headerTemplate.banner("record", "png", "수록"),
        headerTemplate.search
      ) +
      partTemplate.drop +
      mainTemplate.main(
        mainTemplate.aside("joy", "my", "", ""),
        mainTemplate.root("htmlList", "write", `${htmlList}`, "")
      ) +
      endTemplate.baseEnd("./html/js/index")
    );
  },
  searchTemplate: function (searchList) {
    return (
      topTemplate.baseTop("./html/css/search") +
      headerTemplate.header(
        headerTemplate.banner("record", "png", "수록"),
        headerTemplate.search
      ) +
      partTemplate.drop +
      mainTemplate.main(
        mainTemplate.aside("joy", "my", "", ""),
        mainTemplate.root("htmlList", "write", searchList, "")
      ) +
      endTemplate.baseEnd("./html/js/search")
    );
  },
  alertMakeTemplate: function (title) {
    return (
      topTemplate.baseTop("./html/css/search") +
      headerTemplate.header(
        headerTemplate.banner("record", "png", "수록"),
        headerTemplate.search
      ) +
      mainTemplate.main(
        mainTemplate.aside("joy", "my", "", ""),
        mainTemplate.root("htmlList", "write", ``, "")
      ) +
      partTemplate.alertMake(title) +
      endTemplate.baseEnd("./html/js/search")
    );
  },
  alertFindTemplate: function (title) {
    return (
      topTemplate.baseTop("./html/css/search") +
      headerTemplate.header(
        headerTemplate.banner("record", "png", "수록"),
        headerTemplate.search
      ) +
      mainTemplate.main(
        mainTemplate.aside("joy", "my", "", ""),
        mainTemplate.root("htmlList", "write", ``, "")
      ) +
      partTemplate.alertFind(title) +
      endTemplate.baseEnd("./html/js/search")
    );
  },
  suTemplate: function (title, content, tag) {
    return (
      topTemplate.baseTop("./css/su") +
      headerTemplate.header(
        headerTemplate.banner("record", "png", "수록"),
        headerTemplate.search
      ) +
      mainTemplate.main(
        mainTemplate.aside("joy", "my", "", ""),
        mainTemplate.root("htmlList", "write", ``, "")
      ) +
      partTemplate.suForm(title, content, tag) +
      endTemplate.baseEnd("./js/su")
    );
  },
};

// export한 데이터 받아오는 명령어
//? const template = require("./literalTemplate");
module.exports = template;
