const decodeAndParse = require("../basic_module/decodeAndParse");
const fsFunction = require("../basic_module/fsFunction");
const makePath = require("../basic_module/makePath");

/**
 * JSON file 전송받은 데이터로 각 각의 파일 update 하는 함수
 * @param {string} datatype 업데이트 할 데이터 파일 제목
 * @param {any} dataname 추가할 데이터
 */
const updateJSON = function (datatype, dataname) {
  const readPath = makePath.publicFolderPath(
    "jsondata",
    `${datatype}Data`,
    "json"
  );
  fsFunction.read(readPath, (data) => {
    let parse = decodeAndParse(data);
    parse.push(dataname);
    let updatedData = JSON.stringify(parse);
    fsFunction.write(readPath, updatedData);
  });
};

//? export한 데이터 받아오는 명령어
//?const updateJSON = require("./updateJSON");

module.exports = updateJSON;
