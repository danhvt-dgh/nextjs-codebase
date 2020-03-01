import React, { Fragment } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import theme from '../src/theme'
import ProgressLoading from '../src/components/ProgressLoading'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='vi'>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
					<link rel='stylesheet' href='/static/css/transition.css' />
				</Head>
        <body>
          <Main />
          <NextScript />
					<ProgressLoading.Component />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: WrappedComponent => props => sheets.collect(<WrappedComponent {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: (
      <Fragment>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </Fragment>
    ),
  }
}

export default MyDocument
