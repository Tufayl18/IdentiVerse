"use client"

import { defineChain } from "viem"
import { Outfit } from "next/font/google"
import "./globals.css"

import { PrivyProvider } from "@privy-io/react-auth"
import React, { useState, useEffect } from "react"

const font = Outfit({ subsets: ["latin"] })

const BitTorrent = defineChain({
    id: 1029,
    name: "BitTorrent Chain Testnet",
    network: "BitTorrent Chain Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "BitTorrent Chain Testnet",
        symbol: "BTT",
    },
    rpcUrls: {
        default: {
            http: ["https://pre-rpc.bt.io"],
        },
    } as any,
    blockExplorers: {
        default: {
            name: "Explorer",
            url: "https://testscan.bt.io",
        },
    },
})

const Sepolia = defineChain({
    id: 11155111,
    name: "Sepolia test network",
    network: "Sepolia test network",
    nativeCurrency: {
        decimals: 18,
        name: "Sepolia test network",
        symbol: "SepoliaETH",
    },
    rpcUrls: {
        default: {
            http: ["https://sepolia.infura.io/v3/"],
        },
    } as any,
    blockExplorers: {
        default: {
            name: "Explorer",
            url: "https://sepolia.etherscan.io",
        },
    },
})

type ChainType = typeof BitTorrent | typeof Sepolia

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [activeChain, setActiveChain] = useState<ChainType>(BitTorrent)

    useEffect(() => {
        const checkRPC = async () => {
            try {
                const response = await fetch("https://pre-rpc.bt.io", { method: "HEAD" })
                if (!response.ok) {
                    throw new Error("BitTorrent RPC is not responding")
                }
                setActiveChain(BitTorrent)
            } catch (error) {
                console.warn("Switching to Sepolia due to BitTorrent RPC issue:", error)
                setActiveChain(Sepolia)
            }
        }

        checkRPC()
    }, [])

    return (
        <html lang="en">
            <body className={font.className}>
                <PrivyProvider
                    appId="clzik7g9e01qgenjg4zjhj0w9"
                    config={{
                        appearance: {
                            theme: "light",
                            accentColor: "#676FFF",
                        },
                        embeddedWallets: {
                            createOnLogin: "users-without-wallets",
                        },
                        defaultChain: activeChain,
                        supportedChains: [BitTorrent, Sepolia],
                    }}
                >
                    {children}
                </PrivyProvider>
            </body>
        </html>
    )
}
