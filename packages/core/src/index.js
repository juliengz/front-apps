import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'

export default function Core({children}) {
    return (
        <BrowserRouter>
            <h1>Foundation</h1>
            {children}
        </BrowserRouter>
    )
}