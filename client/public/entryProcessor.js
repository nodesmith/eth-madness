
const byteArrayToHex = (byteArray, add0x) => {
  const result = byteArray.map(b => {
    const byte = b.toString(16);
    return byte.length === 2 ? byte : ("0" + byte);
  }).join('');

  return add0x ? ('0x' + result) : result;
}

self.addEventListener('message', function(e) {
  const result = e.data.map(({entryCompressedArray, event}) => {
    const scoreABytes = entryCompressedArray.slice(0, 8);
    const scoreBBytes = entryCompressedArray.slice(8, 16);

    const scoreA = parseInt(byteArrayToHex(scoreABytes, false), 16);
    const scoreB = parseInt(byteArrayToHex(scoreBBytes, false), 16);

    const picksBytes = entryCompressedArray.slice(16, 32);
    const picks = byteArrayToHex(picksBytes, true);

    const entryCompressed = byteArrayToHex(entryCompressedArray, true);
    return {
      transactionHash: event.transactionHash,
      entrant: event.returnValues.submitter,
      entryIndex: event.returnValues.entryIndex,
      picks,
      scoreA,
      scoreB,
      entryCompressed,
      message: event.returnValues.bracketName
    };
  });

  console.log(result);
  // debugger;
  postMessage(result);
});
