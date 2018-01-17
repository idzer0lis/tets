/* eslint-disable no-use-before-define */
module.exports = {
  copyStreams,
};
/* eslint-enable no-use-before-define */

function copyStreams(writeStream, readStream) {
  return new Promise((resC) => {
    let resCalled = false;

    writeStream.on('error', (err) => {
      if (!resCalled) {
        resCalled = true;
        resC({ error: err });
      }
    });
    readStream.on('error', (err) => {
      if (!resCalled) {
        resCalled = true;
        resC({ error: err });
      }
    });
    readStream.on('close', () => {
      if (!resCalled) {
        resCalled = true;
        resC({ error: null });
      }
    });
    writeStream.on('close', () => {
      if (!resCalled) {
        resCalled = true;
        resC({ error: null });
      }
    });

    readStream.pipe(writeStream);
  });
}
