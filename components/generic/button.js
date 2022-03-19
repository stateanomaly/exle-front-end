import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export default function Button({ children, type, disabled, loading, onClick }) {
  if (loading) {
    return (
      <div
        type={type ? type : 'button'}
        className="mt-6 flex w-full justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-900 disabled:text-gray-300 uppercase"
        disabled={disabled}
      >
        <CircularProgress color={'inherit'} size={24} />
      </div>
    )
  } else {
    return (
      <button
        type={type ? type : 'button'}
        className="mt-6 flex w-full justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-900 disabled:text-gray-300 uppercase"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}
