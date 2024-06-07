//*post 요청일때 처리 함수
function postMethod(req, res) {
  if (req.url === "/write") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
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
    });
  }
  //삭제 실행
  if (req.url === "/data/sak") {
    let body = "";
    req.on("data", (data) => {
      body += data.toString();
    });
    req.on("end", () => {
      //data parse
      let qparse = qs.parse(body);
      let parse = JSON.stringify(qparse);
      let jparse = JSON.parse(parse);
      const readJsonFilePath = path.join(__dirname, `../public/data`);
      //req.header 조회로 referer 사용 - url 조회
      let referer = req.headers.referer;
      let refererSplit = referer.split("/");
      let parserefer = refererSplit[4];
      let namerefer = decodeURI(parserefer);
      //dir 읽어 현재 url과 비교해 조건에 맞다면, 삭제
      fs.readdir(readJsonFilePath, (err, data) => {
        const dirlist = data;
        dirlist.forEach((item) => {
          if (item === namerefer) {
            fs.readFile(`${readJsonFilePath}/${namerefer}`, (err, data) => {
              let reptime = getTime(data);
              fs.readFile("./public/objectData.json", (err, data) => {
                let parse = JSON.parse(data);
                for (let i = 0; i < parse.length; i++) {
                  if (parse[i].time === reptime) {
                    let data = parse[i].text;
                    let title = data.title;
                    let content = data.content;
                    let tag = data.tag;
                    deleteJSON("content", content);
                    deleteJSON("tag", tag);
                    deleteJSON("title", title);
                    fs.unlink(`${readJsonFilePath}/${namerefer}`, (err) => {});
                  }
                }
              });
            });
          }
        });
      });
      res.writeHead(302, { Location: "/" });
      res.end();
    });
  }
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
