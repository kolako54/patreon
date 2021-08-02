import Link from 'next/link'
import Button from "$components/ui/Button";
import {useSession} from "next-auth/client";
import {useForm} from "react-hook-form";
import GoogleLoginButton from "$components/auth/GoogleLogin";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import styles from './SignUp.module.scss'
import {useRouter} from "next/router";
import {useEffect} from "react";

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    confirmEmail: yup.string().email().oneOf(
        [yup.ref('email'), null], 'emails must match'
    ).required(),
    password: yup.string().min(8).max(64).required(),
});

yup.mixed().test('match', 'Emails do not match', function (email) {
    return email === this.options.context.confirmEmail
})


export default function SignUp() {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => console.log(data);

    const router = useRouter()
    const [session] = useSession()

    useEffect(() => {
        if (session) {
            router.push('/home')
        }
    }, [router,session])


    return (
        <div className={styles.container}>
            <h2>
                Sign up
            </h2>

            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <GoogleLoginButton buttonText="Sign up with Google"/>

                    <div>
                        <p>or</p>
                    </div>
                    <div className={styles.inputDiv}>
                        <label htmlFor="name">Name</label>
                        <input {...register(("name"))} name="name" type="text"/>
                        {errors.name && <p className={styles.error}>{errors.name.message} </p>}
                    </div>

                    <div className={styles.inputDiv}>
                        <label htmlFor="email">Email</label>
                        <input {...register("email")} name="email" type="text"/>
                        {errors.email && <p className={styles.error}>{errors.email.message} </p>}
                    </div>

                    <div className={styles.inputDiv}>
                        <label htmlFor="confirmEmail">Confirm Email</label>
                        <input {...register("confirmEmail")} name="confirmEmail" type="text"/>
                        {errors.confirmEmail &&
                        <p className={styles.error}>{errors.confirmEmail.message} </p>}
                    </div>

                    <div className={styles.inputDiv}>
                        <label htmlFor="password">Password</label>
                        <input autoComplete="password" {...register("password")} name="password"
                               type="password"/>
                        {errors.password &&
                        <p className={styles.error}>{errors.password.message} </p>}
                    </div>

                    <div className={styles.submit}>
                        <Button fullWidth
                                disabled={errors.name || errors.email || errors.confirmEmail || errors.password}>
                            Sign up
                        </Button>
                    </div>
                    <div className={styles.termOfUse}>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        By signing up, you agree to Patreon's {" "}
                        <Link href="/term">
                            <a style={{textDecoration: "underline"}}>
                                Terms of Use,
                            </a>
                        </Link>
                        {" "}
                        <Link href="/term">
                            <a style={{textDecoration: "underline"}}>
                                Privacy Policy
                            </a>
                        </Link>
                        {" "}
                        and
                        {" "}
                        <Link href="/term">
                            <a style={{textDecoration: "underline"}}>
                                Cookie Policy.
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
            <div className={styles.cta}>
                <p>Already have an account?</p>
                <Link href="/login">
                    Log in
                </Link>
            </div>
        </div>
    )
}
