import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../core/hooks';
import styles from './AddToDoFrom.module.css';
import { addNewToDo } from '../toDosSlice';
import Card from '../../components/Card/Card';

const AddPostForm = () => {
  const [toDo, setToDo] = useState('');
  const dispatch = useAppDispatch();

  const onToDoChanged = (e) => setToDo(e.target.value);

  const canSave = !(typeof toDo === 'string' && toDo.trim().length === 0);

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const resultAction = await dispatch(addNewToDo(toDo));
        unwrapResult(resultAction);
        setToDo('');
      } catch (err) {
        console.log('Failed to save the ToDo: ', err);
      }
    }
  };

  return (
    <Card className={styles.toDoForm}>
      <form>
        <div className={styles.newToDoControls}>
          <div className={styles.newToDoControl}>
            <input
              className = 'todo-input'
              type="text"
              value={toDo}
              onChange={onToDoChanged}
              placeholder="Please type your ToDO"
            />
          </div>
          <div className={styles.newToDoActions}>
            <button
            className='submit-todo-input'
              type="button"
              onClick={onSavePostClicked}
              disabled={!canSave}
            >
              Save ToDo
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default AddPostForm;
