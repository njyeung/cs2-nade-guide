import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Editor from '../content/Editor'
import Home from '../content/Home';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/editor' element={<Editor/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
