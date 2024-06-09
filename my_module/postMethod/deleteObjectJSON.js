/**
 * ObjectData.json 파일의 배열에서 특정 요소를 삭제하는 함수
 *
 * @param {object} dataname 삭제할 데이터
 */
const decodeAndParse = require("../basic_module/decodeAndParse");
const fsFunction = require("../basic_module/fsFunction");
const makePath = require("../basic_module/makePath");
const deleteJSON = require("./deleteJSON");
const deleteObjectJSON = function (dataname) {
  const readPath = makePath.publicFolderPath("jsondata", "objectData", "json");

  fsFunction.read(readPath, (data) => {
    let parse = decodeAndParse(data);
    // 객체의 세가지 요소가 일치할 경우에만...
    let updatedArray = parse.filter((item) => {
      return !(
        item.text.title === dataname.title &&
        item.text.content === dataname.content &&
        item.text.tag === dataname.tag
      );
    });
    fsFunction.write(readPath, JSON.stringify(updatedArray));
    // object, tag, title, content 데이터 삭제
    deleteJSON("object", dataname);
    deleteJSON("tag", dataname);
    deleteJSON("title", dataname);
    deleteJSON("content", dataname);
  });
};

//? export한 데이터 받아오는 명령어
//?const deleteObjectJSON = require("./deleteObjectJSON");

module.exports = deleteObjectJSON;
