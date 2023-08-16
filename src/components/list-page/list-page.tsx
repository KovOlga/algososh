import React, { useCallback } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import styles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { createRandomArr, waitToUpdate } from "../../utils/utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { MouseEvent } from "react";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string>("");
  const [list, setList] = useState<
    {
      value: string;
      status: ElementStates;
      isCircleAbove: boolean;
      isCircleBelow: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState<string>("");

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onInputIndexChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(event.target.value);
  };
  const onLoadingChange = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
  };

  useEffect(() => {
    const randomNumsArray = createRandomArr(4, 5, 0, 100).map((item) => {
      return {
        value: item.toString(),
        status: ElementStates.Default,
        isCircleAbove: false,
        isCircleBelow: false,
      };
    });
    setList(randomNumsArray);
  }, []);

  const onAddHomeClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;

    setTimeout(function run() {
      if (step === 0) {
        setList((prevState) => {
          return prevState.map((item, i) => {
            if (i === 0) {
              return { ...item, isCircleAbove: true };
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
              value: inputValue,
              status: ElementStates.Modified,
              isCircleAbove: false,
              isCircleBelow: false,
            },
            ...prevState,
          ].map((item, i) => {
            if (item.isCircleAbove) {
              return { ...item, isCircleAbove: false };
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
        setLoading("");
        setInputValue("");
      }
    }, 500);
  };

  const onAddEndClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;

    setTimeout(function run() {
      if (step === 0) {
        setList((prevState) => {
          return prevState.map((item, i) => {
            if (i === prevState.length - 1) {
              return { ...item, isCircleAbove: true };
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
            ...prevState,
            {
              value: inputValue,
              status: ElementStates.Modified,
              isCircleAbove: false,
              isCircleBelow: false,
            },
          ].map((item, i) => {
            if (item.isCircleAbove) {
              return { ...item, isCircleAbove: false };
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
            if (i === prevState.length - 1) {
              return { ...item, status: ElementStates.Default };
            } else {
              return item;
            }
          });
        });
        setLoading("");
        setInputValue("");
      }
    }, 500);
  };

  const onDeleteHomeClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;

    setTimeout(function run() {
      if (step === 0) {
        setList((prevState) => {
          return prevState.map((item, i) => {
            if (i === 0) {
              return { ...item, isCircleBelow: true };
            } else {
              return item;
            }
          });
        });
        step++;
        setTimeout(run, 500);
      } else if (step === 1) {
        setList((prevState) => {
          return prevState.filter((item, i) => i !== 0);
        });
        setLoading("");
        setInputValue("");
      }
    }, 500);
  };

  const onDeleteEndClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;

    setTimeout(function run() {
      if (step === 0) {
        setList((prevState) => {
          return prevState.map((item, i) => {
            if (i === list.length - 1) {
              return { ...item, isCircleBelow: true };
            } else {
              return item;
            }
          });
        });
        step++;
        setTimeout(run, 500);
      } else if (step === 1) {
        setList((prevState) => {
          return prevState.filter((item, i) => i !== list.length - 1);
        });
        setLoading("");
        setInputValue("");
      }
    }, 500);
  };

  const onAddIndexClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;

    setTimeout(async function run() {
      if (step === 0) {
        for (let i = 0; i <= Number(inputIndex); i++) {
          const promiseToMoveCircleAbove = waitToUpdate(i);
          promiseToMoveCircleAbove.then((currentInd) => {
            setList((prevState) => {
              return prevState.map((item, i) => {
                if (i === currentInd) {
                  return {
                    ...item,
                    isCircleAbove: true,
                  };
                } else if (i < Number(currentInd)) {
                  return {
                    ...item,
                    isCircleAbove: false,
                    status: ElementStates.Changing,
                  };
                } else {
                  return item;
                }
              });
            });
          });
          await promiseToMoveCircleAbove;
        }
        step++;
        setTimeout(run, 500);
      } else if (step === 1) {
        setList((prevState) => {
          const copiedArr = [...prevState];
          copiedArr.splice(Number(inputIndex), 0, {
            value: inputValue,
            status: ElementStates.Modified,
            isCircleAbove: false,
            isCircleBelow: false,
          });
          return copiedArr.map((item, i) => {
            if (i < Number(inputIndex)) {
              return { ...item, status: ElementStates.Default };
            } else if (i === Number(inputIndex) + 1) {
              return { ...item, isCircleAbove: false };
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
            if (i === Number(inputIndex)) {
              return { ...item, status: ElementStates.Default };
            } else {
              return item;
            }
          });
        });
        setLoading("");
      }
    }, 500);
  };

  const onDeleteIndexClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;

    setTimeout(async function run() {
      if (step === 0) {
        for (let i = 0; i <= Number(inputIndex); i++) {
          let promiseToMoveCircleBelow = waitToUpdate(i);
          promiseToMoveCircleBelow.then((currentInd) => {
            setList((prevState) => {
              return prevState.map((item, i) => {
                if (i < Number(currentInd)) {
                  return {
                    ...item,
                    isCircleBelow: false,
                    status: ElementStates.Changing,
                  };
                } else {
                  return item;
                }
              });
            });
          });
          await promiseToMoveCircleBelow;
        }
        step++;
        setTimeout(run, 500);
      } else if (step === 1) {
        setList((prevState) => {
          return prevState.map((item, i) => {
            if (i === Number(inputIndex)) {
              return {
                ...item,
                isCircleBelow: true,
              };
            } else {
              return item;
            }
          });
        });
        step++;
        setTimeout(run, 500);
      } else if (step === 2) {
        setList((prevState) => {
          const hbhb = [...prevState];
          hbhb.splice(Number(inputIndex), 1);
          return hbhb.map((item, i) => {
            if (i < Number(inputIndex)) {
              return { ...item, status: ElementStates.Default };
            } else {
              return item;
            }
          });
        });
        setLoading("");
      }
    }, 500);
  };

  const btnArrUp = [
    {
      text: "Добавить в head",
      onClick: onAddHomeClick,
      loader: loading === "Добавить в head",
      disabled: inputValue === "" || loading !== "",
    },
    {
      text: "Добавить в tail",
      onClick: onAddEndClick,
      loader: loading === "Добавить в tail",
      disabled: inputValue === "" || loading !== "",
    },
    {
      text: "Удалить из head",
      onClick: onDeleteHomeClick,
      loader: loading === "Удалить из head",
      disabled: loading !== "" || loading !== "",
    },
    {
      text: "Удалить из tail",
      onClick: onDeleteEndClick,
      loader: loading === "Удалить из tail",
      disabled: loading !== "" || loading !== "",
    },
  ];

  const btnArrDown = [
    {
      text: "Добавить по индексу",
      onClick: onAddIndexClick,
      loader: loading === "Добавить по индексу",
      disabled: inputIndex === "" || inputValue === "" || loading !== "",
    },
    {
      text: "Удалить по индексу",
      onClick: onDeleteIndexClick,
      loader: loading === "Удалить по индексу",
      disabled: inputIndex === "" || loading !== "",
    },
  ];

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.menu}>
        <InputWithButton
          input={inputValue}
          onInputChange={onInputValueChange}
          btnsArr={btnArrUp}
          isLimitText={true}
          maxLength={4}
        />
        <InputWithButton
          input={inputIndex}
          onInputChange={onInputIndexChange}
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
                    letter={item.isCircleBelow ? "" : item.value}
                    index={i}
                    head={
                      item.isCircleAbove ? (
                        <Circle
                          state={ElementStates.Changing}
                          letter={inputValue}
                          isSmall
                        />
                      ) : i === 0 && !item.isCircleAbove ? (
                        "head"
                      ) : null
                    }
                    tail={
                      item.isCircleBelow ? (
                        <Circle
                          state={ElementStates.Changing}
                          letter={item.value}
                          isSmall
                        />
                      ) : i === list.length - 1 && !item.isCircleBelow ? (
                        "tail"
                      ) : null
                    }
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
