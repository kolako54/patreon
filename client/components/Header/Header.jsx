import Link from 'next/link'
import {signOut} from 'next-auth/client'
import {useState} from "react";
import Logo from "./Logo";
import {motion, AnimatePresence} from "framer-motion"
import styles from './Header.module.scss'
import {IoMenu, IoClose} from 'react-icons/io5'
import DropDownMenu from "./DropDownMenu";
import {GET_ME} from 'pages/api/queries';
import {useQuery} from '@apollo/client';
import ClipLoader from 'react-spinners/ClipLoader'


const links = ['For creators', 'Pricing', 'Resources', 'Starter kits'].map(el => (
    <Link key={el} href={'/' + el.replace(' ', '').toLowerCase()}>
        <a className={styles.link}>
            {el}
        </a>
    </Link>
))
const registeredLinks = [
    {title: "My profile", href: "/profile"},
    {title: "Setting", href: "/profile/setting"},
    {title: "Explore creators", href: "/explore"},
    {title: "Create on Patreon", href: "/create"},
    {title: "Help center & FAQ", href: "/FAQ"},
].map(({title, href}) => (
    <Link key={title} href={href}>{title}</Link>
))

const subMenuVariants = {
    close: {
        opacity: 0
    },
    open: {
        opacity: 1
    }
}
const sign_out = () => {
    localStorage.removeItem('token');
    signOut({callbackUrl: 'http://localhost:3000/'});
}
export default function Header() {
    const [open, setOpen] = useState(false)


    const handleMenu = () => {
        setOpen(!open)
    }

    const {data, loading} = useQuery(GET_ME)
    const registerLinks = (
        data
            ?
            <DropDownMenu registeredLinks={registeredLinks}/>
            :
            loading ?
                <ClipLoader size={35} css={{marginRight: '2rem'}} color={"#55e2d0"}/>
                :
                <div className={styles.navButtons}>
                    <Link href="/login">
                        <a className={styles.logIn}>
                            Log In
                        </a>
                    </Link>
                    <Link href="/signup">
                        <a className={styles.signIn}>
                            Sign Up
                        </a>
                    </Link>
                </div>

    )

    return (
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <div className={styles.navLinks}>
                        <div style={{cursor: 'pointer'}}>
                            <Logo/>
                        </div>
                        <div>
                            {data ? null : links}
                        </div>
                    </div>
                    {registerLinks}
                </div>

                <div className={styles.buttons}>
                    <div style={{marginRight: 'auto'}}>
                        <Logo/>
                    </div>
                    {registerLinks}
                    {!open ?
                        <motion.button
                            animate={{
                                rotateZ: 0
                            }}
                            onClick={handleMenu}>
                            <IoMenu color="#fff" size={40}/>
                        </motion.button>
                        :
                        <motion.button
                            animate={{
                                rotateZ: '-90deg'
                            }}
                            onClick={handleMenu}>
                            <IoClose color="#fff" size={40}/>
                        </motion.button>
                    }
                </div>
            </div>
            <AnimatePresence>
                {open &&
                <motion.div
                    variants={subMenuVariants}
                    exit="close"
                    initial="close"
                    animate="open"
                    className={styles.subMenu}>
                    {data ? registeredLinks : links}
                    {data && <button className={styles.googleLogout}
                                     onClick={sign_out}>Logout</button>}
                </motion.div>
                }
            </AnimatePresence>
        </>
    )
}