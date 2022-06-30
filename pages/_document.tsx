import Document, { Html, Head, Main, NextScript } from "next/document";

//use this to customize the global html head
//marketing scritps, meta tags, etc

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="author" content="ekkuleivonen" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
