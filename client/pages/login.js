import Layout from "$components/Layout";
import Login from "$components/auth/Login";

export default function LoginPage() {
    return (
        <Layout title="Login">
            <Login/>
        </Layout>
    )
}

LoginPage.authOptions = {
    // auth: true,
    redirect: '/home',
}