import Image from "next/image";
import Link from 'next/link'
import styles from './Comment.module.scss'
import {IoChevronForwardOutline} from 'react-icons/io5'

export default function Comment({imgDetails, title, description, name, job, info, flexDir}) {
    const {src, alt, width, height} = imgDetails
    return (
        <div style={{flexDirection: flexDir || 'row'}} className={styles.container}>

            <div className={styles.body} style={{
                padding: '0 1rem',
                margin: flexDir === 'row' ? '0 2rem 0 0' : '0 0 0 2rem'
            }}>
                <h1 className={styles.title}>{title}</h1>
                <p style={{fontSize:'18px'}}>{description}</p>
            </div>

            <div>
                <div>
                    <div className={styles.image}>
                        <Image width={width} height={height} src={src} alt={alt}/>
                    </div>
                    <div className={styles.link}>
                        <Link href="/" passHref>
                            <a className={styles.name}>{name}</a>
                        </Link>
                        <span>
                           <IoChevronForwardOutline size={30}/>
                        </span>
                    </div>
                    <p className={styles.job}>{job}</p>
                    <p className={styles.info}>{info}</p>
                </div>
            </div>
        </div>
    )
}
