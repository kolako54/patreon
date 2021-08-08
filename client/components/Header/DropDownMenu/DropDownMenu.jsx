import Image from "next/image";
import Link from 'next/link'
import {signOut} from "next-auth/client";
import {useSession} from "next-auth/client";
import styles from './DropDownMenu.module.scss'
import {useState} from "react";

// const links = [
//     {title: "My profile", href: "/profile"},
//     {title: "Setting", href: "/profile/setting"},
//     {title: "Explore creators", href: "/explore"},
//     {title: "Create on Patreon", href: "/create"},
//     {title: "Help center & FAQ", href: "/FAQ"},
// ]
export default function DropDownMenu({registeredLinks}) {
    const [isHover, setIsHover] = useState(false)
    const [session] = useSession()
    return (
        <div onMouseOver={() => setIsHover(true)}
             onMouseLeave={() => setIsHover(false)}
             className={styles.container}>
            <Image src={session.user.image} alt="user" width={45} height={45}/>
            {isHover && <div className={styles.dropdown}>
                {registeredLinks}
                <button onClick={() => signOut({callbackUrl: 'http://localhost:3000/'})}>Logout
                </button>
            </div>
            }
        </div>
    )
}
