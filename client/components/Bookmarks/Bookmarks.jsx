// import {useRouter} from "next/router";
// import {useEffect} from "react";
import Post from '$ui/Post'
import styles from './Bookmarks.module.scss'
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../pages/api/queries';

export default function Bookmarks() {
    // const router = useRouter()
    const { data, error, loading } = useQuery(GET_ME);
    //
    // useEffect(() => {
    //     if (session === null)
    //         router.push('/login')
    // }, [router, session])

    if (loading) return <p>Loading...</p>
    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <div>
                    <h1>Bookmarks</h1>
                    <Post image={data && data.get_me.profile_pic}/>
                    <Post image={data && data.get_me.profile_pic}/>
                    <Post image={data && data.get_me.profile_pic}/>
                </div>
            </div>
        </div>
    )
}
