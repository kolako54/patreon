import Image from "next/image";
import Link from 'next/link'
import {signOut} from "next-auth/client";
import {useSession} from "next-auth/client";
import styles from './DropDownMenu.module.scss'
import {useState} from "react";
import { GET_ME } from "../../../pages/api/queries";
import { useQuery } from "@apollo/client";

// const links = [
//     {title: "My profile", href: "/profile"},
//     {title: "Setting", href: "/profile/setting"},
//     {title: "Explore creators", href: "/explore"},
//     {title: "Create on Patreon", href: "/create"},
//     {title: "Help center & FAQ", href: "/FAQ"},
// ]
const sign_out = () => {
    localStorage.removeItem('token');
    signOut({callbackUrl: 'http://localhost:3000/'})
}
export default function DropDownMenu({registeredLinks}) {
    const [isHover, setIsHover] = useState(false)
    // const [session] = useSession()
    const {data, error, loading} = useQuery(GET_ME);
    return (
        <div onMouseOver={() => setIsHover(true)}
             onMouseLeave={() => setIsHover(false)}
             className={styles.container}>
            <Image src={data.get_me.profile_pic} alt="user" width={45} height={45}/>
            {isHover && <div className={styles.dropdown}>
                {registeredLinks}
                <button onClick={sign_out}>Logout
                </button>
            </div>
            }
        </div>
    )
}
