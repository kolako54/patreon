import Image from 'next/image'
import Button from "$components/ui/Button";
import {IoSearchOutline} from 'react-icons/io5'
import dummyImg from '$assets/images/dummy/dummyVideoPlaceholder.png'
import styles from './Landing.module.scss'

export default function Landing() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headers}>
                    <h1 className={styles.heading}>
                        Change the way art is valued
                    </h1>
                    <h3 className={styles.caption}>
                        Let your most passionate fans support your creative work via monthly
                        membership.
                    </h3>
                    <Button href="/signin">
                        Get Started
                    </Button>
                </div>
                <div className={styles.image}>
                    <Image src={dummyImg} alt="dummy img"/>
                </div>
            </div>

            <div className={styles.search}>
                <h1>
                    Search the 200,000+ creators on Patreon
                </h1>
                <div>
                    <span style={{marginRight: '-1.6rem', zIndex: 1}}>
                    <IoSearchOutline/>
                    </span>
                    <input placeholder="Find a creator you love" type="text"/>
                </div>
                <Button href="/search">
                    Search
                </Button>
            </div>

            <div className={styles.about}>
                <h1>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    What's Patreon?
                </h1>
                    <p>
                        On Patreon, you can let your fans become active participants in the work
                        they
                        love by offering them a monthly membership. You give them access to
                        exclusive
                        content, community, and insight into your creative process. In exchange, you
                        get
                        the freedom to do your best work, and the stability you need to build an
                        independent creative career.

                    </p>
            </div>
        </div>
    )
}