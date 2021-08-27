import Link from 'next/link'
import Button from "$ui/Button";
import {useSession} from "next-auth/client";
import {useForm} from "react-hook-form";
import GoogleLoginButton from "$components/auth/GoogleLogin";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import formStyles from '../form.module.scss'
import styles from './SignUp.module.scss'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { REGISTER } from "../../../pages/api/queries"
import { useMutation } from '@apollo/client';

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(64).required(),
    confirmPassword: yup.string().min(8).max(64).oneOf(
        [yup.ref('password'), null], 'password must match'
    ).required(),
});

yup.mixed().test('match', 'passwords do not match', function (password) {
    return password === this.options.context.confirmPassword
})



export default function SignUp() {
    const [registers, { data, error }] = useMutation(REGISTER);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async data => {
        try {
            await registers({
                variables: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                }
            });
        }
        catch (e) { console.error(e.message) }
    }

    const router = useRouter()
    const [session] = useSession()

    useEffect(() => {
        if (session) {
            router.push('/home')
        }
       
    }, [router, session])


    return (
        <div className={formStyles.container}>
            <h2>
                Sign up
            </h2>

            <div className={formStyles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <GoogleLoginButton buttonText="Sign up with Google" />

                    <div>
                        <p>or</p>
                    </div>
                    <div className={formStyles.inputDiv}>
                        <label htmlFor="name">Name</label>
                        <input {...register(("name"))} name="name" type="text" />
                        {errors.name && <p className={formStyles.error}>{errors.name.message} </p>}
                    </div>

                    <div className={formStyles.inputDiv}>
                        <label htmlFor="email">Email</label>
                        <input {...register("email")} name="email" type="text" />
                        {errors.email && <p className={formStyles.error}>{errors.email.message} </p>}
                    </div>

                    <div className={formStyles.inputDiv}>
                        <label htmlFor="password">Password</label>
                        <input autoComplete="password" {...register("password")} name="password"
                            type="password" />
                        {errors.password &&
                            <p className={formStyles.error}>{errors.password.message} </p>}
                    </div>
                    <div className={formStyles.inputDiv}>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input {...register("confirmPassword")} name="confirmPassword" type="password" />
                        {errors.confirmPassword &&
                            <p className={formStyles.error}>{errors.confirmPassword.message} </p>}
                    </div>

                    <div className={styles.submit}>
                        <Button fullWidth
                            disabled={errors.name || errors.email || errors.confirmPassword || errors.password}>
                            Sign up
                        </Button>
                    </div>
                    { error && <h3 style={{ color: "red" }}>{error.message}</h3>}
                    {/* {err && <h3 style={{ color: "red" }}>{err.message}</h3>} */}
                    <div className={styles.termOfUse}>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        By signing up, you agree to Patreon's {" "}
                        <Link href="/term">
                            <a style={{ textDecoration: "underline" }}>
                                Terms of Use,
                            </a>
                        </Link>
                        {" "}
                        <Link href="/term">
                            <a style={{ textDecoration: "underline" }}>
                                Privacy Policy
                            </a>
                        </Link>
                        {" "}
                        and
                        {" "}
                        <Link href="/term">
                            <a style={{ textDecoration: "underline" }}>
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
