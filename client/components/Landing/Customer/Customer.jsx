import Image from "next/image";
import styles from "./Customer.module.scss";

export default function Customer({imgDetails, title, description}) {
    return (
        <div className={styles.customer}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image {...imgDetails}/>
            <div>
                <h1>
                    {title}
                </h1>
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}
