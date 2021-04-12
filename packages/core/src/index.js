import React from 'react'
import {BrowserRouter} from 'react-router-dom'

export default function Core({children}) {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}