import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { InputWithButton } from "../input-with-button/input-with-button";
import { Circle } from "../ui/circle/circle";
import { useState, useEffect, useRef, useCallback } from "react";
import { ElementStates } from "../../types/element-states";
import { ChangeEvent } from "react";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fibSequence, setFibSequence] = useState<number[]>([]);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const getFibSequence = (num: number) => {
    const fibArr = [0, 1];
    const fibMatrix = [[0], [0, 1]];

    for (let i = 2; i <= num; i++) {
      fibArr.push(fibArr[i - 2] + fibArr[i - 1]);
      fibMatrix.push([...fibArr]);
    }

    return fibMatrix;
  };

  const onDisplayClick = useCallback(() => {
    const matrix = getFibSequence(+input);

    setIsLoading(true);

    let step = 0;

    const timerId = setInterval(() => {
      if (step < matrix.length) {
        setFibSequence(matrix[step]);
        step++;
      } else {
        clearInterval(timerId);
        setIsLoading(false);
        // setInput("");
      }
    }, 500);
  }, [input]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <InputWithButton
          input={input}
          onInputChange={onInputChange}
          onDisplayClick={onDisplayClick}
        />
        <div className={styles.display}>
          <ul className={styles.list}>
            {fibSequence &&
              fibSequence.map((number, i) => {
                return (
                  <li key={i} className={styles.list__item}>
                    <Circle letter={number.toString()} />
                    <p className={styles.index}>{i}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </SolutionLayout>
  );
};
