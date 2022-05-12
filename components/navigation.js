import Image from 'next/image'
import Link from 'next/link'

import { Disclosure } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import WalletButton from './wallet-button'

const navigation = [
  { name: 'Loans', href: '/', current: false },
  { name: 'Repayments', href: '/repayments', current: false },
  { name: 'Information', href: '#', current: false },
  { name: 'Create', href: '/loan/create', current: false }
]
const visible = false

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RenderNavigationItems = ({ items }) => {
  if (!visible) return <></>
  return (
    <>
      {items.map((item) => {
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
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </a>
          )
        }
      })}
    </>
  )
}

export default function Navigation() {
  return (
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
                        <RenderNavigationItems items={navigation} />
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* <WalletButton /> */}
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
                <RenderNavigationItems items={navigation} />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="py-10"></header>
    </div>
  )
}
