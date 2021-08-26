import Link from 'next/link'
import {useSession, signOut} from 'next-auth/client'
import {useState} from "react";
import Logo from "./Logo";
import {motion, AnimatePresence} from "framer-motion"
import styles from './Header.module.scss'
import {IoMenu, IoClose} from 'react-icons/io5'
import DropDownMenu from "./DropDownMenu";


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
    {title: "Bookmarks", href: "/bookmarks"},
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
export default function Header() {
    const [open, setOpen] = useState(false)


    const handleMenu = () => {
        setOpen(!open)
    }

    const [session, loading] = useSession()

    // if (session)
    //     console.log('Session Info: ', session)


    const registerLinks = (
        session
            ?
            <DropDownMenu registeredLinks={registeredLinks}/>
            :
            loading ? <p style={{color: 'white'}}>Loading...</p> :
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
                            {session ? null : links}
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
                    {session ? registeredLinks : links}
                    {session && <button className={styles.googleLogout}
                                        onClick={() => signOut({callbackUrl: 'http://localhost:3000/'})}>Logout</button>}
                </motion.div>
                }
            </AnimatePresence>
        </>
    )
}