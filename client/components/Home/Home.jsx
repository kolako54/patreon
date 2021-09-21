import Image from 'next/image'
import {useRouter} from "next/router";
import Post from "$ui/Post"
import styles from './Home.module.scss'
import {useQuery} from '@apollo/client';
import {GET_ME} from 'pages/api/queries';

export default function Home() {
    const router = useRouter()

    const {data, loading} = useQuery(GET_ME);

    // useEffect(() => {
    //     if (data === null) router.push('/login');
    // }, [router, data])

    const goToProfile = () => router.push('/profile')

    if (loading) return <p>Loading...</p>

    return (
        <div className={styles.container}>
            <div onClick={goToProfile} className={styles.profile}>
                <div>
                    {data &&
                    <Image src={data.get_me.profile_pic} alt="user" width={90} height={90}/>}
                </div>
                <div>
                    <p style={{textAlign: 'center'}}
                       onClick={goToProfile}>{data && data.get_me.name}</p>
                    <hr/>
                    <h3>Supporting</h3>
                    <hr/>
                    <p>You aren’t supporting any creators yet.</p>
                </div>
            </div>
            <div className={styles.tabs}>
                <div>
                    <h1>All Posts</h1>
                    <Post
                        image={data && data.get_me.profile_pic}
                        info={{
                            name: 'Erfan Ansari',
                            username: 'erfanhimself',
                            time: '19h',
                            content: 'If 46600$ was strong support for #BTC, 47600$ will be strong resistance ahead of #Bitcoin.'
                        }}
                    />
                    {/*<Post*/}
                    {/*    image={session && session.user.image}*/}
                    {/*    info={{*/}
                    {/*        name: 'Erfan Ansari',*/}
                    {/*        username: 'erfanhimself',*/}
                    {/*        time: '19h',*/}
                    {/*        content: 'this some dummy god damned text'*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<Post*/}
                    {/*    image={session && session.user.image}*/}
                    {/*    info={{*/}
                    {/*        name: 'Erfan Ansari',*/}
                    {/*        username: 'erfanhimself',*/}
                    {/*        time: '19h',*/}
                    {/*        content: 'this some dummy god damned text'*/}
                    {/*    }}*/}
                    {/*/>*/}
                    =======
                    <Post image={data && data.get_me.profile_pic}/>
                    <Post image={data && data.get_me.profile_pic}/>
                    <Post image={data && data.get_me.profile_pic}/>
                </div>
            </div>
        </div>
    )
}
