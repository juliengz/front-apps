// import logo from './logo.svg';
// import './App.css';
import {Routes, Route, NavLink} from 'react-router-dom'
import Resources from "@sewan/resources";
import {SInfo} from "@sewan/resources";
import styled from 'styled-components'

const SMainContent = styled.div`
  background: #EEE;
  border: 1px solid #DDD;
  margin: 1rem;
  padding: 3rem 1rem`;

function App() {
    return (
        <SMainContent>
            <header className="App-header">
                <h1>FOUNDATION MAIN TOP BAR</h1>
                <SInfo>I use styled component V5.1.0</SInfo>
            </header>
            <p>
                <h2>MAIN NAVIGATION</h2>
                <NavLink to="/">Home</NavLink> - <NavLink to="resources">Resources</NavLink>{" "}
            </p>
            <Routes>
                <Route path="/" element={<SMainContent>
                    <h3>Main application</h3><p>Home</p></SMainContent>}/>
                <Route path="resources/*" element={<Resources/>}/>
            </Routes>
        </SMainContent>
    );
}

export default App;
