/**
 * JSON file 전송받은 데이터로 파일 update 하는 함수
 * @param {string} datatype 업데이트 할 데이터 파일 제목
 * @param {any} dataname 추가할 데이터
 * @param {string} time 추가할 작성 시간
 */

const objectJSON = function (datatype, dataname, time) {
  const fs = require("fs");
  fs.readFile(`./public/${datatype}Data.json`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let parse = JSON.parse(data);
      let object = {
        time: time,
        text: dataname,
      };
      parse.push(object);
      let parsetitlePush = JSON.stringify(parse);
      fs.writeFile(
        `./public/${datatype}Data.json`,
        `${parsetitlePush}`,
        (err, data) => {}
      );
    }
  });
};

//? export한 데이터 받아오는 명령어
//?const updateJSON = require("./updateJSON");

module.exports = objectJSON;
