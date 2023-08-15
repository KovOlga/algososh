import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { useState, useEffect } from "react";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { createRandomArr } from "../../utils/utils";

export const SortingPage: React.FC = () => {
  const [ascDescType, setAscDescType] = useState<string>("increasing");
  const [selectedRadioBtn, setSelectedRadioBtn] =
    useState<string>("selectionSort");
  const [ramdomArray, setRamdomArray] = useState<number[]>([]);
  const [sortedArray, setSortedArray] = useState<
    { value: number; status: ElementStates }[]
  >([]);

  useEffect(() => {
    onCreateNewRandomArrBtnClick();
  }, []);

  const onCreateNewRandomArrBtnClick = () => {
    const randomNumsArray = createRandomArr(3, 18, 0, 101);
    setRamdomArray(randomNumsArray);
    const hbh = randomNumsArray.map((item) => {
      return { value: item, status: ElementStates.Default };
    });
    setSortedArray(hbh);
  };

  const onAscDescBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAscDescType(event.currentTarget.value);
  };

  const onChangeSelectedRadioBtnClick = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    setSelectedRadioBtn(event.currentTarget.value);
  };

  useEffect(() => {
    if (selectedRadioBtn === "selectionSort") {
      onSelectionSortBtnClick();
    } else {
      onBubbleSortBtnClick();
    }
  }, [ascDescType, selectedRadioBtn, ramdomArray]);

  const onSelectionSortBtnClick = async () => {
    console.log("ramdomArray", ramdomArray);
    // onLoadingChange(e);
    for (let i = 0; i <= sortedArray.length; i++) {
      console.log("i", sortedArray[i]);
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(i), 1000);
      });
      promise.then((outerInd) => {
        setSortedArray((prevState) => {
          return prevState.map((item, index) => {
            if (index < i) {
              return { ...item, status: ElementStates.Modified };
            } else if (index === Number(outerInd)) {
              return { ...item, status: ElementStates.Changing };
            } else {
              return item;
            }
          });
        });
      });
      await promise;
      for (let j = i + 1; j < sortedArray.length; j++) {
        console.log("sortedArray[j]", sortedArray[j]);
        let promise2 = new Promise((resolve, reject) => {
          setTimeout(() => resolve("j"), 1000);
        });
        promise2.then(() => {
          setSortedArray((prevState) => {
            return prevState.map((item, index) => {
              if (index === j) {
                return { ...item, status: ElementStates.Changing };
              } else if (index > i && index < j) {
                return { ...item, status: ElementStates.Default };
              } else {
                return item;
              }
            });
          });
        });
        await promise2;
        console.warn("what is the array?", sortedArray);
        let promise3 = new Promise((resolve, reject) => {
          setTimeout(() => resolve("j"), 1000);
        });
        promise3.then(() => {
          setSortedArray((prevstate) => {
            if (prevstate[i].value > prevstate[j].value) {
              console.log("SWAPED", prevstate[i].value, prevstate[j].value);
              const temp = prevstate[i];
              prevstate[i] = prevstate[j];
              prevstate[j] = temp;
              return prevstate.map((item, index) => {
                if (index === i) {
                  return { ...item, status: ElementStates.Modified };
                } else if (index === j) {
                  return { ...item, status: ElementStates.Default };
                } else {
                  return item;
                }
              });
            } else {
              return prevstate.map((item, index) => {
                if (index === prevstate.length - 1) {
                  return { ...item, status: ElementStates.Default };
                } else {
                  return item;
                }
              });
            }
          });
        });
        await promise3;
      }
    }
    // setLoading("");
    // setInputValue("");
  };

  const onBubbleSortBtnClick = () => {
    console.log("bubble sort");
    // const hhb = getBubbleSortedArr([...newRamdomArray], ascDescType);
    // console.log("result bubble sort", hhb);
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
