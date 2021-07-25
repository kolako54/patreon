import Link from 'next/link'
import {useState} from "react";
import Logo from "./Logo";
import {motion, AnimatePresence} from "framer-motion"
import styles from './Header.module.scss'
import {IoMenu, IoClose} from 'react-icons/io5'

const links = ['For creators', 'Pricing', 'Resources', 'Starter kits'].map(el => (
    <Link key={el} href={'/' + el.replace(' ', '').toLowerCase()}>
        <a className={styles.link}>
            {el}
        </a>
    </Link>
))

const registerLinks = (
    <div className={styles.navButtons}>
        <Link href="/login">
            <a className={styles.logIn}>
                Log In
            </a>
        </Link>
        <Link href="/signin">
            <a className={styles.signIn}>
                Sign In
            </a>
        </Link>
    </div>
)

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
    return (
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <div className={styles.navLinks}>
                        <div style={{cursor: 'pointer'}}>
                            <Logo/>
                        </div>
                        {links}
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
                    {links}
                </motion.div>
                }
            </AnimatePresence>
        </>
    )
}