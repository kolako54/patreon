import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/router";
import {dummyDataVar} from "$apollo/store";
import {useReactiveVar} from "@apollo/client";
import {motion} from "framer-motion";
import {
    IoBookmarkOutline,
    IoBookmark,
    IoHeart,
    IoChatboxOutline,
    IoEllipsisVerticalSharp,
    IoHeartOutline,
    IoShareSocialOutline,
    IoEllipsisHorizontalSharp,
} from "react-icons/io5";
import styles from './Post.module.scss'

const active = {
    scale: 1
}
const disable = {
    scale: 1.05
}
const transition = {
    type: "spring",
    stiffness: 400,
    dumping: 30,
    velocity: 5
}

export default function Post({image, comment, info}) {
    console.log('info', info)
    console.log('comment: ', comment)
    if(info){
        var {name, username, time, content} = info
    }
    // const {name, username, time, content} = info

   
    const router = useRouter()
    const [isBookmarked, setIsBookmarked] = useState(false)
    const bottom = comment ? '-4px' : '2px'
    const left = comment ? '45px' : '35px'
    const dummyData = useReactiveVar(dummyDataVar)
    console.log('dummyData', dummyData)
    console.log('name', name);

    return (
        <div className={styles.post}>
            <div className={styles.info}
                 style={{justifyContent: comment ? 'space-between' : 'space-around'}}>
                <div>
                    {image && <Image src={image} width={45} height={45} alt="user image"/>}
                    {/* <h4>{info && name}</h4> */}
                    <div className={styles.usernameAndTime}>
                        <p style={{margin: '.4rem 0'}}>{username}</p>
                        <p style={{margin: '0 .4rem 0 1rem'}}>{time}</p>
                    </div>
                </div>
                <button className="icon">
                    {comment ? <IoEllipsisHorizontalSharp size={25} color="#c5c7c9"/>
                        :
                        <IoEllipsisVerticalSharp size={25} color="#c5c7c9"/>}
                </button>
            </div>
            <div className={styles.content} style={{margin: comment ? 'unset' : '0 auto 1rem'}}>
                <p>
                    {content}
                </p>
            </div>
            <div className={styles.icons}
                 style={{justifyContent: comment ? 'space-around' : 'space-evenly'}}>
                <div className={styles.number}>
                    <button onClick={() => router.push('/comment/1')} className="icon">
                        <IoChatboxOutline/>
                    </button>
                    <p style={{bottom, left}}>6</p>
                </div>
                <div className={styles.number}>
                    <button
                        onClick={() => {

                            dummyDataVar({
                                likes: dummyData.isLiked ? dummyData.likes - 1 : dummyData.likes + 1,
                                isLiked: !dummyData.isLiked
                            })
                        }}
                        className="icon"
                    >
                        {dummyData.isLiked ?

                            <motion.div animate={active} transition={transition}>
                                <IoHeart/>
                            </motion.div>
                            :
                            <motion.div animate={disable} transition={transition}>
                                <IoHeartOutline/>
                            </motion.div>
                        }
                        <p style={{bottom, left}}>{dummyDataVar().likes}</p>
                    </button>
                </div>
                <button className="icon">
                    <IoShareSocialOutline/>
                </button>
                <button className="icon"
                        onClick={() => {
                            setIsBookmarked(!isBookmarked);
                        }}
                >
                    {isBookmarked ?
                        <motion.div animate={active} transition={transition}>
                            <IoBookmark/>
                        </motion.div>
                        :
                        <motion.div animate={disable} transition={transition}>
                            <IoBookmarkOutline/>
                        </motion.div>}
                </button>
            </div>
            {comment && <hr/>}
        </div>
    )
}

Post.defaults = {
    info: {
        name: 'name',
        username: 'username',
        time: 'time',
        content: 'this is some content.'
    }
}
