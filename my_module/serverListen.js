const listen = function (port) {
  server.listen(port, (err) => {
    if (err) {
      console.log("오류:", err);
    } else {
      console.log(`Server is running on port ${port}`);
    }
  });
};
module.exports = listen;
