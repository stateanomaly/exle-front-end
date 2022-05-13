import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html className="dark">
        <Head />
        <body className="dark:bg-dark-blue font-inter">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}