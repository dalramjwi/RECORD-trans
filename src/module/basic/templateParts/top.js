const topTemplate = {
  /**
   * 기본 html top
   * @param {string} name 삽입할 css 이름
   */
  baseTop: function (name) {
    return `<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sorock</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Black+Han+Sans&family=Do+Hyeon&family=Noto+Serif+KR:wght@200..900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="./${name}.css">
      </head>
      <body>
      `;
  },
  /**
   * metadata에 시간 삽입하는 html top
   * @param {string} name 삽입할 css 이름
   * @param {number} date 기록할 시간 number - getCurrentDate 함수 사용함
   */
  pageTop: function (name, date) {
    return `<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="date" content="${date}" id="currentDate">
        <title>Sorock</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Black+Han+Sans&family=Do+Hyeon&family=Noto+Serif+KR:wght@200..900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="./${name}.css">
      </head>
      <body>
      `;
  },
};
module.exports = topTemplate;
