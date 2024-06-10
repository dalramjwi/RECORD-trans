/**
 * post 요청일 때 처리 함수
 * @param {object} req http 요청 객체
 * @param {object} res http 응답 객체
 * @description post 요청의 url에 따라 reqUrlSet 함수로 실행한다.
 */
const reqUrlSet = require("./reqUrlSet");
const reqFunctionSet = require("./reqFunctionSet");

function postMethod(req, res) {
  reqUrlSet(req, res, "write", reqFunctionSet.functionWrite);
  reqUrlSet(req, res, "data/sak", reqFunctionSet.functionSak);
  reqUrlSet(req, res, "searchtitle", reqFunctionSet.functionSearchTitle);
  reqUrlSet(req, res, "searchcontent", reqFunctionSet.functionSearch);
  reqUrlSet(req, res, "searchtag", reqFunctionSet.functionSearch);
  reqUrlSet(req, res, "data/su", reqFunctionSet.functionSu);
  reqUrlSet(req, res, "suwrite", reqFunctionSet.functionSuWrite);

  if (req.url === "/suwrite") {
    let body = "";
    req.on("data", (data) => {
      body += data.toString();
    });
    req.on("end", () => {
      let Jparse = qs.parse(body);
      let jparse = JSON.stringify(Jparse);
      let parse = JSON.parse(jparse);
      let sutitle = parse.sutitle;
      let sucontent = parse.sucontent;
      let sutag = parse.sutag;
      const readJsonFilePath = path.join(__dirname, `../public/data`);
      // console.log(parse);
      fs.writeFile(
        `${readJsonFilePath}/${sutitle}.html`,
        template.htmlTempalte(sutitle, sucontent, sutag),
        (err) => {
          // console.log(err);
        }
      );
      updateJSON("title", sutitle);
      updateJSON("content", sucontent);
      updateJSON("tag", sutag);
      // fs.readFile("./public/titleData.json", (err, data) => {
      //   const parse = JSON.parse(data);
      //   // parse.splice();
      //   console.log(parse);
      // });
      res.writeHead(302, { Location: "/" });
      res.end();
    });
  }
}
module.exports = postMethod;
