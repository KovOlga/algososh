import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { useState, useEffect } from "react";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { createRandomArr, waitToUpdate } from "../../utils/utils";
import { MouseEvent } from "react";
import { Direction } from "../../types/direction";
import { swap } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [selectedRadioBtn, setSelectedRadioBtn] =
    useState<string>("selectionSort");
  const [arr, setArr] = useState<{ value: number; status: ElementStates }[]>(
    []
  );
  const [loading, setLoading] = useState<string>("");

  useEffect(() => {
    onCreateNewRandomArrBtnClick();
  }, []);

  const onCreateNewRandomArrBtnClick = () => {
    const randomArray = createRandomArr(3, 18, 0, 101).map((item) => {
      return { value: item, status: ElementStates.Default };
    });
    setArr(randomArray);
  };

  const onChangeSelectedRadioBtnClick = (
    event: MouseEvent<HTMLInputElement>
  ) => {
    setSelectedRadioBtn(event.currentTarget.value);
  };

  const onAscDescTypeBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    setLoading(event.currentTarget.innerText);
    if (selectedRadioBtn === "selectionSort") {
      sortSelection(event.currentTarget.value);
    } else {
      sortBubble(event.currentTarget.value);
    }
  };

  const sortSelection = async (ascDescType: string) => {
    for (let i = 0; i <= arr.length; i++) {
      await waitToUpdate(DELAY_IN_MS);
      setArr((prevState) => {
        return prevState.map((item, index) => {
          if (index < i) {
            return { ...item, status: ElementStates.Modified };
          } else if (index === Number(i)) {
            return { ...item, status: ElementStates.Changing };
          } else {
            return item;
          }
        });
      });

      for (let j = i + 1; j < arr.length; j++) {
        await waitToUpdate(DELAY_IN_MS);
        setArr((prevState) => {
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
        await waitToUpdate(DELAY_IN_MS);

        setArr((prevstate) => {
          if (
            (ascDescType === Direction.Ascending &&
              prevstate[i].value > prevstate[j].value) ||
            (ascDescType === Direction.Descending &&
              prevstate[i].value < prevstate[j].value)
          ) {
            swap(prevstate, i, j);
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
      }
    }
    setLoading("");
  };

  const sortBubble = async (ascDescType: string) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        await waitToUpdate(DELAY_IN_MS);

        setArr((prevState) => {
          if (
            (ascDescType === Direction.Ascending &&
              prevState[j].value > prevState[j + 1].value) ||
            (ascDescType === Direction.Descending &&
              prevState[j].value < prevState[j + 1].value)
          ) {
            swap(prevState, j, j + 1);
          }
          return prevState.map((item, index) => {
            if (index === j || index === j + 1) {
              return { ...item, status: ElementStates.Changing };
            } else if (index < j) {
              return { ...item, status: ElementStates.Default };
            } else {
              return item;
            }
          });
        });
      }
      await waitToUpdate(DELAY_IN_MS);

      setArr((prevState) => {
        return prevState.map((item, index) => {
          if (index === arr.length - i - 1) {
            return { ...item, status: ElementStates.Modified };
          } else if (index < arr.length - i - 1) {
            return { ...item, status: ElementStates.Default };
          } else {
            return item;
          }
        });
      });
    }
    setLoading("");
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
              value={Direction.Ascending}
              onClick={onAscDescTypeBtnClick}
              text="По возрастанию"
              isLoader={loading === "По возрастанию"}
              disabled={loading !== ""}
              sorting={Direction.Ascending}
            />
            <Button
              value={Direction.Descending}
              onClick={onAscDescTypeBtnClick}
              text="По убыванию"
              isLoader={loading === "По убыванию"}
              disabled={loading !== ""}
              sorting={Direction.Descending}
            />
          </div>
          <Button
            onClick={onCreateNewRandomArrBtnClick}
            text="Новый массив"
            disabled={loading !== ""}
          />
        </div>
      </div>
      <div className={styles.display}>
        <ul className={styles.list}>
          {arr &&
            arr.map((elem, i) => {
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
