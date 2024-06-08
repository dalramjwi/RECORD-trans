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
        list + `<li><a href="./data/${parse[i]}.html">${parse[i]}</a></li>`;
    }
  }
  list = list + "</ul>";
  return list;
}
