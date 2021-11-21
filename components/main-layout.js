import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ergoBoxFromProxy, RustModule } from '@ergolabs/ergo-sdk'

import { Disclosure } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}
const navigation = [
  { name: 'Loans', href: '/', current: true },
  { name: 'Repayments', href: '#', current: false },
  { name: 'Information', href: '#', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const connectYoroiWallet = () => {
  if (!window.ergo_request_read_access) {
    return Promise.reject(new Error(WARNING_MESSAGE.YOROI))
  }

  return window.ergo_request_read_access().then(() => {
    ergo
      .get_utxos()
      .then((bs) => bs?.map((b) => ergoBoxFromProxy(b)))
      .then((data) => {
        console.log(data)
      })
  })
}

export default function MainLayout({ children, showCreate = true }) {
  const [isRustModuleLoaded, setIsRustModuleLoaded] = useState(false)
  useEffect(() => {
    RustModule.load().then(() => setIsRustModuleLoaded(true))
  }, [])
  if (!isRustModuleLoaded) {
    return null
  }
  return (
    <div>
      <div className="bg-gray-800 pb-32">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 cursor-pointer">
                        <Link href={`/`}>
                          <a>
                            <Image
                              src="/ergo-dark.png"
                              alt="Ergoplatform.com logo"
                              width={40}
                              height={40}
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="pl-3">
                        <Link href={`/`} passHref>
                          <a>
                            <h1 className="text-white">Ergo Lend</h1>
                          </a>
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          type="button"
                          className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          onClick={connectYoroiWallet}
                        >
                          Connect Wallet
                        </button>
                        <button
                          type="button"
                          className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <div className="px-2 py-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:flex">
            <h1 className="text-3xl font-bold text-white md:flex-grow">
              Ergo Lend: Loans
            </h1>
            {showCreate && (
              <div className="mt-6 md:mt-0">
                {' '}
                <Link href={`/loan/create`}>
                  <a
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create a Loan
                  </a>
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            {children}
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  )
}
