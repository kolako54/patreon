import Head from "next/head";
import Header from "$components/Header";
import styles from './Layout.module.scss'

export default function Layout({title, keywords, description, children}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content={keywords}/>
                <meta name="description" content={description}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className={styles.container}>
                {children}
            </main>
        </div>
    )
}

Layout.defaultProps = {
    title: 'Patreon',
    keywords: 'development,coding,programming',
    description: 'the best info and news in development'
}