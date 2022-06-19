import {FaPizzaSlice, FaHamburger} from 'react-icons/fa';
import {GiNoodles, GiChopsticks} from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


function Category() {
  return (
    <List>
      <SLink to={'/cuisine/Italian'}>
          <FaPizzaSlice />
          <h4>Italian</h4>
      </SLink>
      <SLink to={'/cuisine/American'}>
          <FaHamburger />
          <h4>American</h4>
      </SLink>
      <SLink to={'/cuisine/Chinese'}>
          <GiNoodles />
          <h4>Chinese</h4>
      </SLink>
      <SLink to={'/cuisine/Korean'}>
          <GiChopsticks />
          <h4>Korean</h4>
      </SLink>
    </List>
  )
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  gap: 2rem;
`
const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  cursor: pointer;
  background: linear-gradient(45deg, #494949, #313131);
  transform: scale(0.8);
  color: white;
  font-size: 1.5rem;

  transition: all ease .2s;

  h4 {
    font-size: .8rem;
    margin-top: 5px
  }

  &:hover {
    font-size: 2rem;
  }

  &.active {
    color: white;
    background: linear-gradient(to right, #f27121, #e94057);
    font-size: 4rem;

    h4 {
      display: none;
    }
  }
`

export default Category;
