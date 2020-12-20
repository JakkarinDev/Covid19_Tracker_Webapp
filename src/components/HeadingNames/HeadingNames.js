import './HeadingNames.css'

import React from 'react'

export default function Header() {
    // function testClck() {
    //     alert("Hi there, user!");
    // }

    return (
        <div className="Header">
            <p className="Heading-information">Counrtry</p>
            <p className="Heading-information">Cases</p>
            <p className="Heading-information">Deaths</p>
            <p className="Heading-information">Recovered</p>
        </div>
    )
}
