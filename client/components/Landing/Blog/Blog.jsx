import Link from 'next/link'
import Image from 'next/image'
import styles from './Blog.module.scss'

export default function Blog({imgDetails, title, description, href}) {
    return (
        <div className={styles.container}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}

            <Image {...imgDetails}/>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href={href}>
                    <a className={styles.link}>
                        Read More
                    </a>
                </Link>
        </div>
    )
}
