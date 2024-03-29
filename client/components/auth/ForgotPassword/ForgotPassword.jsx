import Button from "$components/ui/Button";
// import {useEffect} from "react";
// import {useSession} from 'next-auth/client'
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import formStyles from '../form.module.scss'
import * as yup from "yup";

// import {useRouter} from "next/router";

const schema = yup.object().shape({
    email: yup.string().email().required(),
});


export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = data => console.log(data)

    // const [session] = useSession()
    //
    // const router = useRouter()
    // useEffect(() => {
    //     if (session) {
    //         router.push('/home')
    //     }
    // }, [router, session])


    return (
        <div style={{textAlign: 'center'}}>

            <div className={formStyles.form}>
                <div style={{textAlign: 'left'}}>
                    <h3 style={{marginBottom: '1.5rem'}}>
                        Forgot Password
                    </h3>
                    <p>
                        Enter your email address and we will send you a link to reset your password.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={formStyles.inputDiv}>
                        <label htmlFor="email">Email</label>
                        <input {...register("email")} name="email"
                               type="text"/>
                        {errors.email &&
                        <p className={formStyles.error}>{errors.email.message} </p>}
                    </div>

                    <div style={{marginTop: '1rem'}}>
                        <Button fullWidth disabled={errors.password || errors.email}>
                            Reset Password
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}
