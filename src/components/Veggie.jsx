import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Veggie() {

  const [veggie, setVeggie] = useState([]);

  // run getPopular when component gets mounted
  useEffect(() => {
    getVeggie();
  }, []);

  // -------------------------------------- fetch -------------------------------------- //
  // async for waiting data
  const getVeggie = async () => {
    // get data from LS
    const check = localStorage.getItem("veggie");

    // If there is data in LS use / or fetch again
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      // get api from site / ?apiKey'keyhere'&number'how many data we want'
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);

      // convert our api data to json format
      const data = await api.json();

      localStorage.setItem("veggie", JSON.stringify(data.recipes));

      setVeggie(data.recipes);
    }
  }
  // -------------------------------------- fetch -------------------------------------- //

  return (
    <div>
      <Wrapper>
        <h3>Vegetarian Picks</h3>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '3rem',
        }}>
          {veggie.map((recipe) => {
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
    padding: 0 30px;
  }
`
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.85));
`

export default Veggie;
