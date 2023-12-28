import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InvoiceForm from './Pages/InvoiceForm';
import Home from './Pages/Home';

// Implemented routing to navigate across the page and incorporated a Container function for enhanced styling.

class App extends Component {
  render() {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <BrowserRouter>
          <Container>
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/create' element={<InvoiceForm/>}/>
              <Route exact path='/create/:id' element={<InvoiceForm/>}/>
              <Route exact path='/create/:id' element={<InvoiceForm/>}/>
            </Routes>
          </Container>
        </BrowserRouter>
    </div>
  );
}}

export default App;