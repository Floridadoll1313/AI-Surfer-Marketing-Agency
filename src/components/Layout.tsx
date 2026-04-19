import React from 'react'
import NeonDock from './NeonDock'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <NeonDock />
    </>
  )
}
