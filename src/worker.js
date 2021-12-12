const workerCode = () => {
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = function (e) {
    let counter = 0;

    for (let i = 0; i < 1e10; i++) {
      counter += 1;
    }

    postMessage(counter);
  };
};

const codeStr = workerCode.toString();

const code = codeStr.substring(
  codeStr.indexOf("{") + 1,
  codeStr.lastIndexOf("}")
);

const blob = new Blob([code], { type: "application/javascript" });
const workerScript = URL.createObjectURL(blob);

export default workerScript;
