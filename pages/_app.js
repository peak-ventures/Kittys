import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render () {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Head>
                    <meta charSet="UTF-8" />
                    <title>Kittys</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content="An agency that creates strategies that embrace what makes social marketing unique. With billions of impressions to his name, you won’t find many Facebook marketers with a greater depth of experience and insight."/>
                    {/*<link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" />*/}
                </Head>
                <style jsx global>{`
                    body {
                        // font-family: 'Lato', sans-serif;
                        max-width: 450px;
                        width: 100%;
                        margin: 0 auto;
                    }
                `}</style>
                <Component {...pageProps} />
            </Container>
        )
    }
}

export default MyApp