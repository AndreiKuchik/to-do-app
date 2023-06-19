import { v4 as uuid } from 'uuid';

const storeName = 'toDoList';

const repository = async () => {
  const list = localStorage.getItem(storeName);
  if (list === null) {
    return [];
  }
  return JSON.parse(list);
};

repository.getAll = async () => repository();

repository.reorderList = async ({ dragElementId, dropElementId }) => {
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
  localStorage.setItem(storeName, JSON.stringify(list));
};

repository.delete = async (id) => {
  const list = await repository();
  const filtaredList = list.filter((obj) => obj.id !== id);
  localStorage.setItem(storeName, JSON.stringify(filtaredList));
  return id;
};

repository.complete = async (id) => {
  const list = await repository();

  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index].isCompleted = !list[index].isCompleted;
  }

  localStorage.setItem(storeName, JSON.stringify(list));
  return id;
};

repository.addItem = async (initialToDo) => {
  const item = {
    toDo: initialToDo,
    id: uuid(),
    isCompleted: false,
  };
  const list = await repository();
  list.push(item);
  localStorage.setItem(storeName, JSON.stringify(list));

  return item;
};

repository.deleteAllCompleted = async () => {
  let list = await repository();
  list = list.filter((todo) => !todo.isCompleted);
  localStorage.setItem(storeName, JSON.stringify(list));
};

export default repository;
