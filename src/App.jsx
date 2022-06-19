import { BrowserRouter, Link } from "react-router-dom";
import styled from 'styled-components';
import { SiCodechef } from 'react-icons/si';

import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <SiCodechef />
          <Logo to={'/'}>MyCuisine</Logo>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Nav = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(to right, #f27121, #e94057);
  color: #252525;
  position: absolute;
  top: 4%;
  left: 15%;
  border-radius: 50%;

  svg {
    font-size: 4rem;
  }
`

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Pacifico', cursive;
  color: #fff;
`

export default App;
