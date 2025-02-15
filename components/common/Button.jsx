import React from 'react'
import Link from 'next/link'
export default function Button({ children, className} ) {
  return (
    <div className={`w-full rounded-sm text-white text-center py-2 ${className}`}>
      {children}
    </div>
  )
}
