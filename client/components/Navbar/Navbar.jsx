import Link from 'next/link'
import Image from "next/image";
import {useState} from "react";
import Logo from 'public/favicon.png'
import styles from './Navbar.module.scss'
import {IoMenu, IoClose} from 'react-icons/io5'

const links = ['For creators','Pricing','Resources','Starter kits'].map(el => (
    <Link key={el} href={el.toLowerCase()}>
        <a className={styles.link}>
            {el}
        </a>
    </Link>
))

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
                        <Image width={50} height={50} src={Logo} alt="logo"/>
                        {/*<Link href="/product">*/}
                        {/*    <a className={styles.link}>*/}
                        {/*        For creators*/}
                        {/*    </a>*/}
                        {/*</Link>*/}
                        {/*<Link href="/pricing">*/}
                        {/*    <a className={styles.link}>*/}
                        {/*        pricing*/}
                        {/*    </a>*/}
                        {/*</Link>*/}
                        {/*<Link href="/resources">*/}
                        {/*    <a className={styles.link}>*/}
                        {/*        Resources*/}
                        {/*    </a>*/}
                        {/*</Link>*/}
                        {/*<Link href="/starter">*/}
                        {/*    <a className={styles.link}>*/}
                        {/*        Starter kits*/}
                        {/*    </a>*/}
                        {/*</Link>*/}
                        {links}
                    </div>

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
                </div>

                <div className={styles.buttons}>
                    <div style={{marginRight: 'auto'}}>
                        <Image width={50} height={50} src={Logo} alt="logo"/>
                    </div>
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