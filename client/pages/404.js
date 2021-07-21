import Layout from '../components/Layout'

export default function NotFound() {
    return (
        <Layout title='Page Not Found'>
            <div style={{textAlign:'center'}}>

                <h1>Whoops!</h1>
                <h2>
                    This page does not exist
                </h2>
            </div>
        </Layout>
    )
}