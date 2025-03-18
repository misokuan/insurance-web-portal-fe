'use client'

import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const Header = () => {
  const { data: session } = useSession();

  const signOutButton = () => {
    return (
      <button
        onClick={() => signOut({
          callbackUrl: `/`,
        })}
        type="button"
        className="py-2.5 px-5 ml-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Sign Out
      </button>
    )
  }

  return (
    <>
      <div className='header'>
        <div className='headerText'>Insurance Web Portal</div>
        { session && session.user &&
          <div className="signOut">Welcome {session.user.name} {signOutButton()}</div>
        }
      </div>
    </>
  );
}

export default Header;