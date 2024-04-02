import React from 'react'
import Footer from 'src/components/Footer'
import LoginHeader from 'src/components/LoginHeader'

interface Props {
  children?: React.ReactNode
}

function LoginLayout({ children }: Props) {
  return (
    <div>
      <LoginHeader />
      {children}
      <Footer />
    </div>
  )
}

export default LoginLayout
