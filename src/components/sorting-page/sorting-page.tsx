import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { useState, useEffect } from "react";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const [ascDescType, setAscDescType] = useState<string>("increasing");
  const [selectedRadioBtn, setSelectedRadioBtn] =
    useState<string>("selectionSort");
  const [newRamdomArray, setNewRamdomArray] = useState<number[]>([]);
  const [sortedArray, setSortedArray] = useState<number[]>([]);

  function getRandomArbitrary(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  const onCreateRandomArrBtnClick = () => {
    let randomNumsArray = Array.from(
      { length: getRandomArbitrary(3, 18) },
      () => getRandomArbitrary(0, 101)
    );
    console.log("newAarray", randomNumsArray);
    setNewRamdomArray(randomNumsArray);
    // setSortedArray(randomNumsArray);
  };

  useEffect(() => {
    onCreateRandomArrBtnClick();
  }, []);

  const onAscDescBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value);
    setAscDescType(event.currentTarget.value);
  };

  const onChangeSelectedRadioBtnClick = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    console.log(event.currentTarget.value);
    setSelectedRadioBtn(event.currentTarget.value);
  };

  useEffect(() => {
    if (selectedRadioBtn === "selectionSort") {
      onSelectionSortBtnClick();
    } else {
      onBubbleSortBtnClick();
    }
  }, [ascDescType, selectedRadioBtn, newRamdomArray]);

  const swap = (
    arr: number[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const onSelectionSortBtnClick = () => {
    console.log("sort", newRamdomArray);
    const hhb = [...newRamdomArray];
    // console.log("copied newRamdomArray", hhb);
    const { length } = hhb;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      // console.log("maxInd", maxInd);
      for (let j = maxInd; j < length; j++) {
        // console.log("j", j);
        if (ascDescType === "increasing" && hhb[j] < hhb[maxInd]) {
          swap(hhb, maxInd, j);
        } else if (ascDescType === "decreasing" && hhb[j] > hhb[maxInd]) {
          swap(hhb, maxInd, j);
        }
      }
    }
    // console.log("newRamdomArray", newRamdomArray);
    console.log("result sort", hhb);
    setSortedArray(hhb);
  };

  const onBubbleSortBtnClick = () => {
    console.log("bubble sort", newRamdomArray);
    const hhb = [...newRamdomArray];
    // console.log("initial newRamdomArray", newRamdomArray);
    // console.log("copied newRamdomArray", hhb);
    for (let i = 0; i < hhb.length; i++) {
      for (let j = 0; j < hhb.length; j++) {
        if (ascDescType === "increasing" && hhb[j] > hhb[j + 1]) {
          swap(hhb, j, j + 1);
        } else if (ascDescType === "decreasing" && hhb[j] < hhb[j + 1]) {
          swap(hhb, j, j + 1);
        }
      }
    }
    console.log("result bubble sort", hhb);
    setSortedArray(hhb);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.menu}>
        <fieldset className={styles.fieldset}>
          <RadioInput
            value="selectionSort"
            name="algType"
            label="Выбор"
            onClick={onChangeSelectedRadioBtnClick}
            defaultChecked
          />
          <RadioInput
            value="bubbleSort"
            name="algType"
            label="Пузырёк"
            onClick={onChangeSelectedRadioBtnClick}
          />
        </fieldset>
        <div className={styles.handlers}>
          <div className={styles.handlers__type}>
            <Button
              value="increasing"
              onClick={onAscDescBtnClick}
              text="По возрастанию"
            />
            <Button
              value="decreasing"
              onClick={onAscDescBtnClick}
              text="По убыванию"
            />
          </div>
          <Button onClick={onCreateRandomArrBtnClick} text="Новый массив" />
        </div>
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {sortedArray &&
            sortedArray.map((number, i) => {
              return (
                <li key={i}>
                  <Column index={number} />
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
