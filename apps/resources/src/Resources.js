import {Routes, Route, Link, NavLink} from 'react-router-dom'
import React from 'react';
import styled from 'styled-components'

const SResourcesContent = styled.div`
  background: ivory;
  border: 1px solid #000;
  margin: 2rem 0;
  padding: .33rem 1rem`;

export const SInfo = styled.div`color: DarkCyan;background:white;display:inline-block;padding:.25em`;

export default function Resources() {
    return (
        <SResourcesContent>
            <h3>Resources application</h3>
            <SInfo>(I use styled component V4.1.0 & i use router provided by Core
                component)</SInfo>
            <NavLink to=".">Resources Home</NavLink> - <NavLink to="list">Resources List</NavLink>{" "}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/list" element={<List/>}/>
            </Routes>
        </SResourcesContent>
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