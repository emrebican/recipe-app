import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);

  // get parameter from (...3000/cuisine/'parameter')
  let params = useParams();

  // Mount Page when parameter changes
  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  const getCuisine = async (name) => {

    const check = localStorage.getItem(name);

    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);

      const recipes = await data.json();

      localStorage.setItem(name, JSON.stringify(recipes.results));

      setCuisine(recipes.results);
    }


  }

  return (
    <Grid
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 3rem;
  grid: center;
`
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
    color: #313131;
  }
`

export default Cuisine
