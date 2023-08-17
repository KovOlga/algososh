import React, { useCallback } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import { useState, useEffect } from "react";
import styles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { createRandomArr, waitToUpdate } from "../../utils/utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { MouseEvent } from "react";
import { Buttons } from "../../types/buttons";
import { useForm } from "../../hooks/useForm";

export const ListPage: React.FC = () => {
  const [list, setList] = useState<
    {
      value: string;
      status: ElementStates;
      isCircleAbove: boolean;
      isCircleBelow: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState<string>("");
  const { values, handleChange, setValues } = useForm<{
    inputValue: string;
    inputIndex: string;
  }>({
    inputValue: "",
    inputIndex: "",
  });

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
              value: values.inputValue,
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
        setValues((prevState) => {
          return { ...prevState, inputValue: "" };
        });
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
              value: values.inputValue,
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
        setValues((prevState) => {
          return { ...prevState, inputValue: "" };
        });
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
        setValues((prevState) => {
          return { ...prevState, inputValue: "" };
        });
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
        setValues((prevState) => {
          return { ...prevState, inputValue: "" };
        });
      }
    }, 500);
  };

  const onAddIndexClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;

    setTimeout(async function run() {
      if (step === 0) {
        for (let i = 0; i <= Number(values.inputIndex); i++) {
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
          copiedArr.splice(Number(values.inputIndex), 0, {
            value: values.inputValue,
            status: ElementStates.Modified,
            isCircleAbove: false,
            isCircleBelow: false,
          });
          return copiedArr.map((item, i) => {
            if (i < Number(values.inputIndex)) {
              return { ...item, status: ElementStates.Default };
            } else if (i === Number(values.inputIndex) + 1) {
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
            if (i === Number(values.inputIndex)) {
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
        for (let i = 0; i <= Number(values.inputIndex); i++) {
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
            if (i === Number(values.inputIndex)) {
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
          const copiedArr = [...prevState];
          copiedArr.splice(Number(values.inputIndex), 1);
          return copiedArr.map((item, i) => {
            if (i < Number(values.inputIndex)) {
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
      text: Buttons.Prepend,
      onClick: onAddHomeClick,
      loader: loading === Buttons.Prepend,
      disabled: values.inputValue === "" || loading !== "",
    },
    {
      text: Buttons.Append,
      onClick: onAddEndClick,
      loader: loading === Buttons.Append,
      disabled: values.inputValue === "" || loading !== "",
    },
    {
      text: Buttons.DeleteHead,
      onClick: onDeleteHomeClick,
      loader: loading === Buttons.DeleteHead,
      disabled: loading !== "" || loading !== "",
    },
    {
      text: Buttons.DeleteTail,
      onClick: onDeleteEndClick,
      loader: loading === Buttons.DeleteTail,
      disabled: loading !== "" || loading !== "",
    },
  ];

  const btnArrDown = [
    {
      text: Buttons.AddByIndex,
      onClick: onAddIndexClick,
      loader: loading === Buttons.AddByIndex,
      disabled:
        values.inputIndex === "" || values.inputValue === "" || loading !== "",
    },
    {
      text: Buttons.DeleteByIndex,
      onClick: onDeleteIndexClick,
      loader: loading === Buttons.DeleteByIndex,
      disabled: values.inputIndex === "" || loading !== "",
    },
  ];

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.menu}>
        <InputWithButton
          // input={inputValue}
          // onInputChange={onInputValueChange}
          btnsArr={btnArrUp}
          isLimitText={true}
          maxLength={4}
          value={values.inputValue}
          onInput={handleChange}
          name="inputValue"
        />
        <InputWithButton
          // input={inputIndex}
          // onInputChange={onInputIndexChange}
          btnsArr={btnArrDown}
          value={values.inputIndex}
          onInput={handleChange}
          name="inputIndex"
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
                          letter={values.inputValue}
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
