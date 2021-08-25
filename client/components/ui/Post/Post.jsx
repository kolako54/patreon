import Image from "next/image";
import {useState} from "react";
import {
    IoBookmarkOutline,
    IoBookmark,
    IoHeart,
    IoChatboxOutline,
    IoEllipsisVerticalSharp,
    IoHeartOutline, IoShareSocialOutline
} from "react-icons/io5";
import styles from './Post.module.scss'

export default function Post({image}) {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    return (
        <div style={{margin: '1rem 0'}}>
            <div className={styles.info}>
                <div>
                    {image && <Image src={image} width={45} height={45} alt="user image"/>}
                    <h4>Erfan Ansari</h4>
                    <p>@erfanhimself</p>
                    <p>19h</p>
                </div>
                <button>
                    <IoEllipsisVerticalSharp size={25} color="#c5c7c9"/>
                </button>
            </div>
            <div className={styles.content}>
                <p>
                    10,222 #BTC (491,418,790 USD) transferred from #Coinbase to unknown
                    wallet
                    Details
                </p>
            </div>
            <div className={styles.icons}>
                <div className={styles.number}>
                    <button>
                        <IoChatboxOutline/>
                    </button>
                    <p>6</p>
                </div>
                <div className={styles.number}>
                    <button onClick={() => setIsLiked(!isLiked)}>
                        {isLiked ? <IoHeart/> : <IoHeartOutline/>}
                        <p>45</p>
                    </button>
                </div>
                <button>
                    <IoShareSocialOutline/>
                </button>
                <button onClick={() => setIsBookmarked(!isBookmarked)}>
                    {isBookmarked ? <IoBookmark/> : <IoBookmarkOutline/>}
                </button>
            </div>
        </div>
    )
}
