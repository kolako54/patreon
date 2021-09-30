import Layout from '$components/Layout'
import ProfileSetting from '$components/Profile/ProfileSetting'

export default function ProfileSettingPage() {
    return (
        <Layout title="Setting">
            <ProfileSetting />
        </Layout>
    )
}

// ProfileSettingPage.authConfig = {
//     auth: true,
//     autoLogin: true
// }
