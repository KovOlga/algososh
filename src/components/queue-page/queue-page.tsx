import React, { useRef } from "react";
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
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { Queue } from "./Queue";

export const QueuePage: React.FC = () => {
  const [loading, setLoading] = useState<string>("");
  const { values, handleChange, setValues } = useForm<{ input: string }>({
    input: "",
  });
  const [isHeadChanging, setHeadChanging] = useState<Boolean>(false);
  const [isTailChanging, setTailChanging] = useState<Boolean>(false);

  const queueRef = useRef(new Queue<string>(7));
  const [queue, setQueue] = useState<(string | null)[]>([]);

  useEffect(() => {
    setQueue(queueRef.current.elements);
  }, []);

  const onAddClick = (e: MouseEvent<HTMLButtonElement>) => {
    setTailChanging(true);
    setLoading(e.currentTarget.innerText);

    setTimeout(() => {
      queueRef.current.enqueue(values.input);
      setQueue(queueRef.current.elements);
      setTailChanging(false);
      setLoading("");
    }, SHORT_DELAY_IN_MS);
    setValues({ input: "" });
  };

  const onDeleteBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!queueRef.current.isEmpty) {
      setHeadChanging(true);
      setLoading(e.currentTarget.innerText);

      setTimeout(() => {
        queueRef.current.dequeue();
        setQueue(queueRef.current.elements);
        setHeadChanging(false);
        setLoading("");
      }, SHORT_DELAY_IN_MS);
      setValues({ input: "" });
    }
  };

  const onResetBtnClick = () => {
    queueRef.current.clear();
    setQueue(queueRef.current.elements);
  };

  const btnsArr = [
    {
      text: Buttons.Add,
      onClick: onAddClick,
      loader: loading === Buttons.Add,
      disabled: loading !== "" || values.input === "",
    },
    {
      text: Buttons.Delete,
      onClick: onDeleteBtnClick,
      loader: loading === Buttons.Delete,
      disabled: loading !== "" || queueRef.current.isEmpty,
    },
  ];

  return (
    <SolutionLayout title="Очередь">
      <div data-testid="queue-page" className={styles.menu}>
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
          disabled={loading !== "" || queueRef.current.isEmpty}
          onClick={onResetBtnClick}
        />
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {queue &&
            queue.map((letter, i) => {
              return (
                <li key={i}>
                  <Circle
                    head={
                      i === queueRef.current.getHead &&
                      queue[queueRef.current.getHead] !== undefined
                        ? HEAD
                        : null
                    }
                    letter={letter ? letter : ""}
                    index={i}
                    tail={
                      i === queueRef.current.getTail - 1 &&
                      queue[queueRef.current.getTail - 1] !== null
                        ? TAIL
                        : null
                    }
                    state={
                      (isTailChanging && i === queueRef.current.getTail) ||
                      (isHeadChanging && i === queueRef.current.getHead)
                        ? ElementStates.Changing
                        : ElementStates.Default
                    }
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
