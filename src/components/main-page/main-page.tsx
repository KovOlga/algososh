import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

import styles from "./main-page.module.css";

interface MainPageProps {
  extraClass?: string;
}

export const MainPage: React.FC<MainPageProps> = ({ extraClass = "" }) => {
  return (
    <main className={`${styles.content} ${extraClass}`}>
      <div className={styles.title_box}>
        <h1 className={`text text_type_h1 text_color_h1 ${styles.title}`}>
          МБОУ АЛГОСОШ
        </h1>
        <p
          className={`text text_type_fibonacci text_color_secondary ${styles.fibonacci_title}`}
        >
          им. Фибоначчи
        </p>
      </div>
      <div data-testid="main-page" className={styles.cards_box}>
        <Link
          data-testid="recursion-link"
          className={styles.link}
          to="/recursion"
        >
          <div className={`${styles.card} ${styles.string}`} />
        </Link>
        <Link
          data-testid="fibonacci-link"
          className={styles.link}
          to="/fibonacci"
        >
          <div className={`${styles.card} ${styles.fibonacci}`} />
        </Link>
        <Link data-testid="sorting-link" className={styles.link} to="/sorting">
          <div className={`${styles.card} ${styles.arr}`} />
        </Link>
        <Link data-testid="stack-link" className={styles.link} to="/stack">
          <div className={`${styles.card} ${styles.stack}`} />
        </Link>
        <Link data-testid="queue-link" className={styles.link} to="/queue">
          <div className={`${styles.card} ${styles.queue}`} />
        </Link>
        <Link data-testid="list-link" className={styles.link} to="/list">
          <div className={`${styles.card} ${styles.list}`} />
        </Link>
      </div>
      <Marquee className={styles.ticker} gradient={false} speed={200}>
        <p
          className={`text text_type_ticker text_color_secondary ${styles.ticker_text}`}
        >
          Вдохновлено школами, в которых не учили алгоритмам
        </p>
        <div className={styles.dot_box}>
          <p className={styles.dot} />
        </div>
      </Marquee>
      <p
        className={`text text_type_column text_color_input mt-14 ${styles.copyright}`}
      >
        © Сделано в Практикуме.
      </p>
    </main>
  );
};
