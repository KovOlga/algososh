import React, { useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputWithButton } from "../input-with-button/input-with-button";
import { useState, useEffect } from "react";
import styles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { waitToUpdate } from "../../utils/utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { MouseEvent } from "react";
import { Buttons } from "../../types/buttons";
import { useForm } from "../../hooks/useForm";
import { LinkedList } from "./linked-list";
import { ElemWrapper } from "./elem-wrapper";
import { HEAD, TAIL } from "../../constants/element-captions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
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
    onLoadingChange(e);
    if (listRef.current.headNode) {
      listRef.current.headNode.value.isCircleAbove = true;
      setLinkedList(listRef.current.toArray());

      const newElement = new ElemWrapper(
        values.inputValue,
        ElementStates.Modified
      );
      await waitToUpdate(SHORT_DELAY_IN_MS);

      listRef.current.headNode!.value.isCircleAbove = false;
      listRef.current.headNode!.value.head = false;
      listRef.current.prepend(newElement);
      listRef.current.headNode!.value.head = true;
      setLinkedList(listRef.current.toArray());
      await waitToUpdate(SHORT_DELAY_IN_MS);

      newElement.status = ElementStates.Default;
      setLinkedList(listRef.current.toArray());
      setValues((prevState) => {
        return { ...prevState, inputValue: "" };
      });
      setLoading("");
    }
  };

  const onAddEndClick = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    if (listRef.current.headNode) {
      listRef.current.tailNode!.value.isCircleAbove = true;
      setLinkedList(listRef.current.toArray());

      const newElement = new ElemWrapper(
        values.inputValue,
        ElementStates.Modified
      );
      await waitToUpdate(SHORT_DELAY_IN_MS);

      listRef.current.tailNode!.value.isCircleAbove = false;
      listRef.current.tailNode!.value.tail = false;
      listRef.current.append(newElement);
      listRef.current.tailNode!.value.tail = true;
      setLinkedList(listRef.current.toArray());
      await waitToUpdate(SHORT_DELAY_IN_MS);

      newElement.status = ElementStates.Default;
      setLinkedList(listRef.current.toArray());
      setValues((prevState) => {
        return { ...prevState, inputValue: "" };
      });
      setLoading("");
    }
  };

  const onDeleteHomeClick = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    if (listRef.current.headNode) {
      listRef.current.headNode!.value.isCircleBelow = true;
      setLinkedList(listRef.current.toArray());
      await waitToUpdate(SHORT_DELAY_IN_MS);

      listRef.current.deleteHead();
      listRef.current.headNode.value.head = true;
      setLinkedList(listRef.current.toArray());
    }
    setLoading("");
  };

  const onDeleteEndClick = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    if (listRef.current.headNode) {
      listRef.current.tailNode!.value.isCircleBelow = true;
      setLinkedList(listRef.current.toArray());
      await waitToUpdate(SHORT_DELAY_IN_MS);

      listRef.current.deleteTail();
      listRef.current.tailNode!.value.tail = true;
      setLinkedList(listRef.current.toArray());
    }
    setLoading("");
  };

  const onAddIndexClick = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    let currentNode = listRef.current.headNode;
    let currentIndex = 0;
    const index = Number(values.inputIndex);

    while (currentNode && currentIndex <= index) {
      currentNode.value.isCircleAbove = true;
      setLinkedList(listRef.current.toArray());
      await waitToUpdate(SHORT_DELAY_IN_MS);

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
    if (index === 0 && listRef.current.headNode) {
      listRef.current.headNode.value.head = true;
      listRef.current.headNode.next!.value.head = false;
    }

    currentNode = listRef.current.headNode;

    while (currentNode) {
      if (currentNode.value !== newElement) {
        currentNode.value.status = ElementStates.Default;
      }
      currentNode = currentNode?.next;
    }
    setLinkedList(listRef.current.toArray());

    await waitToUpdate(SHORT_DELAY_IN_MS);
    newElement.status = ElementStates.Default;
    setLinkedList(listRef.current.toArray());
    setValues((prevState) => {
      return { ...prevState, inputValue: "" };
    });
    setLoading("");
  };

  const onDeleteIndexClick = async (e: MouseEvent<HTMLButtonElement>) => {
    onLoadingChange(e);
    const index = Number(values.inputIndex);

    let currentNode = listRef.current.headNode;
    let currentIndex = 0;
    while (currentNode && currentIndex < index) {
      currentNode.value.status = ElementStates.Changing;
      currentNode = currentNode?.next;
      currentIndex++;
      setLinkedList(listRef.current.toArray());
      await waitToUpdate(SHORT_DELAY_IN_MS);
    }

    currentNode!.value.isCircleBelow = true;
    setLinkedList(listRef.current.toArray());
    await waitToUpdate(SHORT_DELAY_IN_MS);

    listRef.current.deleteByIndex(index);
    listRef.current.tailNode!.value.tail = true;
    currentNode = listRef.current.headNode;
    currentIndex = 0;
    while (currentNode && currentIndex < index) {
      currentNode.value.status = ElementStates.Default;
      currentNode = currentNode?.next;
      currentIndex++;
    }
    setLinkedList(listRef.current.toArray());
    setValues((prevState) => {
      return { ...prevState, inputValue: "" };
    });
    setLoading("");
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
      linkedListDown: true,
      disabled:
        values.inputIndex === "" ||
        values.inputValue === "" ||
        loading !== "" ||
        Number(values.inputIndex) > listRef.current.getSize(),
    },
    {
      text: Buttons.DeleteByIndex,
      onClick: onDeleteIndexClick,
      loader: loading === Buttons.DeleteByIndex,
      linkedListDown: true,
      disabled:
        values.inputIndex === "" ||
        loading !== "" ||
        Number(values.inputIndex) > listRef.current.getSize(),
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
          type="number"
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
                      ) : item.head ? (
                        HEAD
                      ) : null
                    }
                    tail={
                      item.isCircleBelow ? (
                        <Circle
                          state={ElementStates.Changing}
                          letter={item.value}
                          isSmall
                        />
                      ) : item.tail ? (
                        TAIL
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
