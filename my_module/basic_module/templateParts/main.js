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
   *
   * @param {*} sOne
   * @param {*} sTwo
   */
  aside: function (sOne, sTwo) {
    return `<aside>
    <div id="sidebar">
      <div id="sOne">${sOne}</div>
      <div id="sTwo">${sTwo}</div>
    </div>
    </aside>`;
  },
  /**
   * root part 함수
   * @param {function} rOne
   * @param {function} rTwo
   */
  root: function (rOne, rTwo) {
    return `<div id="root">
      <div id="main">
        <div id="rOne">${rOne}</div>
        <div id="rTwo">${rTwo}</div>
      </div>
    </div>`;
  },
};
module.exports = mainTemplate;
