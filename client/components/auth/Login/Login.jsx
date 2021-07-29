import Link from 'next/link'
import Button from "$components/ui/Button";
import {gql, useQuery} from "@apollo/client";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from './Login.module.scss'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(64).required(),
});

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = data => {
        console.log(data)

    }

    return (
        <div className={styles.container}>
            <h2>
                Log in
            </h2>

            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputDiv}>
                        <label htmlFor="email">Email</label>
                        <input {...register("email")} name="email"
                               type="text"/>
                        {errors.email && <p className={styles.error}>{errors.email.message} </p>}
                    </div>
                    <div className={styles.inputDiv}>
                        <label htmlFor="password">Password</label>
                        <input autoComplete="password" {...register("password", {min: 8, max: 64})}
                               name="password"
                               type="password"/>
                        {errors.password &&
                        <p className={styles.error}>{errors.password.message} </p>}
                    </div>
                    <div className={styles.forgetPassword}>
                        <Link href="/forgetpassword">
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
                    <div className={styles.google}>
                        <Button onClick={e => {
                            alert('todo');
                            e.preventDefault()
                        }}>
                            Continue with
                            {" ⁩ "}
                            <span>G</span>
                            <span>o</span>
                            <span>o</span>
                            <span>g</span>
                            <span>l</span>
                            <span>e</span>
                        </Button>
                    </div>

                </form>
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
