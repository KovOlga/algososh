import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import { useState } from "react";
import { ChangeEvent } from "react";
import styles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<number[]>([]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onAddHomeClick = () => {};
  const onAddEndClick = () => {};
  const onDeleteHomeClick = () => {};
  const onDeleteEndClick = () => {};
  const onDeleteIndexClick = () => {};
  const onAddIndexClick = () => {};

  const btnArrUp = [
    { text: "Добавить в head", onClick: onAddHomeClick },
    { text: "Добавить в tail", onClick: onAddEndClick },
    { text: "Удалить из head", onClick: onDeleteHomeClick },
    { text: "Удалить из tail", onClick: onDeleteEndClick },
  ];

  const btnArrDown = [
    { text: "Добавить по индексу", onClick: onAddIndexClick },
    { text: "Удалить по индексу", onClick: onDeleteIndexClick },
  ];

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.menu}>
        <InputWithButton
          input={input}
          onInputChange={onInputChange}
          btnsArr={btnArrUp}
          isLimitText={true}
          maxLength={4}
        />
        <InputWithButton
          input={input}
          onInputChange={onInputChange}
          btnsArr={btnArrDown}
        />
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {list &&
            list.map((item, i) => {
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
