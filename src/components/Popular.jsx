import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Popular() {

  const [popular, setPopular] = useState([]);

  // run getPopular when component gets mounted
  useEffect(() => {
    getPopular();
  }, []);

  // -------------------------------------- fetch -------------------------------------- //
  // async for waiting data
  const getPopular = async () => {
    // get data from LS
    const check = localStorage.getItem("popular");

    // If there is data in LS use / or fetch again
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      // get api from site / ?apiKey'keyhere'&number'how many data we want'
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);

      // convert our api data to json format
      const data = await api.json();

      localStorage.setItem("popular", JSON.stringify(data.recipes));

      setPopular(data.recipes);
      console.log(data.recipes);
    }
  }
  // -------------------------------------- fetch -------------------------------------- //

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '3rem',
        }}>
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt="" />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            )
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0;
`

const Card = styled.div`
  min-height: 18rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    height: 30%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  }
`
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.85));
`
export default Popular;