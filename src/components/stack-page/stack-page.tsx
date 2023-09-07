import React, { useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import styles from "./stack-page.module.css";
import { useState } from "react";
import { MouseEvent } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Buttons } from "../../types/buttons";
import { useForm } from "../../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./Stack";

export const StackPage: React.FC = () => {
  const [loading, setLoading] = useState<string>("");
  const { values, handleChange, setValues } = useForm<{ input: string }>({
    input: "",
  });
  const stackRef = useRef(new Stack<string>());
  const [stack, setStack] = useState<string[]>([]);
  const [isLastElementChanging, setIsLastElementChanging] =
    useState<Boolean>(false);

  const onAddClick = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
    stackRef.current.push(values.input);
    setIsLastElementChanging(true);
    setStack([...stackRef.current.elements]);
    setTimeout(() => {
      setIsLastElementChanging(false);
      setLoading("");
      setValues({ input: "" });
    }, SHORT_DELAY_IN_MS);
  };

  const onDeleteBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
    setIsLastElementChanging(true);
    setTimeout(() => {
      stackRef.current.pop();
      setStack([...stackRef.current.elements]);
      setIsLastElementChanging(false);
      setLoading("");
      setValues({ input: "" });
    }, SHORT_DELAY_IN_MS);
  };

  const onResetBtnClick = () => {
    stackRef.current.clear();
    setStack(stackRef.current.elements);
  };

  const btnsArr = [
    {
      text: Buttons.Add,
      onClick: onAddClick,
      loader: loading === Buttons.Add,
      disabled: values.input === "" || loading !== "",
    },
    {
      text: Buttons.Delete,
      onClick: onDeleteBtnClick,
      loader: loading === Buttons.Delete,
      disabled: loading !== "" || stack.length === 0,
    },
  ];

  return (
    <SolutionLayout title="Стек">
      <div data-testid="stack-page" className={styles.menu}>
        <InputWithButton
          value={values.input}
          onInput={handleChange}
          name="input"
          btnsArr={btnsArr}
          isLimitText={true}
          maxLength={4}
        />
        <Button
          text={Buttons.Reset}
          disabled={loading !== "" || stack.length === 0}
          onClick={onResetBtnClick}
        />
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {stack &&
            stack.map((number, i) => {
              return (
                <li key={i}>
                  <Circle
                    head={i === stackRef.current.lastElement ? "top" : null}
                    letter={`${number}`}
                    index={i}
                    state={
                      isLastElementChanging &&
                      i === stackRef.current.lastElement
                        ? ElementStates.Changing
                        : ElementStates.Default
                    }
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
