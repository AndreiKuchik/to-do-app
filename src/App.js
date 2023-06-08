import './App.css';
import React from 'react';
import AddPostForm from './features/ToDoForm/AddToDoForm';
import Header from './components/Header';
import ToDoList from './features/ToDoList/ToDoList';

function App() {
  return (
    <div className='App'>
      <Header/>
      <AddPostForm/>
      <ToDoList/>
    </div>
  );
}

export default App;
