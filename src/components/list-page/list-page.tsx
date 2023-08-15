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
      value: string;
      status: ElementStates;
      isCircleAbove: boolean;
      isCircleBelow: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onInputIndexChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(event.target.value);
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

  const onAddHomeClick = () => {
    setLoading(true);
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
        setLoading(false);
        setInputValue("");
      }
    }, 500);
  };
  const onAddEndClick = () => {
    setLoading(true);
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
        setLoading(false);
        setInputValue("");
      }
    }, 500);
  };

  const onDeleteHomeClick = () => {
    // setLoading(true);
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
        // setLoading(false);
        setInputValue("");
      }
    }, 500);
  };
  const onDeleteEndClick = () => {
    // setLoading(true);
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
        // setLoading(false);
        setInputValue("");
      }
    }, 500);
  };

  const onAddIndexClick = () => {
    // setLoading(true);
    let step = 0;

    setTimeout(async function run() {
      if (step === 0) {
        console.log("if");

        for (let i = 0; i <= Number(inputIndex); i++) {
          let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(i), 1000);
          });
          promise.then((currentInd) => {
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
          await promise;
        }
        step++;
        setTimeout(run, 1000);
      } else if (step === 1) {
        setList((prevState) => {
          const hbhb = [...prevState];
          hbhb.splice(Number(inputIndex), 0, {
            value: inputValue,
            status: ElementStates.Modified,
            isCircleAbove: false,
            isCircleBelow: false,
          });
          return hbhb.map((item, i) => {
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
        setTimeout(run, 1000);
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
        // setLoading(false);
        // setInputValue("");
      }
    }, 1000);
  };

  const onDeleteIndexClick = () => {
    // setLoading(true);
    let step = 0;

    setTimeout(async function run() {
      if (step === 0) {
        console.log("if");

        for (let i = 0; i <= Number(inputIndex); i++) {
          let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(i), 1000);
          });
          promise.then((currentInd) => {
            console.log("currentInd", currentInd);
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
          await promise;
        }
        step++;
        setTimeout(run, 1000);
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
        setTimeout(run, 1000);
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
        // setLoading(false);
        // setInputValue("");
      }
    }, 1000);
  };

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
