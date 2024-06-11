const mainTemplate = {
  /**
   * main part 함수
   * @param {Function} aside aside part function
   * @param {Function} root root part function
   */
  main: function (aside, root) {
    return `<main>
    ${aside}
    ${root}
    </main>
    `;
  },
  /**
   * aside part 함수
   * @param {string} rOneId ID
   * @param {string} rTwoId ID
   * @param {function} rOne text 및 함수 결과
   * @param {function} rTwo text 및 함수 결과
   */
  aside: function (sOneId, sTwoId, sOne, sTwo) {
    return `<aside>
    <div id="sidebar">
      <div id="${sOneId}">${sOne}</div>
      <div id="${sTwoId}">${sTwo}</div>
    </div>
    </aside>`;
  },
  /**
   * root part 함수
   * @param {string} rOneId ID
   * @param {string} rTwoId ID
   * @param {function} rOne text 및 함수 결과
   * @param {function} rTwo text 및 함수 결과
   */
  root: function (rOneId, rTwoId, rOne, rTwo) {
    return `<div id="root">
      <div id="main">
        <div id="${rOneId}">${rOne}</div>
        <div id="${rTwoId}">${rTwo}</div>
      </div>
    </div>`;
  },
};
module.exports = mainTemplate;
