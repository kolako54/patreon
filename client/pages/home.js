import Layout from "$components/Layout";
import Home from "$components/Home";

export default function HomePage() {
    return (
        <Layout title="Home">
            <Home/>
        </Layout>
    )
}

// HomePage.authOptions = {
//     auth: true,
//     redirect: '/login'
// }
// HomePage.auth = {
//     role: "admin",
//     loading: <AdminLoadingSkeleton />,
//     unauthorized: "/login-with-different-user", // redirect to this url
// }
