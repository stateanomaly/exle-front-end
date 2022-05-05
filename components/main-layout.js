import Image from 'next/image'
import Link from 'next/link'

import { Disclosure } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import WalletButton from './wallet-button'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}
const navigation = [
  { name: 'Loans', href: '/', current: false },
  { name: 'Repayments', href: '/repayments', current: false },
  { name: 'Information', href: '#', current: false },
  { name: 'Create', href: '/loan/create', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainLayout({ children, showCreate = true }) {
  return (
    <div className="min-h-screen">
      <div className="absolute top-0 mx-auto right-0 left-0 mb-32 z-50">
        <Disclosure as="nav">
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
                          {navigation.map((item) => {
                            if (item.name == 'Create') {
                              return (
                                <a
                                  key={item.name}
                                  type="button"
                                  href={item.href}
                                  className="inline-flex items-center px-4 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Create Loan
                                </a>
                              )
                            } else {
                              return (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-900 text-white'
                                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'px-3 py-2 rounded-md text-sm font-medium'
                                  )}
                                  aria-current={
                                    item.current ? 'page' : undefined
                                  }
                                >
                                  {item.name}
                                </a>
                              )
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <WalletButton />
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-700 hover:bg-white hover:opacity-60 focus:outline-none   focus:ring-white">
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
                  {navigation.map((item) => {
                    if (item.name == 'Create') {
                      return (
                        <a
                          key={item.name}
                          type="button"
                          href={item.href}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Create Loan
                        </a>
                      )
                    } else {
                      return (
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
                      )
                    }
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10"></header>
      </div>

      <main className="">{children}</main>
    </div>
  )
}
