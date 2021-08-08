import Link from "next/link";
import styles from "./Button.module.scss";

export default function Button(props) {
    const {
        variant,
        link,
        color,
        href,
        style,
        children,
        onClick,
        disabled,
        fullWidth,
        type,
        sm
    } = props

    let classes = styles.button


    // if (variant === 'contained') {
    if (color === 'primary') {
        classes = [styles.button, styles.primaryColor].join(' ')
    }
    if (color === 'secondary') {
        classes = [styles.button, styles.secondaryColor].join(' ')
    }

    // }

    if (fullWidth) {
        classes = [styles.button, styles.fullWidth].join(' ')
        if (disabled) {
            classes = [styles.button, styles.fullWidth, styles.disabled].join(' ')
        }

    }
    if (sm) {
        classes = [styles.button, styles.sm].join(' ')
    }
    return (
        <button type={type} disabled={!!disabled} onClick={onClick} className={classes}
                style={style}>
            {link &&
            <Link href={href}>
                {children}
            </Link>
            }
            {!link && children}
        </button>
    )
}