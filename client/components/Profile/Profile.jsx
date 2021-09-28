import Image from 'next/image'
import styles from './Profile.module.scss'
import Button from '$components/ui/Button'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GET_ME } from '../../pages/api/queries'
import { useQuery } from '@apollo/client'

export default function Profile() {
    // const {data, loading} = useQuery(GET_ME);

    const router = useRouter()

    // useEffect(() => {
    //     if (data === null) router.push('/login')
    // }, [router])

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div>{data && <Image src={data.get_me.profile_pic} alt="user pic" width={110} height={110} />}</div>
                <div>
                    <p>{data && data.get_me.name}</p>
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
