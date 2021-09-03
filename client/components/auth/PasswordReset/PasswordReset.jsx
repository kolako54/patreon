import Button from "$ui/Button";
// import {useEffect} from "react";
// import {useSession} from 'next-auth/client'
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

import formStyles from '../form.module.scss'
// import {useRouter} from "next/router";

const schema = yup.object().shape({
    password: yup.string().min(8).max(64).required(),
    confirmPassword: yup.string().min(8).max(64).oneOf(
        [yup.ref('password'), null], 'password must match'
    ).required(),
});

yup.mixed().test('match', 'passwords do not match', function (password) {
    return password === this.options.context.confirmPassword
})


export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    // const [session] = useSession()

    const onSubmit = (data) => {
        console.log(data)
    }

    // const router = useRouter()
    // useEffect(() => {
    //     if (session) {
    //         router.push('/home')
    //     }
    // }, [router, session])


    return (
        <div className={formStyles.container}>
            <h2>
                Password Reset
            </h2>

            <div className={formStyles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={formStyles.inputDiv}>
                        <label htmlFor="password">Password</label>
                        <input autoComplete="password" {...register("password")} name="password"
                               type="password"/>
                        {errors.password &&
                        <p className={formStyles.error}>{errors.password.message} </p>}
                    </div>
                    <div style={{marginBottom: '2rem'}} className={formStyles.inputDiv}>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input autoComplete="confirm-password" {...register("confirmPassword")} name="confirmPassword"
                               type="password"/>
                        {errors.confirmPassword &&
                        <p className={formStyles.error}>{errors.confirmPassword.message} </p>}
                    </div>
                    <div>
                        <Button fullWidth disabled={errors.password || errors.email}>
                            Reset Password
                        </Button>
                    </div>
                </form>
                {/*<h4 style={{color: "red"}}>{error?.message}</h4>*/}
            </div>
        </div>
    )
}
