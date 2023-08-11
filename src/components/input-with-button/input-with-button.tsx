import React from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./input-with-button.module.css";
import { ChangeEvent } from "react";

interface IinputWithButtonProps {
  input: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDisplayClick: () => void;
}

export const InputWithButton: React.FC<IinputWithButtonProps> = ({
  input,
  onInputChange,
  onDisplayClick,
}) => {
  return (
    <div className={styles.data}>
      <div className={styles.data__input}>
        <Input
          extraClass={styles.input_jhb}
          maxLength={11}
          value={input}
          onChange={onInputChange}
        ></Input>
        <p className={styles.info}>Максимум — 11 символов</p>
      </div>
      <Button text="Развернуть" onClick={onDisplayClick}></Button>
    </div>
  );
};
