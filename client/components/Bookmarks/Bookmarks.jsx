import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSession} from "next-auth/client";
import Post from '$ui/Post'
import styles from './Bookmarks.module.scss'

export default function Bookmarks() {
    const router = useRouter()
    const [session, loading] = useSession()

    useEffect(() => {
        if (session === null)
            router.push('/login')
    }, [router, session])

    if (loading) return <p>Loading...</p>
    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <div>
                    <h1>Bookmarks</h1>
                    <Post image={session && session.user.image}/>
                    <Post image={session && session.user.image}/>
                    <Post image={session && session.user.image}/>
                </div>
            </div>
        </div>
    )
}
