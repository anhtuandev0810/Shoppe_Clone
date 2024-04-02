import React from 'react'
import MainHeader from '../MainHeader'
import Footer from '../Footer'

interface Props {
  children?: React.ReactNode
}

function MainLayout({children}: Props) {
  return (
    <div>
      <MainHeader />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
