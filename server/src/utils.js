import vm from 'vm';

function evaluateAlgorithm(code, testData) {
  //   console.log('Evaluating code:', code); // Log mã để kiểm tra
  const script = new vm.Script(code);
  const context = { ...testData, result: undefined };
  vm.createContext(context);

  try {
    script.runInContext(context);
    // console.log('Execution context:', context); // Log context sau khi chạy
    return context.result;
  } catch (err) {
    return { error: err.message };
  }
}

export default evaluateAlgorithm;
