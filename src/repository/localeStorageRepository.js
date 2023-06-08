import { v4 as uuid } from 'uuid';

const repository = async () => {
  const list = localStorage.getItem('toDoList');
  if (list === null) {
    return [];
  }
  return JSON.parse(list);
};

repository.getAll = function () {
  return repository();
};

repository.reorderList = async function ({ dragElementId, dropElementId }) {
  let list = await repository();

  const updatedList = [...list];
  const [reorderedItem] = updatedList.splice(
    list.findIndex((item) => item.id === dragElementId),
    1,
  );
  updatedList.splice(
    list.findIndex((item) => item.id === dropElementId),
    0,
    reorderedItem,
  );
  list = updatedList;
  localStorage.setItem('toDoList', JSON.stringify(list));
  return list;
};

repository.delete = async function (id) {
  const list = await repository();
  const filtaredList = list.filter((obj) => obj.id !== id);
  localStorage.setItem('toDoList', JSON.stringify(filtaredList));
  return id;
};

repository.complete = async function (id) {
  const list = await repository();

  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index].isCompleted = !list[index].isCompleted;
  }

  localStorage.setItem('toDoList', JSON.stringify(list));
  return id;
};

repository.addItem = async function (text) {
  const item = {
    toDo: text,
    id: uuid(),
    isCompleted: false,
  };

  const list = await repository();
  list.push(item);
  localStorage.setItem('toDoList', JSON.stringify(list));

  return item;
};

repository.deleteAllCompleted = async function () {
  let list = await repository();
  list = list.filter((todo) => !todo.isCompleted);
  localStorage.setItem('toDoList', JSON.stringify(list));
};

export default repository;
