/**
 * reqFunctionSet의 콜백 함수로 사용되기 위한 함수의 모음 객체다.
 */
const reqCallback = {
  /**
   *
   * @param {*} body
   */
  callbackWrite: function (body) {
    //data parse
    let qparse = qs.parse(body);
    let parse = JSON.stringify(qparse);
    let jparse = JSON.parse(parse);
    let time = qparse.time;
    const title = jparse.title;
    const content = jparse.content;
    const tag = jparse.tag;
    //파일 위치 변수 지정
    const writeJsonFilePath = path.join(
      __dirname,
      `../public/data/${jparse.title}.json`
    );
    const readJsonFilePath = path.join(__dirname, `../public/data`);
    fs.readFile("./public/titleData.json", (err, data) => {
      let decode = decodeURI(data);
      let parse = JSON.parse(decode);
      if (parse.includes(title)) {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.end(template.alertMakeTemplate(title));
      } else {
        //전송된 데이터로 html 생성
        fs.writeFile(
          `${readJsonFilePath}/${title}.html`,
          template.htmlTempalte(title, content, tag),
          (err) => {
            // console.log(err);
          }
        );
        //전송받은 POST 데이터로 JSON DB 업데이트
        updateJSON("title", title);
        updateJSON("content", content);
        updateJSON("tag", tag);
        //object 용 JSON 제작
        objectJSON("object", qparse, getCurrentDate());
        res.writeHead(302, { Location: "/" });
        res.end();
      }
    });
  },
};
module.exports = reqCallback;
