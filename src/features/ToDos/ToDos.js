import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Card from '../../components/Card/Card';
import ToDoFooter from '../ToDoFooter/ToDoFooter';
import { fetchToDoList } from '../toDosActions';
import styles from './ToDos.module.css';
import ToDoList from './ToDoList/ToDoList';
import Statuses from '../../common/requestStatusesEnum';
import ErrorMesssage from '../../components/ErrorMessage/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ToDos = () => {
  const dispatch = useAppDispatch();
  const listStatus = useAppSelector((state) => state.toDoList.status);

  useEffect(() => {
    if (listStatus === Statuses.Idle) {
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
