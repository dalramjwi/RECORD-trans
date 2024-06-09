/**
 * json 파일의 배열에서 특정 요소를 삭제하는 함수
 *
 * @param {string} datatype 업데이트 할 데이터 파일 제목
 * @param {any} dataname 삭제할 데이터
 */

const fsFunction = require("../basic_module/fsFunction");
const makePath = require("../basic_module/makePath");

const deleteJSON = function (datatype, dataname) {
  const readPath = makePath.publicFolderPath(
    "jsondata",
    `${datatype}Data`,
    "json"
  );
  fsFunction.read(readPath, (data) => {
    let parse = JSON.parse(data);
    console.log(parse);
    for (let i = 0; i < parse.length; i++) {
      if (
        parse[i].title === dataname.title &&
        parse[i].content === dataname.content &&
        parse[i].tag === dataname.tag
      ) {
        parse.splice(i, 1);
        parse = JSON.stringify(parse);
        fsFunction.write(readPath, parse);
      }
    }
  });
};

//? export한 데이터 받아오는 명령어
//?const deleteJSON = require("./deleteJSON");

module.exports = deleteJSON;
