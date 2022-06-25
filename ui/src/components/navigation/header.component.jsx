import React, { useEffect, useState } from 'react'
import './header.styles.css'
import balloxLogo from '../../assets/icons/balloxLogo.png'
import { Button } from '../button/button.component'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar } from './sidebar.component'
import Web3 from "web3"

export function Header() {
    const { pathname } = useLocation()
    const [address, setAddress] = useState()

    useEffect(() => {

        const loadProvider = async() => {
            if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){

                try{
                    const web3 = new Web3(window.ethereum)
                    // get and store account
                    const accounts = await web3.eth.getAccounts()
                    setAddress(accounts[0])
                    // handle account or chain changes
                    window.ethereum.on("accountsChanged", accounts => window.location.reload())
                    window.ethereum.on("chainChanged", accounts => window.location.reload())
                }
                catch(err){
                    alert(err.message)
                }

            }
            else{
                alert("Please Install Metamask!")
            }
        }

        loadProvider()

    }, [])

    const connectWallet = async() => {

        try{
            await window.ethereum.request({method: "eth_requestAccounts"})
            window.location.reload()
        }
        catch(err){
            alert(err.message)
        }

    }

    return (
        <div className="header">
            <Link to="/">
                <img src={balloxLogo} alt="" className="header__logo" />
            </Link>
            <div className="header__center">
                <Link to="/create-election">
                    <span className="header__center-link">Create Election</span>
                </Link>
                <Link to="/results">
                    <span className="header__center-link">Results</span>
                </Link>
            </div>

            <div className="header__right">
                {/* <Button clear>Login</Button> */}
                {address ? 
                    <Button>{address.slice(0,3)}...{address.slice(38)}</Button>
                    :
                    <Button handleClick={connectWallet}>Connect Wallet</Button>
                }

            </div>
            <Sidebar pathname={pathname} />
        </div>
    )
}
