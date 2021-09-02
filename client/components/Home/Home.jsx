import Image from 'next/image'
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/client";
import styles from './Home.module.scss'
import { useQuery } from '@apollo/client';
import { GET_ME } from 'pages/api/queries';

export default function Home() {
    const router = useRouter()
    // const [session, loading] = useSession();

    const { data, error, loading } = useQuery(GET_ME);

    useEffect(() => {
        if (data === null) router.push('/login');
    }, [router, data])

    if (loading) return <p>Loading...</p>
    return (
        <div className={styles.container}>
            <div onClick={() => router.push('/profile')} className={styles.profile}>
                <div>
                    {data && <Image src={data.get_me.profile_pic} alt="user" width={90} height={90} />}
                </div>
                <div>
                    <p style={{ textAlign: 'center' }}>{data && data.get_me.name}</p>
                    <hr />
                    <h3>Supporting</h3>
                    <hr />
                    <p>You aren’t supporting any creators yet.</p>
                </div>
            </div>
            <div className={styles.tabs}>
                <h1>All Posts</h1>
            </div>
        </div>
    )
}
