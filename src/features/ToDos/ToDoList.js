/* eslint-disable no-shadow */
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../core/hooks';
import Card from '../../components/Card';
import { selectToDoList, reorderList } from '../toDoListSlice';
import styles from './ToDoList.module.css';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
  const dispatch = useAppDispatch();
  const toDoList = useAppSelector(selectToDoList);

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
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ToDoItem
                          key={todo.id}
                          id={todo.id}
                          text={todo.toDo}
                          isCompleted={todo.isCompleted}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {toDoList.length === 0 && (
        <h3 role="empty-list-text">ToDo list is empty</h3>
      )}
    </Card>
  );
};

export default ToDoList;
