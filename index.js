const getIncrNumString = (lastValue, value) => `${lastValue + value} `;
const getDecrNumString = (lastValue, value) => `${lastValue - value} `;
const getDecrStartPosition = (lastIndex, index, startPosition, widthMatrix) =>
  startPosition + 1 * index - lastIndex * widthMatrix;
const getIncrStartPosition = (lastIndex, index, startPosition, widthMatrix) =>
  startPosition - 1 * index + lastIndex * widthMatrix;

function getNums(numString, i, startPosition, widthMatrix) {
  if (i > widthMatrix) return numString;
  let incrNumsString = '';
  let decrNumsString = '';
  // handle last iteration
  if (i === widthMatrix) {
    for (let j = 0; j < i - 1; j += 1) {
      decrNumsString += getDecrNumString(startPosition - j, 1);
    }
    return getNums(`${numString}${decrNumsString}`, i + 1, startPosition, widthMatrix);
  }
  // handle uneven index iteration
  if (i % 2 !== 0) {
    for (let j = 0; j < i; j += 1) {
      decrNumsString += getDecrNumString(startPosition - j, 1);
      incrNumsString += getIncrNumString(getIncrStartPosition(j, i, startPosition, widthMatrix), widthMatrix);
    }
    const newStartPosition = getIncrStartPosition(i, i, startPosition, widthMatrix);
    return getNums(`${numString}${decrNumsString}${incrNumsString}`, i + 1, newStartPosition, widthMatrix);
  }
  // handle even index iteration
  for (let j = 0; j < i; j += 1) {
    incrNumsString += getIncrNumString(startPosition + j, 1);
    decrNumsString += getDecrNumString(getDecrStartPosition(j, i, startPosition, widthMatrix), widthMatrix);
  }
  const newStartPosition = getDecrStartPosition(i, i, startPosition, widthMatrix);
  return getNums(`${numString}${incrNumsString}${decrNumsString}`, i + 1, newStartPosition, widthMatrix);
}

module.exports = function getResult(n) {
  const widthMatrix = 2 * n - 1;
  const startPosition = Math.ceil(widthMatrix ** 2 / 2);
  return getNums(`${startPosition} `, 1, startPosition, widthMatrix);
};
