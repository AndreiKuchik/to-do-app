import './App.css';
import React from 'react';
import AddPostForm from './features/ToDoForm/AddToDoForm';
import Header from './components/Header';
import ToDos from './features/ToDos/ToDos';

function App() {
  return (
    <div className='App'>
      <Header/>
      <AddPostForm/>
      <ToDos/>
    </div>
  );
}

export default App;
