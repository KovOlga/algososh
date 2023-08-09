import React from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./input-with-button.module.css";
import { ElementStates } from "../../types/element-states";
import { ChangeEvent } from "react";

export const InputWithButton: React.FC<{
  input: string[];
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDisplayClick: () => void;
  modifyedLetters: { status: ElementStates; value: string }[];
}> = ({ input, onInputChange, onDisplayClick, modifyedLetters }) => {
  return (
    <div className={styles.data}>
      <div className={styles.data__input}>
        <Input
          extraClass={styles.input_jhb}
          maxLength={11}
          value={input.join("")}
          onChange={onInputChange}
        ></Input>
        <p className={styles.info}>Максимум — 11 символов</p>
      </div>
      <Button text="Развернуть" onClick={onDisplayClick}></Button>
    </div>
  );
};
