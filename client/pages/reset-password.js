import Layout from "$components/Layout";
import PasswordReset from "$components/auth/PasswordReset"

export default function PasswordResetPage() {
    return (
        <Layout title="Password Reset">
            <PasswordReset/>
        </Layout>
    )
}

// PasswordResetPage.authOptions = {
//     auth:false
// }