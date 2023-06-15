import repository from './localeStorageRepository';

const initialList = [
  {
    id: '1',
    toDo: 'ToDo1',
    isCompleted: false,
  },
  {
    id: '2',
    toDo: 'ToDo2',
    isCompleted: true,
  },
  {
    id: '3',
    toDo: 'ToDo3',
    isCompleted: false,
  },
];

describe('localeStorageRepository', () => {
  beforeEach(() => {
    localStorage.setItem('toDoList', JSON.stringify(initialList));
  });

  it('should get all items from local storage', async () => {
    const storedItems = await repository.getAll();
    expect(storedItems).toEqual(initialList);
  });

  it('should reorder List of todos in local storage', async () => {
    const dragElementId = '3';
    const dropElementId = '1';

    const dragAndDropAction = {
      dragElementId,
      dropElementId,
    };

    const dragElement = initialList[initialList.findIndex((item) => item.id === dragElementId)];
    const dropElementIndex = initialList.findIndex(
      (item) => item.id === dropElementId,
    );

    await repository.reorderList(dragAndDropAction);
    const listAfterReordering = await repository.getAll();
    const dragElementIndexAfterDrop = listAfterReordering.findIndex(
      (item) => item.id === dragElementId,
    );

    expect(dragElementIndexAfterDrop).toEqual(dropElementIndex);
    expect(listAfterReordering[dragElementIndexAfterDrop]).toEqual(dragElement);
  });

  it('should delete todo item from local storage', async () => {
    const idToDoItemToDelete = '1';
    await repository.delete(idToDoItemToDelete);

    const listAfterDeleting = await repository.getAll();

    expect(
      listAfterDeleting.findIndex((item) => item.id === idToDoItemToDelete),
    ).toEqual(-1);
  });

  it('should set todo item as completed in local storage', async () => {
    const idToDoItemToComplete = '1';
    await repository.complete(idToDoItemToComplete);

    const listAfterDeleting = await repository.getAll();
    const index = listAfterDeleting.findIndex((item) => item.id === idToDoItemToComplete);

    expect(listAfterDeleting[index].isCompleted).toEqual(true);
  });

  it('should delete all completed todos in local storage', async () => {
    await repository.deleteAllCompleted();
    const listAfterDeleting = await repository.getAll();
    expect(listAfterDeleting.findIndex((item) => item.id === '2')).toEqual(-1);
  });

  it('should initialize add new todo item in local storage', async () => {
    const newToDo = 'newTodo';
    await repository.addItem(newToDo);

    const listAfterAddition = await repository.getAll();
    const newItemIdex = listAfterAddition.findIndex((item) => item.toDo === newToDo);

    expect(listAfterAddition[newItemIdex].toDo).toEqual(newToDo);
    expect(listAfterAddition[newItemIdex].isCompleted).toEqual(false);
    expect(!listAfterAddition[newItemIdex].id).toBeFalsy();
  });
});
