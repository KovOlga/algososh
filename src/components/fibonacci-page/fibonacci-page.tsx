import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { InputWithButton } from "../input-with-button/input-with-button";
import { Circle } from "../ui/circle/circle";
import { useState, useCallback } from "react";
import { getFibSequence } from "./utils";
import { Buttons } from "../../types/buttons";
import { useForm } from "../../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fibSequence, setFibSequence] = useState<number[]>([]);
  const { values, handleChange } = useForm<{ input: string }>({
    input: "",
  });

  const onDisplayClick = useCallback(() => {
    const fibSequenceMatrixed = getFibSequence(+values.input);
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
    }, SHORT_DELAY_IN_MS);
  }, [values]);

  const btnsArr = [
    {
      text: Buttons.Count,
      onClick: onDisplayClick,
      loader: loading,
      disabled:
        values.input === "" ||
        Number(values) >= 20 ||
        Number(values) < 1 ||
        Number(values.input) > 19 ||
        Number(values.input) < 0,
    },
  ];

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div data-testid="fibonacci-page" className={styles.container}>
        <InputWithButton
          onInput={handleChange}
          isLimitText
          type="number"
          max={19}
          name="input"
          value={values.input}
          btnsArr={btnsArr}
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
