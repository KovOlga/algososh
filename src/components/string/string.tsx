import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { InputWithButton } from "../input-with-button/input-with-button";
import { waitToUpdate } from "../../utils/utils";
import { Buttons } from "../../types/buttons";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [modifyedLetters, setModifyedLetters] = useState<
    { status: ElementStates; value: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sort = async () => {
    setLoading(true);
    for (
      let start = 0, end = modifyedLetters.length - 1;
      start <= end;
      start++, end--
    ) {
      await waitToUpdate(DELAY_IN_MS);

      setModifyedLetters((prevState) => {
        return prevState.map((item, index) => {
          if (index === start) {
            return { ...item, status: ElementStates.Changing };
          } else if (index === end) {
            return { ...item, status: ElementStates.Changing };
          } else {
            return item;
          }
        });
      });
      await waitToUpdate(DELAY_IN_MS);

      setModifyedLetters((prevState) => {
        let newState = [...prevState];
        if (newState[start] && newState[end]) {
          const temp = newState[start];
          newState[start] = newState[end];
          newState[end] = temp;
        }
        newState = newState.map((item, index) => {
          if (item.status === ElementStates.Changing) {
            return { ...item, status: ElementStates.Modified };
          } else {
            return item;
          }
        });
        return newState;
      });
    }
    setLoading(false);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    const modifiedArray = event.target.value.split("").map((letter) => {
      return { value: letter, status: ElementStates.Default };
    });
    setModifyedLetters(modifiedArray);
  };

  const btnsArr = [
    {
      text: Buttons.Reverse,
      onClick: sort,
      loader: loading,
      disabled: input === "",
    },
  ];

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <InputWithButton
          value={input}
          name="input"
          onInput={onInputChange}
          btnsArr={btnsArr}
          isLimitText={true}
          maxLength={11}
        />
        <div className={styles.display}>
          <ul className={styles.list}>
            {modifyedLetters &&
              modifyedLetters.map((item, i) => {
                return (
                  <li key={i} className={styles.list__item}>
                    <Circle letter={item.value} state={item.status} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </SolutionLayout>
  );
};
