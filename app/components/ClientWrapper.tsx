'use client'

import React from 'react'
import { GeistMono } from 'geist/font/mono'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <style jsx global>{`
        code, pre {
          font-family: ${GeistMono.style.fontFamily};
        }
      `}</style>
    </div>
  )
}

