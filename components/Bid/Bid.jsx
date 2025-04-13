import React from "react";

import styles from "./styles.module.css";

const Bid = ({ bid }) => {
    return (
        <div className={styles.bid}>
        <button className={styles.bid_button}> Pujar </button>
        </div>
    );
    }

export default Bid;