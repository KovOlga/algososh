import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { InputWithButton } from "../input-with-button/input-with-button";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string[]>([]);
  const [modifyedLetters, setModifyedLetters] = useState<
    { status: ElementStates; value: string }[]
  >([]);
  const [sortingState, setSortingState] = useState<{
    disabled: boolean;
    modifying: boolean;
  }>({
    disabled: true,
    modifying: true,
  });

  const sort = () => {
    let start = 0;
    let end = modifyedLetters.length - 1;
    let prevData: any;
    let buffer: any;

    const func = (start: number, end: number) => {
      console.log("start", modifyedLetters[start], "start", start);
      console.log("end", modifyedLetters[end], "end", end);
      setModifyedLetters((prevState) => {
        prevData = [...prevState];

        buffer = prevData[start];
        prevData[start] = prevData[end];
        prevData[end] = buffer;

        console.log("prevData", prevData);
        prevData[start] = {
          ...prevData[start],
          status: ElementStates.Changing,
        };
        prevData[end] = { ...prevData[end], status: ElementStates.Changing };

        if (start === end) {
          console.log("hbhb");
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
      // console.log("start1", modifyedLetters[start], "start", start);
      // console.log("end1", modifyedLetters[end], "end", end);
      if (start <= end) {
        func(start++, end--);
        setTimeout(run, 2000);
      }
      if (start - end === 1) {
        console.log("start2", modifyedLetters[start], "start", start);
        console.log("end2", modifyedLetters[end], "end", end);
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
        }, 2000);
      }
    }, 2000);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.split(""));
    const hh = event.target.value.split("").map((letter) => {
      return { value: letter, status: ElementStates.Default };
    });
    setModifyedLetters(hh);
  };

  const onDisplayClick = () => {
    sort();
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <InputWithButton
          input={input}
          modifyedLetters={modifyedLetters}
          onInputChange={onInputChange}
          onDisplayClick={onDisplayClick}
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
