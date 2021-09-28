import Image from 'next/image'
import styles from './DropDownMenu.module.scss'
import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import PulseLoader from 'react-spinners/PulseLoader'
import { GET_ME, LOGOUT } from '$api/queries'
import { useRouter } from 'next/router'
import useLogout from '$utils/hooks/useLogout'
import Cookies from 'js-cookie'

export default function DropDownMenu({ registeredLinks }) {
    const [isHover, setIsHover] = useState(false)

    const router = useRouter()
    const { data, loading } = useQuery(GET_ME)
    const logout = useLogout()

    const isAuth = Cookies.get('isAuth')

    if (loading)
        return (
            <PulseLoader
                color={'#55e2d0'}
                css={{
                    position: 'absolute',
                    left: '50%',
                    top: '47%',
                    transform: 'translate(-50%,-50%)',
                }}
            />
        )

    return (
        <div onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={styles.container}>
            {isAuth && <Image src={data.get_me.profile_pic} alt="user" width={45} height={45} />}
            {isHover && (
                <div className={styles.dropdown}>
                    {registeredLinks}
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    )
}
