import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import styles from "./queue-page.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
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

  const btnsArr = [
    { text: "Добавить", onClick: onAddClick },
    { text: "Удалить", onClick: onDeleteBtnClick },
  ];

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.menu}>
        <InputWithButton
          btnsArr={btnsArr}
          input={input}
          onInputChange={onInputChange}
          isLimitText={true}
          maxLength={4}
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
