import Layout from "$components/Layout";
import Profile from "$components/Profile";
import {useSession} from "next-auth/client";

export default function ProfilePage() {
    const [session] = useSession()
    return (
        <Layout title={session && session.user.name + ' | Patreon'}>
            <Profile/>
        </Layout>
    )
}

ProfilePage.authOptions = {
    auth: true,
    autoLogin: true
}