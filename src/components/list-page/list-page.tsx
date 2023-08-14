import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import styles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { createRandomArr } from "../../utils/utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string>("");
  const [list, setList] = useState<
    {
      value: number;
      status: ElementStates;
      head: boolean;
      tail: boolean;
      indexChanging: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const randomNumsArray = createRandomArr(4, 5, 0, 100).map((item) => {
      return {
        value: item,
        status: ElementStates.Default,
        head: false,
        tail: false,
        indexChanging: false,
      };
    });
    setList(randomNumsArray);
  }, []);

  const onAddHomeClick = () => {
    setLoading(true);
    let step = 0;

    setTimeout(function run() {
      if (step === 0) {
        setList((prevState) => {
          return prevState.map((item, i) => {
            if (i === 0) {
              return { ...item, indexChanging: true };
            } else {
              return item;
            }
          });
        });
        step++;
        setTimeout(run, 500);
      } else if (step === 1) {
        setList((prevState) => {
          return [
            {
              value: +inputValue,
              status: ElementStates.Modified,
              head: false,
              tail: false,
              indexChanging: false,
            },
            ...prevState,
          ].map((item, i) => {
            if (item.indexChanging) {
              return { ...item, status: ElementStates.Default };
            } else {
              return item;
            }
          });
        });
        step++;
        setTimeout(run, 500);
      } else if (step === 2) {
        setList((prevState) => {
          return prevState.map((item, i) => {
            if (i === 0) {
              return { ...item, status: ElementStates.Default };
            } else {
              return item;
            }
          });
        });
        setLoading(false);
      }
    }, 500);
    setInputValue("");
  };
  const onAddEndClick = () => {};

  const onDeleteHomeClick = () => {};
  const onDeleteEndClick = () => {};

  const onDeleteIndexClick = () => {};
  const onAddIndexClick = () => {};

  const btnArrUp = [
    {
      text: "Добавить в head",
      onClick: onAddHomeClick,
      loader: loading,
      disabled: inputValue === "",
    },
    {
      text: "Добавить в tail",
      onClick: onAddEndClick,
      loader: loading,
      disabled: inputValue === "",
    },
    { text: "Удалить из head", onClick: onDeleteHomeClick },
    { text: "Удалить из tail", onClick: onDeleteEndClick },
  ];

  const btnArrDown = [
    {
      text: "Добавить по индексу",
      onClick: onAddIndexClick,
    },
    { text: "Удалить по индексу", onClick: onDeleteIndexClick },
  ];

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.menu}>
        <InputWithButton
          input={inputValue}
          onInputChange={onInputChange}
          btnsArr={btnArrUp}
          isLimitText={true}
          maxLength={4}
        />
        <InputWithButton
          input={inputIndex}
          onInputChange={onInputChange}
          btnsArr={btnArrDown}
        />
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {list &&
            list.map((item, i) => {
              return (
                <li className={styles.list__item} key={i}>
                  <Circle
                    letter={`${item.value}`}
                    index={i}
                    head={
                      i === 0 && item.indexChanging ? (
                        <Circle
                          state={ElementStates.Changing}
                          letter={`${inputValue}`}
                          isSmall
                        />
                      ) : i === 0 && !item.indexChanging ? (
                        "head"
                      ) : null
                    }
                    tail={i === list.length - 1 ? "tail" : null}
                    state={item.status}
                  />
                  {i !== list.length - 1 ? <ArrowIcon /> : null}
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
