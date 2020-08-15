import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

const cx = {
  main: ''
}

const Layout = ({ title, description, children, className }) => {
  return (
    <main className={`${cx.main} ${className}`}>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={description} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta property='og:description' content={description} />
        <meta property='og:title' content={title} />
      </Head>
      <style global jsx>
        {`
          body {
            color: #fff;
            background: #000;
          }
          a {
            color: #fff;
          }
          @media (prefers-color-scheme: light) {
            body {
              color: #111;
              background: #fff;
            }
            a {
              color: #111;
            }
          }
        `}
      </style>
      {children}
    </main>
  )
}

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
}

Layout.defaultProps = {
  title: 'Pitch',
  description: 'an experimental pitch tracker for femme voices',
  className: ''
}

export default Layout
