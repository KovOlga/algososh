import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import styles from "./stack-page.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [stack, setStack] = useState<number[]>([]);
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onAddClick = () => {
    console.log("add");
    setStack([+input]);
  };

  const onDeleteBtnClick = () => {
    console.log("delete");
  };

  const onResetBtnClick = () => {
    console.log("reset");
  };
  return (
    <SolutionLayout title="Стек">
      <div className={styles.menu}>
        <InputWithButton
          btnText="Добавить"
          input={input}
          onInputChange={onInputChange}
          onDisplayClick={onAddClick}
          additionalBtn={true}
          additionalBtnText="Удалить"
          onAdditionalBtnClick={onDeleteBtnClick}
        />
        <Button text="Очистить" onClick={onResetBtnClick} />
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {stack &&
            stack.map((item, i) => {
              return (
                <li key={i}>
                  <Circle letter="5" tail="4" />
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
