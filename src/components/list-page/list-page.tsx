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
import { ElemWrapper } from "./elem-wrapper";

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

  const listRef = useRef(
    new LinkedList<ElemWrapper<string>>(
      ElemWrapper.prototype.fromArray(["12", "13", "14", "15"])
    )
  );
  const [linkedList, setLinkedList] = useState<ElemWrapper<string>[]>([]);

  const onLoadingChange = (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(e.currentTarget.innerText);
  };

  useEffect(() => {
    setLinkedList(listRef.current.toArray());
  }, []);

  const onAddHomeClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (listRef.current.headNode) {
      listRef.current.headNode.value.isCircleAbove = true;
      setLinkedList(listRef.current.toArray());

      const newElement = new ElemWrapper(
        values.inputValue,
        ElementStates.Modified
      );

      let promiseToAddElement = waitToUpdate(34);
      promiseToAddElement.then(() => {
        listRef.current.headNode!.value.isCircleAbove = false;
        listRef.current.prepend(newElement);
        setLinkedList(listRef.current.toArray());
      });
      await promiseToAddElement;

      let promiseToMoveHead = waitToUpdate(34);
      promiseToMoveHead.then(() => {
        newElement.status = ElementStates.Default;
        setLinkedList(listRef.current.toArray());
      });
      setValues((prevState) => {
        return { ...prevState, inputValue: "" };
      });
      await promiseToMoveHead;
    }
  };

  const onAddEndClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (listRef.current.headNode) {
      listRef.current.tailNode!.value.isCircleAbove = true;
      setLinkedList(listRef.current.toArray());

      const newElement = new ElemWrapper(
        values.inputValue,
        ElementStates.Modified
      );

      let promiseToAddElement = waitToUpdate(34);
      promiseToAddElement.then(() => {
        listRef.current.tailNode!.value.isCircleAbove = false;
        listRef.current.append(newElement);
        setLinkedList(listRef.current.toArray());
      });
      await promiseToAddElement;

      let promiseToMoveHead = waitToUpdate(34);
      promiseToMoveHead.then(() => {
        newElement.status = ElementStates.Default;
        setLinkedList(listRef.current.toArray());
        setValues((prevState) => {
          return { ...prevState, inputValue: "" };
        });
      });
      await promiseToMoveHead;
    }
  };

  const onDeleteHomeClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (listRef.current.headNode) {
      listRef.current.headNode!.value.isCircleBelow = true;
      setLinkedList(listRef.current.toArray());

      let promiseToDeleteHead = waitToUpdate(34);
      promiseToDeleteHead.then(() => {
        listRef.current.tailNode!.value.isCircleAbove = false;
        listRef.current.deleteHead();
        setLinkedList(listRef.current.toArray());
        setValues((prevState) => {
          return { ...prevState, inputValue: "" };
        });
      });
      await promiseToDeleteHead;
    }
  };

  const onDeleteEndClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (listRef.current.headNode) {
      listRef.current.tailNode!.value.isCircleBelow = true;
      setLinkedList(listRef.current.toArray());

      let promiseToDeleteTail = waitToUpdate(34);
      promiseToDeleteTail.then(() => {
        listRef.current.tailNode!.value.isCircleAbove = false;
        listRef.current.deleteTail();
        setLinkedList(listRef.current.toArray());
        setValues((prevState) => {
          return { ...prevState, inputValue: "" };
        });
      });
      await promiseToDeleteTail;
    }
  };

  const onAddIndexClick = async (e: MouseEvent<HTMLButtonElement>) => {
    let currentNode = listRef.current.headNode;
    let currentIndex = 0;
    const index = Number(values.inputIndex);

    while (currentNode && currentIndex <= index) {
      currentNode.value.isCircleAbove = true;
      setLinkedList(listRef.current.toArray());
      await waitToUpdate(34);

      currentNode.value.status = ElementStates.Changing;
      currentNode.value.isCircleAbove = false;

      currentNode = currentNode?.next;
      currentIndex++;
    }

    const newElement = new ElemWrapper(
      values.inputValue,
      ElementStates.Modified
    );
    listRef.current.addByIndex(newElement, index);

    currentNode = listRef.current.headNode;

    while (currentNode) {
      if (currentNode.value !== newElement) {
        currentNode.value.status = ElementStates.Default;
      }
      currentNode = currentNode?.next;
    }
    setLinkedList(listRef.current.toArray());

    await waitToUpdate(23);
    newElement.status = ElementStates.Default;
    setLinkedList(listRef.current.toArray());
  };

  const onDeleteIndexClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const index = Number(values.inputIndex);

    let currentNode = listRef.current.headNode;
    let currentIndex = 0;
    while (currentNode && currentIndex < index) {
      currentNode.value.status = ElementStates.Changing;
      currentNode = currentNode?.next;
      currentIndex++;
      setLinkedList(listRef.current.toArray());
      await waitToUpdate(33);
    }

    currentNode!.value.isCircleBelow = true;
    setLinkedList(listRef.current.toArray());
    await waitToUpdate(33);

    listRef.current.deleteByIndex(index);
    currentNode = listRef.current.headNode;
    currentIndex = 0;
    while (currentNode && currentIndex < index) {
      currentNode.value.status = ElementStates.Default;
      currentNode = currentNode?.next;
      currentIndex++;
    }
    setLinkedList(listRef.current.toArray());
  };

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
                    letter={item.isCircleBelow ? "" : item.value}
                    index={i}
                    head={
                      item.isCircleAbove ? (
                        <Circle
                          state={ElementStates.Changing}
                          letter={values.inputValue}
                          isSmall
                        />
                      ) : null
                    }
                    tail={
                      item.isCircleBelow ? (
                        <Circle
                          state={ElementStates.Changing}
                          letter={item.value}
                          isSmall
                        />
                      ) : null
                    }
                    state={item.status}
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
