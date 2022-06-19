import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Search() {

    const [input, setInput] = useState('');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        // Searched sayfasını kullanarak
        // input'a girilen aramaya yönlendir
        navigate("/searched/" + input);
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            <FaSearch />
            <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                value={input} />
        </FormStyle>
    )
}

const FormStyle = styled.form`
    margin: 0 10rem;
    margin-top: 2rem;
    position: relative;

    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.2rem;
        color: white;
        padding: 0 3rem;
        border: none;
        border-radius: 1.5rem;
        outline: none;
        width: 100%;
        height: 3rem;
    }

    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`

export default Search
