import Link from 'next/link'
import Image from "next/image";
import {useState} from "react";
import logo from 'public/favicon.png'
import styles from './Navbar.module.scss'
import {IoMenu, IoClose} from 'react-icons/io5'

const links = ['For creators', 'Pricing', 'Resources', 'Starter kits'].map(el => (
    <Link key={el} href={el.toLowerCase()}>
        <a className={styles.link}>
            {el}
        </a>
    </Link>
))
const favLogo = <Image width={50} height={50} src={logo} alt="logo"/>

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
export default function Navbar() {
    const [open, setOpen] = useState(false)
    const handleMenu = () => {
        setOpen(!open)
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <div className={styles.navLinks}>
                        {favLogo}
                        {links}
                    </div>
                    {registerLinks}
                </div>

                <div className={styles.buttons}>
                    <div style={{marginRight: 'auto'}}>
                        {favLogo}
                    </div>
                    {registerLinks}
                    {!open ?
                        <button onClick={handleMenu}>
                            <IoMenu color="#fff" size={40}/>
                        </button>
                        :
                        <button onClick={handleMenu}>
                            <IoClose color="#fff" size={40}/>
                        </button>
                    }
                </div>
            </div>
            {open &&
            <div className={styles.subMenu}>
                {links}
            </div>
            }
        </>
    )
}