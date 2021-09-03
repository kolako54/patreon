import Image from 'next/image'
import Button from "$components/ui/Button";
import googleLogo from 'public/google.png'
import styles from './ProfileSetting.module.scss'
import {useSession} from "next-auth/client";
import {useForm} from "react-hook-form";
import defaultUserPicture from '$assets/images/defaultUserPicture.png'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
// import {useRouter} from "next/router";
import {useEffect, useState} from "react"

import formStyles from "$components/auth/form.module.scss";


const passwordSchema = yup.object().shape({
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
    const [session, loading] = useSession()
    const [profilePhoto, setProfilePhoto] = useState(null)
    // password validation
    const {
        register: passwordRegister,
        handleSubmit: passwordHandleSubmit,
        formState: {errors: passwordErrors}
    } = useForm({
        resolver: yupResolver(passwordSchema)
    });

    // email and name validation
    const {
        register: emailAndNameRegister,
        handleSubmit: emailAndNameHandleSubmit,
        formState: {errors: emailAndNameErrors},
        reset,
    } = useForm({resolver: yupResolver(emailAndNameSchema)});

    const onPasswordChangeSubmit = data => console.log(data);
    const onEmailAndNameChangSubmit = data => {
        console.log(data)

    }
    // const router = useRouter()

    useEffect(() => {
        if (session) {
            const {user: {name, email}} = session
            const nameAndEmail = {name, email}
            reset(nameAndEmail)

            // if a picture has been set, then don't set image to google image
            if (!profilePhoto)
                setProfilePhoto(session.user.image)
            // if user removed image
            else if (profilePhoto.src)
                reset({...nameAndEmail, picture: null})

        }
        // else if (session === null) {
        //     router.push('/login')
        // }
    }, [session, reset,  profilePhoto]);


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

                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Image src={googleLogo} alt="google" width={25} height={25}/>
                        <p style={{paddingLeft: '.5rem'}}>Google</p>
                    </div>
                    <Button color="primary">
                        Disconnect
                    </Button>
                    <p>You must have a password before disconnecting your Google account. </p>
                </div>

                <div>
                    <div>
                        <h2 style={{marginBottom: '5px'}}>Password</h2>
                        <p style={{fontSize: '15px', marginTop: 0}}>Change your password </p>
                    </div>
                    <form onSubmit={passwordHandleSubmit(onPasswordChangeSubmit)}>
                        <div className={formStyles.inputDiv}>
                            <label htmlFor="password">Password</label>
                            <input {...passwordRegister(("password"))} name="password" type="text"/>
                            {passwordErrors.password &&
                            <p className={formStyles.error}>{passwordErrors.password.message} </p>}
                        </div>

                        <div className={formStyles.inputDiv}>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input {...passwordRegister("confirmPassword")} name="confirmPassword"
                                   type="text"/>
                            {passwordErrors.confirmPassword &&
                            <p className={formStyles.error}>{passwordErrors.confirmPassword.message} </p>}
                        </div>
                        <div style={{textAlign: 'right', marginTop: '1rem'}}>
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
                        <Image src={profilePhoto} alt="user" width={70} height={70}/>}
                        <label
                            className={styles.file}
                            htmlFor="photo">Choose new image</label>
                        <input
                            {...emailAndNameRegister('picture')}
                            onChange={handlePicture}
                            style={{display: 'none'}}
                            type="file" name="photo" id="photo"/>
                        <button onClick={handleImageRemove}
                                className={styles.removeBtn}>Remove Image
                        </button>
                    </div>

                    <form onSubmit={emailAndNameHandleSubmit(onEmailAndNameChangSubmit)}>
                        <div className={formStyles.inputDiv}>
                            <label htmlFor="name">User profile name</label>
                            <input {...emailAndNameRegister(("name"))} name="name" type="text"/>
                            {emailAndNameErrors.name &&
                            <p className={formStyles.error}>{emailAndNameErrors.name.message} </p>}
                        </div>

                        <div className={formStyles.inputDiv}>
                            <label onChange={e => console.log(e)} htmlFor="email">Email</label>
                            <input  {...emailAndNameRegister("email")} name="email"
                                    type="text"/>
                            {emailAndNameErrors.email &&
                            <p className={formStyles.error}>{emailAndNameErrors.email.message} </p>}
                        </div>
                        <hr style={{margin: '2rem 0'}}/>
                        <div style={{textAlign: 'right', marginTop: '1rem'}}>
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
