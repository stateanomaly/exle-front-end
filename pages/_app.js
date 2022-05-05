import 'tailwindcss/tailwind.css'
import React, { useEffect } from 'react'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.body.className = pageProps.isLight ? 'light-mode' : 'dark-mode'
  })
  return <Component {...pageProps} />
}
