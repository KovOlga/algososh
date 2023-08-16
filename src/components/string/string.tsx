import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { InputWithButton } from "../input-with-button/input-with-button";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [modifyedLetters, setModifyedLetters] = useState<
    { status: ElementStates; value: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sort = () => {
    setLoading(true);
    let start = 0;
    let end = modifyedLetters.length - 1;
    let prevData: any;
    let buffer: any;

    const func = (start: number, end: number) => {
      setModifyedLetters((prevState) => {
        prevData = [...prevState];

        buffer = prevData[start];
        prevData[start] = prevData[end];
        prevData[end] = buffer;

        prevData[start] = {
          ...prevData[start],
          status: ElementStates.Changing,
        };
        prevData[end] = { ...prevData[end], status: ElementStates.Changing };

        if (start === end) {
          prevData[start] = {
            ...prevData[start],
            status: ElementStates.Modified,
          };
        }

        if (prevData[start - 1]) {
          prevData[start - 1] = {
            ...prevData[start - 1],
            status: ElementStates.Modified,
          };
        }
        if (prevData[end + 1]) {
          prevData[end + 1] = {
            ...prevData[end + 1],
            status: ElementStates.Modified,
          };
        }

        return prevData;
      });
      start++;
      end--;
    };

    setTimeout(function run() {
      if (start <= end) {
        func(start++, end--);
        setTimeout(run, 1000);
      }
      if (start - end === 1) {
        setTimeout(() => {
          setModifyedLetters((prevState) => {
            prevData = [...prevState];

            prevData[start] = {
              ...prevData[start],
              status: ElementStates.Modified,
            };
            prevData[end] = {
              ...prevData[end],
              status: ElementStates.Modified,
            };

            return prevData;
          });
          setLoading(false);
        }, 1000);
      }
    }, 1000);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    const hh = event.target.value.split("").map((letter) => {
      return { value: letter, status: ElementStates.Default };
    });
    setModifyedLetters(hh);
  };

  const onDisplayClick = () => {
    sort();
  };

  const btnsArr = [
    { text: "Развернуть", onClick: onDisplayClick, loader: loading },
  ];

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <InputWithButton
          input={input}
          onInputChange={onInputChange}
          btnsArr={btnsArr}
          isLimitText={true}
          maxLength={11}
        />
        <div className={styles.display}>
          <ul className={styles.list}>
            {modifyedLetters.map((letter, i) => {
              return (
                <li key={i} className={styles.list__item}>
                  <Circle letter={letter.value} state={letter.status} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SolutionLayout>
  );
};
