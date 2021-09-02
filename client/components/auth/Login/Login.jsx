import Link from 'next/link'
import Button from "$ui/Button";
import {useEffect} from "react";
import {useSession} from 'next-auth/client'
import GoogleLoginButton from "$components/auth/GoogleLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { LOGIN_USER } from "../../../pages/api/queries"
import * as yup from "yup";


import formStyles from '../form.module.scss'
import styles from './Login.module.scss'
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from '@apollo/client';
import isLoggedInVar from './../../../apollo-client/cache';
const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(64).required(),
});


export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [get_user, {
        data,
        error, }] = useLazyQuery(LOGIN_USER, {
            onCompleted: (d) => {
                localStorage.setItem('token', 'Bearer ' + d.loginUser.token);
                isLoggedInVar(true)
            }
        });

    const onSubmit = async data => {
        try {
            await get_user({ variables: { email: data.email, password: data.password } });
        } catch (err) {
            console.error(err.message);
        }
    }

    // const [session] = useSession()

    const router = useRouter()
    useEffect(() => {
        if (data) {
            router.push('/home')
        }
    }, [router, data])


    return (
        <div className={formStyles.container}>
            <h2>
                Log in
            </h2>

            <div className={formStyles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={formStyles.inputDiv}>
                        <label htmlFor="email">Email</label>
                        <input {...register("email")} name="email"
                               type="text"/>
                        {errors.email &&
                        <p className={formStyles.error}>{errors.email.message} </p>}
                    </div>
                    <div className={formStyles.inputDiv}>
                        <label htmlFor="password">Password</label>
                        <input autoComplete="password" {...register("password", { min: 8, max: 64 })}
                            name="password"
                            type="password" />
                        {errors.password &&
                            <p className={formStyles.error}>{errors.password.message} </p>}
                    </div>
                    <div className={styles.forgetPassword}>
                        <Link href="/forgot-password">
                            <a>Forgot password?</a>
                        </Link>
                    </div>
                    <div>
                        <Button fullWidth disabled={errors.password || errors.email}>
                            Log in
                        </Button>
                    </div>
                    <div>
                        <p>or</p>
                    </div>
                    <GoogleLoginButton buttonText="Continue with Google" />

                </form>
                <h4 style={{ color: "red" }}>{error?.message}</h4>
            </div>
            <div className={styles.cta}>
                <p>New to Patreon?</p>
                <Link href="/signup">
                    Sign up
                </Link>
            </div>
        </div>
    )
}
