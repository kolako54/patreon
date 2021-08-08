import Image from 'next/image'
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSession} from "next-auth/client";
import styles from './Home.module.scss'

export default function Home() {
    const router = useRouter()
    const [session, loading] = useSession()

    useEffect(() => {
        if (session === null)
            router.push('/login')
    }, [router, session])

    if (loading) return <p>Loading...</p>
    return (
        <div className={styles.container}>
            <div onClick={() => router.push('/profile')} className={styles.profile}>
                <div>
                    <Image src={session && session.user.image} alt="user" width={90} height={90}/>
                </div>
                <div>
                    <p style={{textAlign: 'center'}}>{session && session.user.name}</p>
                    <hr/>
                    <h3>Supporting</h3>
                    <hr/>
                    <p>You aren’t supporting any creators yet.</p>
                </div>
            </div>
            <div className={styles.tabs}>
                <h1>All Posts</h1>
            </div>
        </div>
    )
}
