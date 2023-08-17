import React from "react";
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

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<
    { value: string; status: ElementStates }[]
  >([]);
  const [loading, setLoading] = useState<string>("");
  const { values, handleChange, setValues } = useForm<{ input: string }>({
    input: "",
  });

  const onLoadingChange = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
  };

  const onAddClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;

    setTimeout(function run() {
      if (step === 0) {
        setStack((prevState) => {
          return [
            ...prevState,
            { value: values.input, status: ElementStates.Changing },
          ];
        });
        step++;
        setTimeout(run, 500);
      } else if (step === 1) {
        setStack((prevState) => {
          return prevState.map((item, i) => {
            if (i === prevState.length - 1) {
              return { value: values.input, status: ElementStates.Default };
            } else {
              return item;
            }
          });
        });
        setLoading("");
      }
    }, 500);
    setValues({ input: "" });
  };

  const onDeleteBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;

    setTimeout(function run() {
      if (step === 0) {
        setStack((prevState) => {
          return prevState.map((item, i) => {
            if (i === prevState.length - 1) {
              return { ...item, status: ElementStates.Changing };
            } else {
              return item;
            }
          });
        });
        step++;
        setTimeout(run, 500);
      } else if (step === 1) {
        setStack((prevState) => {
          return prevState.filter((item, i) => i !== prevState.length - 1);
        });
        setLoading("");
      }
    }, 500);
  };

  const onResetBtnClick = () => {
    setStack([]);
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
      <div className={styles.menu}>
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
                    head={i === stack.length - 1 ? "top" : null}
                    letter={`${number.value}`}
                    tail={`${i}`}
                    state={number.status}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
