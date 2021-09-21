import {signIn} from 'next-auth/client'
import Image from 'next/image'
import googleLogo from 'public/google.png'
import styles from "./Google.module.scss";


export default function GoogleLoginButton({buttonText}) {

    return (
        <button className={styles.google} type="button"
                onClick={() => signIn("google", {callbackUrl: process.env.NEXTAUTH_URL + '/home'})}>
            <Image src={googleLogo} alt="google" width={25} height={25}/>
            <p>
                {buttonText}
            </p>
        </button>
    )

}
