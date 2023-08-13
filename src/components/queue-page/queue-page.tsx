import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import styles from "./queue-page.module.css";
import { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState("");
  const [queue, setQueue] = useState<
    { value: string; status: ElementStates; head: boolean; tail: boolean }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
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

  const onAddClick = () => {
    setLoading(true);
    let step = 0;
    let currentInd = 0;
    let head = queue.findIndex((item) => item.head);
    let tail = queue.findIndex((item) => item.tail);

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
                value: input,
                status: ElementStates.Default,
              };
            } else {
              return item;
            }
          });
        });
        setLoading(false);
      }
    }, 500);
    setInput("");
  };

  const onDeleteBtnClick = () => {
    setLoading(true);
    let step = 0;
    let head = queue.findIndex((item) => item.head);

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
        setQueue((prevState) => {
          return prevState.map((item, i) => {
            if (i === head - 1) {
              return {
                ...item,
                value: "",
                status: ElementStates.Default,
                head: false,
              };
            } else if (i === head) {
              return { ...item, head: true };
            } else {
              return item;
            }
          });
        });
        setLoading(false);
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
      text: "Добавить",
      onClick: onAddClick,
      loader: loading,
      disabled: input === "",
    },
    {
      text: "Удалить",
      onClick: onDeleteBtnClick,
      disabled: loading || queue.length === 0,
    },
  ];

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.menu}>
        <InputWithButton
          input={input}
          onInputChange={onInputChange}
          btnsArr={btnsArr}
          isLimitText={true}
          maxLength={4}
        />
        <Button
          text="Очистить"
          disabled={loading || queue.length === 0}
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
