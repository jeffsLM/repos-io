import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto&display=optional" rel="stylesheet" type="text/css" />
                    <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
                    <link rel="icon" href="/favicon.ico" />                    
                    <meta charSet="UTF-8" name="description" content="Sua busca. Seus resultados. Apenas para você." />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}