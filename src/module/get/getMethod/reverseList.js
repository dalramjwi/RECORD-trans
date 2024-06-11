/**
 * 역 순의 a 링크를 지닌 list를 만드는 반복문이다.
 * 존재하지 않는 리스트는 visibility를 hidden으로 처리한다.
 * @param {array} array 링크를 생성할 배열
 * @return {string} <ul><li><a></a></li></ul> 의 형태로 생성된 리스트
 */
function reverseList(array) {
  let list = "<ul>";
  for (let i = array.length - 1; i > array.length - 6; i--) {
    if (array[i] === undefined) {
      list += `<li style="visibility: hidden;"></li>`;
    } else {
      list += `<li><a href="./html/${array[i]}.html">${array[i]}</a></li>`;
    }
  }
  list += "</ul>";
  return list;
}
module.exports = reverseList;
