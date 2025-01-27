import React, { useMemo } from "react";
import styles from "./content.module.scss";
import { Quote } from "../models/quote";

type ContentProps = {
    quotes: Quote[];
    isLoading: boolean;
    quoteCount: number;
};

const Content: React.FC<ContentProps> = ({ quotes, isLoading, quoteCount }: ContentProps) => {

    const renderedQuotes = useMemo(
        () =>
            quotes?.map((quote, index) => (
                <div key={index} className={styles.quoteCard}>
                    <div className={styles.quoteText}>{quote.text}</div>
                    <div className={styles.author}>— {quote.author || "Unknown"}</div>
                </div>
            )),
        [quotes]
    );

    return (
        <div className={styles.container}>
            <div className={styles.quotesContainer}>
                {isLoading ? <p>Loading quotes...</p> : renderedQuotes}
            </div>
            {!quotes.length && !isLoading && <p className={styles.error}>No quotes found, try using a different filter.</p>}
            {!!quotes.length && quotes.length < quoteCount && !isLoading && <p className={styles.error}>Sorry... that's all we could find :-(</p>}
        </div>
    );
};

export default Content;
