import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from './Searched';
import Recipe from './Recipe';

function Pages() {

  // for animation
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:name" element={<Recipe />} />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages;