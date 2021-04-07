import {Routes, Route, Link, NavLink} from 'react-router-dom'
import React from 'react';

export default function Resources() {
    return (
        <React.Fragment>
            <p>
                <hr />
                <h3>Resources application</h3>
                <NavLink to=".">Resources Home</NavLink> - <NavLink to="list">Resources List</NavLink>{" "}
            </p>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/list" element={<List/>}/>
            </Routes>
        </React.Fragment>
    )
}

function Home() {
    return (
        <>
            <h5>Resources default page</h5>
            <p><small>👉🏻 Go back to <Link to="/">Home</Link>.</small></p>
        </>
    )
}

function List() {
    return (
        <>
            <h5>Resources List</h5>
            <ul>
                <li>sim</li>
                <li>pson</li>
            </ul>
        </>
    )
}