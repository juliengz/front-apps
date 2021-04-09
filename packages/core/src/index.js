import React from 'react'
import {BrowserRouter} from 'react-router-dom'

export default function Core({children}) {
    return (
        <BrowserRouter>
            <quote>START CORE (I take care of the routing, and i can do much more !)</quote>
            {children}
            <quote>END CORE</quote>
        </BrowserRouter>
    )
}