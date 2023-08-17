import React from "react";
import { Input, InputProps } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./input-with-button.module.css";
import { ChangeEvent } from "react";
import { MouseEvent } from "react";

interface IinputWithButtonProps extends InputProps {
  btnsArr: {
    text: string;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    loader?: boolean | undefined;
    disabled?: boolean | undefined;
  }[];
}

export const InputWithButton: React.FC<IinputWithButtonProps> = ({
  btnsArr,
  ...rest
}) => {
  return (
    <div className={styles.data}>
      <Input {...rest} extraClass={styles.input_jhb} />
      {btnsArr &&
        btnsArr.map((btn, i) => {
          return (
            <Button
              isLoader={btn.loader}
              disabled={btn.disabled}
              key={i}
              text={btn.text}
              onClick={btn.onClick}
            />
          );
        })}
    </div>
  );
};
