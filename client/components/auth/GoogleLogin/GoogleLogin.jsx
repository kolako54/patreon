import {signIn} from 'next-auth/client'
import Image from 'next/image'
import google from 'public/google.png'
import styles from "./Google.module.scss";


export default function GoogleLoginButton({buttonText}) {

    return (
        <button className={styles.google} type="button" onClick={() => signIn("google")}>
            <Image src={google} alt="google" width={25} height={25}/>
            <p>
                {buttonText}
            </p>
        </button>
    )

}