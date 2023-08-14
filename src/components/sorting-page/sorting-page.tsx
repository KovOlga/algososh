import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { useState, useEffect } from "react";
import { Column } from "../ui/column/column";
import { getSortedArr, getBubbleSortedArr } from "./alg-utils";
import { ElementStates } from "../../types/element-states";
import { createRandomArr } from "../../utils/utils";

export const SortingPage: React.FC = () => {
  const [ascDescType, setAscDescType] = useState<string>("increasing");
  const [selectedRadioBtn, setSelectedRadioBtn] =
    useState<string>("selectionSort");
  const [newRamdomArray, setNewRamdomArray] = useState<number[]>([]);
  const [sortedArray, setSortedArray] = useState<
    { value: number; status: ElementStates }[]
  >([]);

  useEffect(() => {
    onCreateNewRandomArrBtnClick();
  }, []);

  const onCreateNewRandomArrBtnClick = () => {
    const randomNumsArray = createRandomArr(3, 18, 0, 101);
    setNewRamdomArray(randomNumsArray);
  };

  const onAscDescBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAscDescType(event.currentTarget.value);
  };

  const onChangeSelectedRadioBtnClick = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    setSelectedRadioBtn(event.currentTarget.value);
  };

  ////////////////////////////////////

  useEffect(() => {
    if (selectedRadioBtn === "selectionSort") {
      onSelectionSortBtnClick();
    } else {
      onBubbleSortBtnClick();
    }
  }, [ascDescType, selectedRadioBtn, newRamdomArray]);

  const onSelectionSortBtnClick = () => {
    const sortedArrayMatrixed = getSortedArr(
      [...newRamdomArray].map((item) => {
        return { value: item, status: ElementStates.Default };
      }),
      ascDescType
    );
    console.log("result sort", sortedArrayMatrixed);

    let step = 0;
    const timerId = setInterval(() => {
      if (step < sortedArrayMatrixed.length) {
        setSortedArray(sortedArrayMatrixed[step]);
        step++;
      } else {
        clearInterval(timerId);
      }
    }, 1000);
  };

  const onBubbleSortBtnClick = () => {
    console.log("bubble sort", newRamdomArray);
    const hhb = getBubbleSortedArr([...newRamdomArray], ascDescType);
    console.log("result bubble sort", hhb);
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
          <Button onClick={onCreateNewRandomArrBtnClick} text="Новый массив" />
        </div>
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {sortedArray &&
            sortedArray.map((elem, i) => {
              return (
                <li key={i}>
                  <Column index={elem.value} state={elem.status} />
                </li>
              );
            })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
