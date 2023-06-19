import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../app/hooks';
import styles from './AddToDoFrom.module.css';
import { addNewToDo } from '../toDosActions';
import Card from '../../components/Card/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const AddPostForm = () => {
  const [toDo, setToDo] = useState('');
  const dispatch = useAppDispatch();

  const canSave = !(typeof toDo === 'string' && toDo.trim().length === 0);

  const submitHandler = async (event) => {
    event.preventDefault();

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
      <form onSubmit={submitHandler}>
        <div className={styles.newToDoControls}>
          <div className={styles.newToDoControl}>
            <Input text={toDo} onTextChange={setToDo} />
          </div>
          <div className={styles.newToDoActions}>
            <Button
              buttonClass='submiteButton'
              buttonType="submit"
              buttonName="Save ToDo"
              isDisabled={!canSave}
            />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default AddPostForm;
