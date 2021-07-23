import Link from "next/link";
import styles from "./Button.module.scss";

export default function Button({variant, color, href, style,children, cb}) {
    let classes = styles.button
    if (variant === 'contained') {
        if (color === 'primary') {
            classes = [styles.button, styles.primaryColor].join(' ')
        }
        if (color === 'secondary') {
            classes = [styles.button, styles.secondaryColor].join(' ')
        }
    }

    return (
        <Link href={href || ''}>
            <a className={classes} style={style} onClick={cb}>
                {children}
            </a>
        </Link>
    )
}