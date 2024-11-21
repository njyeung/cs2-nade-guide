import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Tool from '../content/Tool'
import Home from '../content/Home';
import Editor from '../content/Editor'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/tool' element={<Tool/>}></Route>
          <Route path='/editor' element={<Editor />}></Route>
          <Route path='/*' element={<Home/>}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
