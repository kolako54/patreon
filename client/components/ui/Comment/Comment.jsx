import Image from "next/image";
import Link from 'next/link'
import styles from './Comment.module.scss'
import {useSession} from "next-auth/client";
import {useForm} from "react-hook-form";
import {dummyDataVar} from "$apollo/store";
import {useReactiveVar} from "@apollo/client";
import Post from "$ui/Post"
import {
    IoArrowBack,
    IoEllipsisHorizontalSharp,
    IoHeart,
    IoHeartOutline,
    IoBookmarkOutline,
    IoBookmark,
    IoChatboxOutline,
    IoEllipsisVerticalSharp,
    IoShareSocialOutline
} from 'react-icons/io5'
import {useState} from "react";
import Button from "$ui/Button";
import {motion} from "framer-motion";
import defaultUserPicture from '$assets/images/defaultUserPicture.png'

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


export default function Comment() {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const {register, handleSubmit} = useForm()
    const [session, loading] = useSession()

    const dummyData = useReactiveVar(dummyDataVar)
    const onSubmit = data => console.log(data)

    if (loading) return <p>Loading...</p>


    return (
        <div className={styles.container}>
            <div className={styles.back}>
                {/* eslint-disable-next-line @next/next/link-passhref */}
                <Link href="/home">
                    <span>
                    <IoArrowBack style={{cursor: 'pointer'}} size={35} color="#c5c7c9"/>
                    </span>
                </Link>
                <h3>Tweet</h3>
            </div>
            <div className={styles.tweet}>
                <div className={styles.image}>
                    <div className={styles.info}>
                        <Image src={session && session.user.image} width={50} height={50}
                               alt="user image"/>
                        <div className={styles.nameAndUserName}>
                            <h3>TOBTC</h3>
                            <p>@tobtc_</p>
                        </div>
                    </div>

                </div>
                <p className={styles.content}>If 46600$ was strong support for #BTC, 47600$ will be
                    strong resistance ahead of
                    #Bitcoin.</p>
                <p className={styles.date}>2:24 PM · Aug 26, 2021</p>
                <hr/>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {/*<p className={styles.likes}>{dummyData.likes} Likes</p>*/}
                    <p className={styles.likes}>{dummyData.likes} Likes</p>
                    <div>
                        <button className="icon">
                            <IoShareSocialOutline/>
                        </button>
                        <button onClick={() => setIsBookmarked(!isBookmarked)} className="icon">
                            {isBookmarked ?
                                <motion.div animate={active} transition={transition}>
                                    <IoBookmark/>
                                </motion.div>
                                :
                                <motion.div animate={disable} transition={transition}>
                                    <IoBookmarkOutline/>
                                </motion.div>
                            }                        </button>

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
                        </button>
                    </div>
                </div>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputContainer}>
                        <div style={{minWidth: '3rem', alignSelf: 'baseline'}}>
                            <Image src={session && session.user.image} width={50} height={50}
                                   alt="user image"/>
                        </div>
                        {/*<input type="text" placeholder="Type your reply"/>*/}
                        <textarea {...register('text')} placeholder="Type your reply"/>
                        <Button>
                            Reply
                        </Button>
                    </div>
                </form>
                <hr/>
                <Post
                    comment
                    image={defaultUserPicture}
                    info={{
                        name: '⁩⁩ᴠɪᴠɪsᴇɴ',
                        username: '@vivisen',
                        time: '10h',
                        content: '#zil bridge is coming very soon\n' +
                            'keep an eye on it\n' +
                            'could pump hard 🚀'
                    }}
                />
                {/*<Post dummyData={dummyData} setDummyData={setDummyData} comment*/}
                {/*      image={session && session.user.image}/>*/}
            </div>
        </div>
    )
}
