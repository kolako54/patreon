import Link from 'next/link'
import Button from '$ui/Button'
import GoogleLoginButton from '$components/auth/GoogleLogin'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import formStyles from '../form.module.scss'
import styles from './Login.module.scss'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useLayoutEffect } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(64).required(),
})

const LOGIN = gql`
    mutation LOGIN($email: String!, $password: String!) {
        login: loginUser(UserLoginInput: { email: $email, password: $password }) {
            user {
                email
                id
                name
                profile_pic
            }
        }
    }
`

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const router = useRouter()

    const isAuth = Cookies.get('isAuth')

    const [postData, { loading, error }] = useMutation(LOGIN, {
        onError: () => null,
        fetchPolicy: 'no-cache',
    })
    const onSubmit = ({ email, password }) => {
        postData({ variables: { email, password } })
    }

    useLayoutEffect(() => {
        if (isAuth) router.push('/home')
    })

    return (
        <>
            {!isAuth ? (
                <div className={formStyles.container}>
                    <h2>Log in</h2>
                    <div className={formStyles.form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={formStyles.inputDiv}>
                                <label htmlFor="email">Email</label>
                                <input {...register('email')} name="email" type="text" />
                                {errors.email && <p className={formStyles.error}>{errors.email.message} </p>}
                            </div>
                            <div className={formStyles.inputDiv}>
                                <label htmlFor="password">Password</label>
                                <input autoComplete="password" {...register('password', { min: 8, max: 64 })} name="password" type="password" />
                                {errors.password && <p className={formStyles.error}>{errors.password.message} </p>}
                            </div>
                            <div className={styles.forgetPassword}>
                                <Link href="/forgot-password">
                                    <a>Forgot password?</a>
                                </Link>
                            </div>
                            <div>
                                <Button fullWidth disabled={errors.password || errors.email || loading}>
                                    {loading ? <ClipLoader color={'white'} size={25} /> : 'Log in'}
                                </Button>
                            </div>
                            <div>
                                <p>or</p>
                            </div>
                            <GoogleLoginButton buttonText="Continue with Google" />
                        </form>
                        <h4 style={{ color: 'red' }}>{error?.message}</h4>
                    </div>
                    <div className={styles.cta}>
                        <p>New to Patreon?</p>
                        <Link href="/signup">Sign up</Link>
                    </div>
                </div>
            ) : (
                <PulseLoader
                    color={'#55e2d0'}
                    css={{
                        position: 'absolute',
                        left: '50%',
                        top: '47%',
                        transform: 'translate(-50%,-50%)',
                    }}
                />
            )}
        </>
    )
}
