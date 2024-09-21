"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/auth";
import { APP_DATA } from "@/constants/appdata";
import { LINK_DATA } from "@/constants/linkdata";

interface User {
  user?: UserObj;
}

type UserObj = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Header({ user }: User) {
  const { logout } = useAuth({ middleware: "auth" });
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch justify-start">
              <Link href={LINK_DATA.HOME_LINK}>
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="h-8 w-auto"
                    src="/favicon.ico"
                    alt="Your Company"
                    width={32}
                    height={32}
                  />
                  <div className="px-3 py-2 w-auto">{APP_DATA.APP_NAME}</div>
                </div>
              </Link>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link
                href={LINK_DATA.NEW_LINK}
                className="border-neutral-400 hover:bg-neutral-400 px-3 py-2 border rounded-md text-sm font-medium mx-3"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span className="hidden sm:inline-block pl-1.5">
                  譜面を追加
                </span>
              </Link>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative block px-2 py-1 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-5 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <div>
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      <span className="hidden sm:inline">{user?.name}</span>
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-600" : "",
                            "block px-4 py-2 text-sm"
                          )}
                          onClick={logout}
                        >
                          サインアウト
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
