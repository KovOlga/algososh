import React, { useCallback, useRef } from "react";
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
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { TNode } from "./types";
import { LinkedList } from "./linked-list";

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

  const listRef = useRef(new LinkedList<string>(["12", "13", "14"]));
  const [linkedList, setLinkedList] = useState<any[]>([]);

  const onLoadingChange = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
  };

  useEffect(() => {
    setLinkedList(listRef.current.toArray());
  }, []);

  const onAddHomeClick = (e: MouseEvent<HTMLButtonElement>) => {
    listRef.current.prepend(values.inputValue);
    setTimeout(() => {
      setLinkedList(listRef.current.toArray());
      setValues((prevState) => {
        return { ...prevState, inputValue: "" };
      });
    }, SHORT_DELAY_IN_MS);
  };

  const onAddEndClick = (e: MouseEvent<HTMLButtonElement>) => {
    listRef.current.append(values.inputValue);
    setTimeout(() => {
      setLinkedList(listRef.current.toArray());
    }, SHORT_DELAY_IN_MS);
  };

  const onDeleteHomeClick = (e: MouseEvent<HTMLButtonElement>) => {
    listRef.current.deleteHead();
    setTimeout(() => {
      setLinkedList(listRef.current.toArray());
    }, SHORT_DELAY_IN_MS);
  };

  const onDeleteEndClick = (e: MouseEvent<HTMLButtonElement>) => {
    listRef.current.deleteTail();
    setTimeout(() => {
      setLinkedList(listRef.current.toArray());
    }, SHORT_DELAY_IN_MS);
  };

  const onAddIndexClick = (e: MouseEvent<HTMLButtonElement>) => {
    listRef.current.addByIndex(values.inputValue, Number(values.inputIndex));
    setLinkedList(listRef.current.toArray());
  };

  const onDeleteIndexClick = (e: MouseEvent<HTMLButtonElement>) => {
    listRef.current.deleteByIndex(Number(values.inputIndex));
    setLinkedList(listRef.current.toArray());
  };

  /////////////////////
  const btnArrUp = [
    {
      text: Buttons.Prepend,
      onClick: onAddHomeClick,
      // loader: loading === Buttons.Prepend,
      // disabled: values.inputValue === "" || loading !== "",
    },
    {
      text: Buttons.Append,
      onClick: onAddEndClick,
      // loader: loading === Buttons.Append,
      // disabled: values.inputValue === "" || loading !== "",
    },
    {
      text: Buttons.DeleteHead,
      onClick: onDeleteHomeClick,
      // loader: loading === Buttons.DeleteHead,
      // disabled: loading !== "" || loading !== "",
    },
    {
      text: Buttons.DeleteTail,
      onClick: onDeleteEndClick,
      // loader: loading === Buttons.DeleteTail,
      // disabled: loading !== "" || loading !== "",
    },
  ];
  const btnArrDown = [
    {
      text: Buttons.AddByIndex,
      onClick: onAddIndexClick,
      // loader: loading === Buttons.AddByIndex,
      // disabled:
      //   values.inputIndex === "" || values.inputValue === "" || loading !== "",
    },
    {
      text: Buttons.DeleteByIndex,
      onClick: onDeleteIndexClick,
      // loader: loading === Buttons.DeleteByIndex,
      // disabled: values.inputIndex === "" || loading !== "",
    },
  ];

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.menu}>
        <InputWithButton
          btnsArr={btnArrUp}
          isLimitText={true}
          maxLength={4}
          value={values.inputValue}
          onInput={handleChange}
          name="inputValue"
        />
        <InputWithButton
          btnsArr={btnArrDown}
          value={values.inputIndex}
          onInput={handleChange}
          name="inputIndex"
        />
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {linkedList &&
            linkedList.map((item, i) => {
              return (
                <li className={styles.list__item} key={i}>
                  <Circle
                    letter={item.value}
                    index={i}
                    // head={
                    //   item.isCircleAbove ? (
                    //     <Circle
                    //       state={ElementStates.Changing}
                    //       letter={values.inputValue}
                    //       isSmall
                    //     />
                    //   ) : i === 0 && !item.isCircleAbove ? (
                    //     HEAD
                    //   ) : null
                    // }
                    // tail={
                    //   item.isCircleBelow ? (
                    //     <Circle
                    //       state={ElementStates.Changing}
                    //       letter={item.value}
                    //       isSmall
                    //     />
                    //   ) : i === list.length - 1 && !item.isCircleBelow ? (
                    //     TAIL
                    //   ) : null
                    // }
                    // state={item.status}
                  />
                  {i !== linkedList.length - 1 ? <ArrowIcon /> : null}
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
