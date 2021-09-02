import Image from 'next/image'
import Button from "$components/ui/Button";
import googleLogo from 'public/google.png'
import styles from './ProfileSetting.module.scss'
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import defaultUserPicture from '$assets/images/defaultUserPicture.png'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { GET_ME, UPDATE_PASSWORD } from '../../../pages/api/queries'
import { useQuery, useMutation } from '@apollo/client';

import formStyles from "$components/auth/form.module.scss";
import isLoggedInVar from '$apollo/cache';


const passwordSchema = yup.object().shape({
    currentPassword: yup.string().min(8).max(64).required(),
    password: yup.string().min(8).max(64).required(),
    confirmPassword: yup.string().oneOf(
        [yup.ref('password'), null], 'passwords must match').required()
});

yup.mixed().test('match', 'Passwords do not match', function (password) {
    return password === this.options.context.confirmPassword
})

const emailAndNameSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
});


export default function ProfileSetting() {
    // const [session, loading] = useSession()
    const { data, loading, error } = useQuery(GET_ME);
    const [updatepass, { data: d, error: err, loading: ld }] = useMutation(UPDATE_PASSWORD, {
        onCompleted: (ctx) => {
            localStorage.removeItem('token');
            localStorage.setItem('token', 'Bearer ' + ctx.updatePassword.token);
        },
        onError(errs) {
            console.error(errs);
        },
    });
    const [profilePhoto, setProfilePhoto] = useState(null)
    // password validation
    const {
        register: passwordRegister,
        handleSubmit: passwordHandleSubmit,
        formState: { errors: passwordErrors }
    } = useForm({
        resolver: yupResolver(passwordSchema)
    });

    // email and name validation
    const {
        register: emailAndNameRegister,
        handleSubmit: emailAndNameHandleSubmit,
        formState: { errors: emailAndNameErrors },
        reset,
    } = useForm({ resolver: yupResolver(emailAndNameSchema) });

    const onPasswordChangeSubmit = async data => {
        await updatepass({
            variables: {
                currentPassword: data.currentPassword,
                password: data.password,
                confirmPassword: data.confirmPassword,
            }
        });
    };
    const onEmailAndNameChangSubmit = data => {
        console.log(data)

    }
    const router = useRouter()

    useEffect(() => {
        if (data) {
            const { get_me: { name, email } } = data;
            const nameAndEmail = { name, email };
            reset(nameAndEmail);

            // if a picture has been set, then don't set image to google image
            if (!profilePhoto)
                setProfilePhoto(data.get_me.profile_pic)
            else if (profilePhoto.src)
                reset({ ...nameAndEmail, picture: null })

        } else if (data === null) {
            router.push('/login')
        }
    }, [data, reset, router, profilePhoto]);


    const handlePicture = e => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfilePhoto(reader.result)
            }
        }
        if (e && e.target.files[0])
            reader.readAsDataURL(e.target.files[0])
    }
    const handleImageRemove = () => {
        // imageInput.current.files[0] = null
        // imageInput.current.value = null
        setProfilePhoto(defaultUserPicture)
        handlePicture()
    }
    if (loading) return <p>Loading...</p>

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.logInWith}>
                    <h2>Log in with</h2>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Image src={googleLogo} alt="google" width={25} height={25} />
                        <p style={{ paddingLeft: '.5rem' }}>Google</p>
                    </div>
                    <Button color="primary">
                        Disconnect
                    </Button>
                    <p>You must have a password before disconnecting your Google account. </p>
                </div>

                <div>
                    <div>
                        <h2 style={{ marginBottom: '5px' }}>Password</h2>
                        <p style={{ fontSize: '15px', marginTop: 0 }}>Change your password </p>
                    </div>
                    <form onSubmit={passwordHandleSubmit(onPasswordChangeSubmit)}>
                        <div className={formStyles.inputDiv}>
                            <label htmlFor="currentPassword">Current Password</label>
                            <input {...passwordRegister(("currentPassword"))} name="currentPassword" type="password" />
                            {passwordErrors.currentPassword &&
                                <p className={formStyles.error}>{passwordErrors.currentPassword.message} </p>}
                        </div>
                        <div className={formStyles.inputDiv}>
                            <label htmlFor="password">Password</label>
                            <input {...passwordRegister(("password"))} name="password" type="password" />
                            {passwordErrors.password &&
                                <p className={formStyles.error}>{passwordErrors.password.message} </p>}
                        </div>

                        <div className={formStyles.inputDiv}>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input {...passwordRegister("confirmPassword")} name="confirmPassword"
                                type="password" />
                            {passwordErrors.confirmPassword &&
                                <p className={formStyles.error}>{passwordErrors.confirmPassword.message} </p>}
                        </div>
                        <div style={{ textAlign: 'right', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                {err && <span style={{ color: 'red' }}>{err.message}</span>}
                                {ld && <span style={{ color: '#39ddc9', }}>Loading...</span>}
                                {d && <span style={{ color: '#39ddc9', marginTop: '20px' }}>password successfully changed</span>}
                            </div>
                            <Button>
                                Set password
                            </Button>
                        </div>



                    </form>

                </div>

                <div className={styles.information}>
                    <div>
                        <h2>Information</h2>
                    </div>
                    <div className={styles.userPhoto}>
                        <h4>User profile photo</h4>
                        {profilePhoto &&
                            <Image src={profilePhoto} alt="user" width={70} height={70} />}
                        <label
                            className={styles.file}
                            htmlFor="photo">Choose new image</label>
                        <input
                            {...emailAndNameRegister('picture')}
                            onChange={handlePicture}
                            style={{ display: 'none' }}
                            type="file" name="photo" id="photo" />
                        <button onClick={handleImageRemove}
                            className={styles.removeBtn}>Remove Image
                        </button>
                    </div>

                    <form onSubmit={emailAndNameHandleSubmit(onEmailAndNameChangSubmit)}>
                        <div className={formStyles.inputDiv}>
                            <label htmlFor="name">User profile name</label>
                            <input {...emailAndNameRegister(("name"))} name="name" type="text" />
                            {emailAndNameErrors.name &&
                                <p className={formStyles.error}>{emailAndNameErrors.name.message} </p>}
                        </div>

                        <div className={formStyles.inputDiv}>
                            <label onChange={e => console.log(e)} htmlFor="email">Email</label>
                            <input  {...emailAndNameRegister("email")} name="email"
                                type="text" />
                            {emailAndNameErrors.email &&
                                <p className={formStyles.error}>{emailAndNameErrors.email.message} </p>}
                        </div>
                        <hr style={{ margin: '2rem 0' }} />
                        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                            <Button>
                                Save changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
