import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { InputWithButton } from "../input-with-button/input-with-button";
import { Circle } from "../ui/circle/circle";
import { useState, useCallback } from "react";
import { ChangeEvent } from "react";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fibSequence, setFibSequence] = useState<number[]>([]);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const getFibSequence = (num: number) => {
    const fibSequence = [1, 1];
    const fibSequenceMatrixed = [[1], [1, 1]];

    for (let i = 1; i < num; i++) {
      fibSequence.push(fibSequence[i - 1] + fibSequence[i]);
      fibSequenceMatrixed.push([...fibSequence]);
    }

    return fibSequenceMatrixed;
  };

  const onDisplayClick = useCallback(() => {
    const fibSequenceMatrixed = getFibSequence(+input);

    setLoading(true);

    let step = 0;

    const timerId = setInterval(() => {
      if (step < fibSequenceMatrixed.length) {
        setFibSequence(fibSequenceMatrixed[step]);
        step++;
      } else {
        clearInterval(timerId);
        setLoading(false);
      }
    }, 500);
  }, [input]);

  const btnsArr = [
    {
      text: "Рассчитать",
      onClick: onDisplayClick,
      loader: loading,
      disabled: input === "" || Number(input) >= 20 || Number(input) < 1,
    },
  ];

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <InputWithButton
          input={input}
          onInputChange={onInputChange}
          btnsArr={btnsArr}
          isLimitText
          type="number"
          max={19}
        />
        <div className={styles.display}>
          <ul className={styles.list}>
            {fibSequence &&
              fibSequence.map((number, i) => {
                return (
                  <li key={i} className={styles.list__item}>
                    <Circle letter={number.toString()} tail={`${i}`} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </SolutionLayout>
  );
};
