"use client"

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from 'react';
import { useGetUsersQuery } from "../api/apiSlice";
import { selectAllUsers, selectAllUsersMasked, usersSlice } from "./usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { hideIcon, showIcon } from "@/lib/constants";
import Pagination from "../components/Pagination";
import { redirect } from "next/navigation";

const UsersPage = () => {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);
  const [startsWith, setStartsWith] = useState(null);
  const [type, setType] = useState(null);
  const [showEmail, setShowEmail] = useState(false);
  const { data: users, isFetching, isSuccess } = useGetUsersQuery({ page, startsWith, type })
  const dispatch = useAppDispatch();
  const usersList = showEmail ? useAppSelector(selectAllUsers) : useAppSelector(selectAllUsersMasked);

  useEffect(() => {
    // save users to state once fetched
    if (isSuccess) {
      dispatch(usersSlice.actions.setUsers(users?.data));
    } else {
      console.log("getUsers: Something went wrong");
    }
  }, [users])

  const updatePage = (page: number) => {
    if (page <= 1) {
      setPage(1);
    } else if (page >= (users?.meta.totalPages ?? 1)) {
      setPage((users?.meta.totalPages ?? 1));
    } else {
      setPage(page);
    }
  }

  const filterUser = (firstLetter: any, paramType: any) => {
    setStartsWith(firstLetter);
    setType(paramType);
  }

  const filterButton = (label: string, action: () => void) => {
    return (
      <button onClick={() => action()} className="relative inline-flex items-center justify-center p-0.5 mb-4 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        {label}
      </span>
    </button>
    )
  }

  const emailToggle = () => {
    const text = showEmail ? hideIcon : showIcon;
    return <button className="px-1" onClick={() => setShowEmail(!showEmail)}>{text}</button>
  }

  if (isFetching) {
    return <div>Loading</div>
  }

  if (!users?.data) {
    return <div>No posts :(</div>
  }
  if (status !== "loading") {
    if (session && session.user && usersList) {
      return (
        <div className="section">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-3xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Users</span> List.</h1>
          <div>
            { filterButton('Filter by G (First Name)', () => filterUser('G', 'firstName')) }
            { filterButton('Filter by W (Last Name)', () => filterUser('W', 'lastName')) }
            { filterButton('Reset', () => filterUser(null, null)) }
          </div>
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">First Name</th>
                <th scope="col" className="px-6 py-3">Last Name</th>
                <th scope="col" className="px-6 py-3">Email {emailToggle()}</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, i) => (
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4"><img className="w-10 h-10 rounded-full" src={user.photo} alt="Rounded avatar" /></td>
                  <td className="px-6 py-4">{user.firstName}</td>
                  <td className="px-6 py-4">{user.lastName}</td>
                  <td className="px-6 py-4">{user.email}</td>

                </tr>
              ))}
            </tbody>
          </table>
          <br />
          {Pagination({
            totalPages: users?.meta.totalPages,
            currentPage: users?.meta.currentPage,
            updatePage: updatePage
          })}
          <br />
        </div>
      )
    } else {
      return (
        redirect("/error")
      )
    }
  }
};

export default UsersPage;