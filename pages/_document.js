import Document, {Html, Head, Main, NextScript} from 'next/document'
import Script from 'next/script'
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                          rel="stylesheet"/>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    <Script src="https://cdn.jsdelivr.net/npm/eosjs-api@7.0.4/lib/eos-api.min.js"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument