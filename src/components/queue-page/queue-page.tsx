import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import styles from "./queue-page.module.css";
import { useState, useEffect } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { MouseEvent } from "react";
import { Buttons } from "../../types/buttons";
import { useForm } from "../../hooks/useForm";

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<
    { value: string; status: ElementStates; head: boolean; tail: boolean }[]
  >([]);
  const [loading, setLoading] = useState<string>("");
  const { values, handleChange, setValues } = useForm<{ input: string }>({
    input: "",
  });

  const [disabledOnEmptyQueue, setDisabledOnEmptyQueue] =
    useState<boolean>(true);

  const onLoadingChange = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
  };

  useEffect(() => {
    setQueue(
      Array(7).fill({
        value: "",
        status: ElementStates.Default,
        head: false,
        tail: false,
      })
    );
  }, []);

  const onAddClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;
    let head = queue.findIndex((item) => item.head);
    let tail = queue.findIndex((item) => item.tail);

    if (tail === queue.length - 1) {
      setLoading("");
      return;
    }

    setTimeout(function run() {
      if (step === 0) {
        setQueue((prevState) => {
          return prevState.map((item, i) => {
            if (i === tail + 1) {
              return { ...item, status: ElementStates.Changing };
            } else {
              return item;
            }
          });
        });
        step++;
        tail++;
        setTimeout(run, 500);
      } else if (step === 1) {
        setQueue((prevState) => {
          return prevState.map((item, i) => {
            if (i === tail - 1) {
              return { ...item, tail: false };
            } else if (i === tail) {
              return {
                ...item,
                tail: true,
                head: head === -1,
                value: values.input,
                status: ElementStates.Default,
              };
            } else {
              return item;
            }
          });
        });
        setLoading("");
        setDisabledOnEmptyQueue(false);
      }
    }, 500);
    setValues({ input: "" });
  };

  const onDeleteBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let step = 0;
    let head = queue.findIndex((item) => item.head);
    let tail = queue.findIndex((item) => item.tail);

    setTimeout(function run() {
      if (step === 0) {
        setQueue((prevState) => {
          return prevState.map((item, i) => {
            if (i === head) {
              return { ...item, status: ElementStates.Changing };
            } else {
              return item;
            }
          });
        });
        step++;
        head++;
        setTimeout(run, 500);
      } else if (step === 1) {
        if (head - 1 === tail) {
          setDisabledOnEmptyQueue(true);
        }
        setQueue((prevState) => {
          if (head - 1 === tail) {
            return prevState.map((item, i) => {
              if (i === head - 1) {
                return {
                  ...item,
                  value: "",
                  status: ElementStates.Default,
                  head: true,
                  tail: false,
                };
              } else {
                return item;
              }
            });
          } else {
            return prevState.map((item, i) => {
              if (i === head - 1) {
                return {
                  ...item,
                  value: "",
                  status: ElementStates.Default,
                  head: head === queue.length,
                  tail: false,
                };
              } else if (i === head) {
                return { ...item, head: true };
              } else {
                return item;
              }
            });
          }
        });
        setLoading("");
      }
    }, 500);
  };

  const onResetBtnClick = () => {
    setQueue((prevstate) =>
      prevstate.map((item) => {
        return {
          ...item,
          value: "",
          head: false,
          tail: false,
          status: ElementStates.Default,
        };
      })
    );
  };

  const btnsArr = [
    {
      text: Buttons.Add,
      onClick: onAddClick,
      loader: loading === Buttons.Add,
      disabled: values.input === "" || queue[queue.length - 1].tail,
    },
    {
      text: Buttons.Delete,
      onClick: onDeleteBtnClick,
      loader: loading === Buttons.Delete,
      disabled: loading !== "" || disabledOnEmptyQueue,
    },
  ];

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.menu}>
        <InputWithButton
          value={values.input}
          name="input"
          onInput={handleChange}
          btnsArr={btnsArr}
          isLimitText={true}
          maxLength={4}
        />
        <Button
          text={Buttons.Reset}
          disabled={loading !== "" || disabledOnEmptyQueue}
          onClick={onResetBtnClick}
        />
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {queue &&
            queue.map((number, i) => {
              return (
                <li key={i}>
                  <Circle
                    head={number.head ? "head" : null}
                    letter={`${number.value}`}
                    index={i}
                    tail={number.tail ? "tail" : null}
                    state={number.status}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
