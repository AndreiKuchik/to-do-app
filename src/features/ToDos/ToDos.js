import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/hooks';
import Card from '../../components/Card';
import ToDoFooter from '../ToDoFooter/ToDoFooter';
import { fetchToDoList } from '../toDosSlice';
import styles from './ToDos.module.css';
import ToDoList from './ToDoList';
import Statuses from '../../core/statusesEnum';
import ErrorMesssage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

const ToDos = () => {
  const dispatch = useAppDispatch();
  const listStatus = useAppSelector((state) => state.toDoList.status);

  useEffect(() => {
    if (listStatus === Statuses.Undefined) {
      dispatch(fetchToDoList());
    }
  }, [listStatus, dispatch]);

  let content;

  if (listStatus === Statuses.Loading) {
    content = <LoadingSpinner />;
  } else if (listStatus === Statuses.Succeeded) {
    content = (
      <React.Fragment>
        <ToDoList />
        <ToDoFooter />
      </React.Fragment>
    );
  } else if (listStatus === Statuses.Failed) {
    content = <ErrorMesssage />;
  }

  return <Card className={styles.toDos}>{content}</Card>;
};

export default ToDos;
