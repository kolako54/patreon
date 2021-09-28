import Layout from '$components/Layout'
import ForgotPassword from '$components/auth/ForgotPassword'

export default function ForgotPasswordPage() {
    return (
        <Layout title="Forgot-Password">
            <ForgotPassword />
        </Layout>
    )
}

// ForgotPasswordPage.authOptions = {
//     auth: false,
//     redirect: '/home'
// }
