//*get 요청일때 처리 함수
function getMethod(req, res, filePath, contentType) {
  // console.log(req.url);
  //*기본 접속일 때 createTemplate 보여주기
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    //*titleData.json 읽어와 리스트 생성
    fs.readFile("./public/titleData.json", (err, data) => {
      function templateList(data) {
        let decode = decodeURI(data);
        let parse = JSON.parse(decode);
        let list = "<ul>";
        for (let i = parse.length - 1; i > parse.length - 6; i--) {
          if (parse[i] === undefined) {
            list =
              list +
              `<li style="visibility: hidden;"><a href="./public/data/${parse[i]}.html">${parse[i]}</a></li>`;
          } else {
            list =
              list +
              `<li><a href="./data/${parse[i]}.html">${parse[i]}</a></li>`;
          }
        }
        list = list + "</ul>";
        return list;
      }
      const htmlList = `${templateList(data)}`;
      res.end(template.createTemplate(htmlList));
    });
    //*이외에는 자동으로 해석
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log("오류 발생 : ", err);
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }
}
module.exports = getMethod;
