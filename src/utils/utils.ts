function getRandomArbitrary(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
export const createRandomArr = (
  lenMin: number,
  lenMax: number,
  ValueMin: number,
  valueMax: number
) => {
  let randomNumsArray = Array.from(
    { length: getRandomArbitrary(lenMin, lenMax) },
    () => getRandomArbitrary(ValueMin, valueMax)
  );
  console.log("newAarray", randomNumsArray);
  return randomNumsArray;
};