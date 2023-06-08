import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Card from '../../components/Card';

import ToDoFooter from '../ToDoFooter/ToDoFooter';
import { selectToDoList, fetchToDoList, reorderList } from '../toDoListSlice';

import styles from './ToDoList.module.css';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
  const dispatch = useDispatch();
  const toDoList = useSelector(selectToDoList);
  const status = useSelector((state) => state.toDoList.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchToDoList());
    }
  }, [status, dispatch]);

  const onDragEnd = (result) => {
    const dragElementId = toDoList[result.source.index].id;
    const dropElementId = toDoList[result.destination.index].id;
    const dragAndDropAction = {
      dragElementId,
      dropElementId,
    };
    dispatch(reorderList(dragAndDropAction));
  };

  return (
    <Card className={styles.toDoList}>
      {toDoList.length !== 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="toDoList">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {toDoList.map((todo, index) => (
                  <ToDoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.toDo}
                    index={index}
                    isCompleted={todo.isCompleted}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {toDoList.length === 0 && <h3>ToDo list is empty</h3>}
      <ToDoFooter toDosAmount={toDoList.length} />
    </Card>
  );
};

export default ToDoList;
