// import logo from './logo.svg';
// import './App.css';
import {Routes, Route, NavLink} from 'react-router-dom'
import Resources from "@sewan/resources";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>FOUNDATION MAIN TOP BAR</h1>
            </header>
            <p>
                <h2>MAIN NAVIGATION</h2>
                <NavLink to="/">Home</NavLink> - <NavLink to="resources">Resources</NavLink>{" "}
            </p>
            <Routes>
                <Route path="/" element={<>
                    <hr/>
                    <h3>Main application</h3><p>Home</p></>}/>
                <Route path="resources/*" element={<Resources/>}/>
            </Routes>
        </div>
    );
}

export default App;
