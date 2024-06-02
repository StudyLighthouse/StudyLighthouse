import React from 'react';
import Header from '../components/Navbar'
import '../styles/main.css'

export default function Main() {
    return (
        <div className="bg-black text-white pt-2 min-h-screen flex flex-col">
        <Header/>
            <div className="flex flex-row items-center justify-around h-full w-full pt-32 cards">
                <div className='maincard blue'><p>Speech Generator</p></div>
                <div className='maincard gold'><p>Text Generator</p></div>
                <div className='maincard blue'><p>Solve Problems</p></div>
            </div>
        </div>
    )
}