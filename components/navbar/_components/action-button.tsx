'use client'

import React, {useState, useEffect} from "react"
import { usePrivy, useWallets } from "@privy-io/react-auth"

import { Button } from "@/components/ui/button"
import {X, AlignJustify} from 'lucide-react'
import Link from "next/link"

import  {getUserByAddress} from "../../../utils/queries"

//dropdown

const ActionButtons = () => {
    const {ready, authenticated, login, logout} = usePrivy()
    const {wallets} = useWallets()

    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const [userInfo, setUserInfo] = useState("")

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible)
    }

    const closeDropdown = () => {
        setDropdownVisible(false)
    }

    useEffect(() => {
        const getUserInfo = async() => {
            let userInfo = (await getUserByAddress(ready ? wallets[0]?.address : '0x0')) as any
            setUserInfo(userInfo)
        }
        getUserInfo()
    }, [ready, authenticated])

    return (
        <div className="pr-2">
            <div className="items-center justify-center flex">
                <div className="flex xl:space-x-4">
                    {authenticated && userInfo != "User does not exist" ? (
                        <>
                        <Link href={"/dashboard"} className="lg:flex items-center hidden">
                        <div>Dashboard</div>
                        <div className="font-thin lg:flex ml-4 mr-0 items-center hidden" > |</div>
                        </Link></>
                    ) : authenticated && userInfo == "User does not exist" ? (
                        <>
                        <Link href={"/onboard"} className="lg:flex items-center hidden">
                        <div>get DiD</div>
                        <div className="font-thin lg:flex ml-4 mr-0 items-center hidden" > |</div>
                        </Link>
                        </>
                    ): (
                        ""
                    )}
                </div>
                <div className="flex lg:space-x-2 items-center pr-4">
                    <Link href={"/free"}>
                    <Button variant={"outline"} className="lg:flex items-center hidden border-none text-d">
                    </Button>
                    </Link>

                    {authenticated ? (
                        <Button className="hidden lg:block" onClick={logout}>
                            Disconnect
                        </Button>
                    ) : (
                        <Button className="hidden lg:block" onClick={login}>
                            Connect
                        </Button>
                    )}
                </div>
            </div>
            {isDropdownVisible && (
                <div onClick={toggleDropdown} className="rounded-full xl:hidden">
                    <X className="h-5 w-5 items-center justify-center rounded-full"/>
                </div>
            )}

            {!isDropdownVisible && (
                <div onClick={toggleDropdown} className="flex lg:hidden ">
                <AlignJustify className="h-6 w-6 items-center justify-center rounded-full"/>
                </div>
            )}
        </div>
    )

}

export default ActionButtons
