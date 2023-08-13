import React from "react";
import { Input, InputProps } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./input-with-button.module.css";
import { ChangeEvent } from "react";

interface IinputWithButtonProps extends InputProps {
  input: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  btnsArr: { text: string; onClick: () => void }[];
}

export const InputWithButton: React.FC<IinputWithButtonProps> = ({
  input,
  onInputChange,
  btnsArr,
  ...rest
}) => {
  return (
    <div className={styles.data}>
      <Input
        {...rest}
        extraClass={styles.input_jhb}
        value={input}
        onChange={onInputChange}
      />
      {btnsArr &&
        btnsArr.map((btn, i) => {
          return <Button key={i} text={btn.text} onClick={btn.onClick} />;
        })}
    </div>
  );
};
