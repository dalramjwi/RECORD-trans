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
  reqUrlSet(req, res, "searchcontent", reqFunctionSet.functionSearchContent);
  reqUrlSet(req, res, "searchtag", reqFunctionSet.functionSearchTag);
  reqUrlSet(req, res, "data/su", reqFunctionSet.functionSu);
  reqUrlSet(req, res, "suwrite", reqFunctionSet.functionSuWrite);

  if (req.url === "/searchtitle") {
    let body = "";
    req.on("data", (data) => {
      body += data.toString();
    });
    req.on("end", () => {
      let Jparse = qs.parse(body);
      let jparse = JSON.stringify(Jparse);
      let resObj = { title: false };
      let parseObj = JSON.stringify(resObj);
      let obj = JSON.parse(parseObj);
      // console.log(parse.search);

      fs.readFile("./public/titleData.json", (err, data) => {
        let parse = JSON.parse(data);
        let jArr = [];
        jArr.push(Jparse.search);
        console.log(Jparse.search);
        function templateList(data) {
          let decode = decodeURI(data);
          let parse = JSON.parse(decode);
          let list = "<ul>";
          for (let i = 0; i < jArr.length; i++) {
            list =
              list + `<li><a href="./data/${jArr[i]}.html">${jArr[i]}</a></li>`;
            `<li>리스트생성</li>`;
          }
          list = list + "</ul>";
          return list;
        }
        const htmlList = `${templateList(data)}`;
        if (parse.includes(Jparse.search)) {
          res.end(template.searchTemplate(htmlList));
        } else {
          res.end(template.alertFindTemplate(Jparse.search));
        }
      });
      // console.log(obj);
    });
  }
  if (req.url === "/searchcontent") {
    let body = "";
    req.on("data", (data) => {
      body += data.toString();
    });
    req.on("end", () => {
      let Jparse = qs.parse(body);
      let jparse = JSON.stringify(Jparse);
      // let parseObj = JSON.stringify(resObj);
      // let obj = JSON.parse(parseObj);
      // console.log(parse.search);
      fs.readFile("./public/objectData.json", (err, data) => {
        let objectData = JSON.parse(data);
        let match = Jparse.search;
        let cArr = [];
        let tArr = [];
        let titlename = [];
        for (let i = 0; i < objectData.length; i++) {
          let text = objectData[i].text;
          let content = text.content;
          cArr.push(content);
          tArr.push(text);
          if (tArr[i].content === match) {
            titlename.push(tArr[i].title);
          } else {
            ("해당 파일이 존재하지 않습니다.");
          }
        }
        function templateList() {
          let list = "<ul>";
          for (let i = 0; i < titlename.length; i++) {
            list =
              list +
              `<li><a href="./data/${titlename[i]}.html">${titlename[i]}</a></li>`;
            `<li>리스트생성</li>`;
          }
          list = list + "</ul>";
          return list;
        }
        const htmlList = `${templateList()}`;
        if (cArr.includes(Jparse.search)) {
          res.end(template.searchTemplate(htmlList));
        } else {
          res.end(template.alertFindTemplate(match));
        }
      });
    });
  }
  if (req.url === "/searchtag") {
    let body = "";
    req.on("data", (data) => {
      body += data.toString();
    });
    req.on("end", () => {
      let Jparse = qs.parse(body);
      let jparse = JSON.stringify(Jparse);
      // let parseObj = JSON.stringify(resObj);
      // let obj = JSON.parse(parseObj);
      // console.log(parse.search);
      fs.readFile("./public/objectData.json", (err, data) => {
        let objectData = JSON.parse(data);
        let match = Jparse.search;
        let cArr = [];
        let tArr = [];
        let titlename = [];
        for (let i = 0; i < objectData.length; i++) {
          let text = objectData[i].text;
          let tag = text.tag;
          cArr.push(tag);
          tArr.push(text);
          if (tArr[i].tag === match) {
            titlename.push(tArr[i].title);
          } else {
            ("해당 파일이 존재하지 않습니다.");
          }
        }
        function templateList() {
          let list = "<ul>";
          for (let i = 0; i < titlename.length; i++) {
            list =
              list +
              `<li><a href="./data/${titlename[i]}.html">${titlename[i]}</a></li>`;
            `<li>리스트생성</li>`;
          }
          list = list + "</ul>";
          return list;
        }
        const htmlList = `${templateList()}`;
        if (cArr.includes(Jparse.search)) {
          res.end(template.searchTemplate(htmlList));
        } else {
          res.end(template.alertFindTemplate(match));
        }
      });
    });
  }
  if (req.url === "/data/su") {
    let body = "";
    req.on("data", (data) => {
      body += data.toString();
    });
    req.on("end", () => {
      let Jparse = qs.parse(body);
      let jparse = JSON.stringify(Jparse);
      const readJsonFilePath = path.join(__dirname, `../public/data`);
      let referer = req.headers.referer;
      let refererSplit = referer.split("/");
      let parserefer = refererSplit[4];
      let namerefer = decodeURI(parserefer);
      let datatitle = namerefer.split(".")[0];
      let cArr = [];
      let tArr = [];
      //todo 해당 제목을 objectDadta에서 조회해 그 해당 데이터의 제목, 내용, 태그 가져와 value값에 삽입
      fs.readFile("./public/objectData.json", (err, data) => {
        let objectData = JSON.parse(data);
        // let match = Jparse.search;
        for (let i = 0; i < objectData.length; i++) {
          let text = objectData[i].text;
          let title = text.title;
          tArr.push(title);
          if (tArr[i] === datatitle) {
            let ptitle = text.title;
            let pcontent = text.content;
            let ptag = text.tag;
            deleteJSON("title", ptitle);
            deleteJSON("content", pcontent);
            deleteJSON("tag", ptag);
            fs.unlink(`${readJsonFilePath}/${ptitle}.html`, (err, data) => {
              // console.log(data);
            });
            res.end(template.suTemplate(ptitle, pcontent, ptag));
          } else {
            // console.log("해당 파일이 존재하지 않습니다.");
          }
        }
      });
    });
    console.log(req.url);
  }
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
