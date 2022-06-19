import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {

  const [details, setDetails] = useState({});

  // for buttons active / inactive
  const [activeTab, setActiveTab] = useState('instructions');

  let params = useParams();

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  const fetchDetails = async () => {

    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);

    const detailData = await data.json();
    console.log(detailData);
    setDetails(detailData);
  }

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
        <h4>Diet : {details.diets}</h4>
        <h4>Cuisine : {details.cuisines}</h4>
      </div>
      <Info>
        <Button
          className={activeTab === 'instructions' ? 'active' : 'none'}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </Button>

        {/* INSTRUCTIONS */}
        {activeTab === 'instructions' && (
          <div>
            <h4 dangerouslySetInnerHTML={{ __html: details.summary }}></h4>
            <h4 className='except' dangerouslySetInnerHTML={{ __html: details.instructions }}></h4>
          </div>
        )}
        {/* INGREDIENTS */}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return (
                <li key={ingredient.id}>{ingredient.original}</li>
              )
            }
            )}
          </ul>
        )}

      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  background: #eee;
  padding: 2rem;

  .active {
    background: linear-gradient(45deg, #494949, #313131);
    color: white;
  }

  .except {
    position: absolute;
    left: 16%;
    right: 16%;
    padding: 3rem;
    background: #eee  ;
  }

  img {
    width: 500px;
  }

  h2 {
    margin-bottom: 2rem;
    color: #313131;
  }

  h4 {
    margin-top: 2rem;
    font-size: 1.1rem;
    color: #494949;
  }

  ul {
    margin-top: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  a {
    color: #494949;
  }
`
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid #313131;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`
const Info = styled.div`
  margin-left: 4rem;
`

export default Recipe;
