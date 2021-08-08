import Image from 'next/image'
import {useSession} from "next-auth/client";
import styles from './Profile.module.scss'
import Button from "$components/ui/Button";
import {useEffect} from "react";
import {useRouter} from 'next/router'

export default function Profile() {
    const [session, loading] = useSession()

    const router = useRouter()

    useEffect(() => {
        if (session === null)
            router.push('/login')
    }, [router, session])


    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div>
                    {session &&
                    <Image src={session.user.image} alt="user pic" width={110} height={110}/>}
                </div>
                <div>
                    <p>{session && session.user.name}</p>
                </div>
                <div>
                    <Button link href="/profile/setting">
                        Edit Profile
                    </Button>
                </div>
            </div>
            <div className={styles.tabs}>
                <h3>Creators</h3>
                <h3>Comment</h3>
                <h3>Likes</h3>
            </div>
        </div>
    )
}
