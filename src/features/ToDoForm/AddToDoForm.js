import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import styles from "./AddToDoFrom.module.css";
import { addNewToDo } from "../toDoListSlice";
import { Card } from "../../components/Card";

export const AddPostForm = () => {
  const [toDo, setToDo] = useState("");
  const dispatch = useDispatch();

  const onToDoChanged = (e) => setToDo(e.target.value);

  const canSave = !(typeof toDo === "string" && toDo.trim().length === 0);

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        const resultAction = await dispatch(addNewToDo(toDo));
        unwrapResult(resultAction);
        setToDo("");
      } catch (err) {
        console.error("Failed to save the ToDo: ", err);
      }
    }
  };

  return (
    <Card className={styles.toDoForm}>
      <form>
        <div className={styles.newToDoControls}>
          <div className={styles.newToDoControl}>
            <input
              type="text"
              value={toDo}
              onChange={onToDoChanged}
              placeholder="Please type your ToDO"
            />
          </div>
          <div className={styles.newToDoActions}>
            <button
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
