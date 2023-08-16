export const getFibSequence = (num: number) => {
  const fibSequence = [1, 1];
  const fibSequenceMatrixed = [[1], [1, 1]];

  for (let i = 1; i < num; i++) {
    fibSequence.push(fibSequence[i - 1] + fibSequence[i]);
    fibSequenceMatrixed.push([...fibSequence]);
  }

  return fibSequenceMatrixed;
};
