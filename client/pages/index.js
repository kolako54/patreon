import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from "$components/Layout";
export default function Home() {
  return(
      <Layout>
        Hello there, this is the Home page mate
          <br/>
          <Link href="/about">
              About
          </Link>
      </Layout>
  )
}
