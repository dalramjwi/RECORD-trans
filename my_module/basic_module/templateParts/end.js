const endTemplate = {
  /**
   * 기본 html end
   * @param {string} name 삽입할 js 이름
   */
  baseEnd: function (name) {
    return `</body>
  <script type="module" src="./${name}.js"></script>
            </html>`;
  },
};
module.exports = endTemplate;
