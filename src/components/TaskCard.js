import { useEffect, useState } from "react";
import "../style_sheets/TaskCard.css";

import {
  BsTrash3,
  BsStar,
  BsStarFill,
  BsPencil,
  BsFillPencilFill,
} from "react-icons/bs";
import { FaSquareCheck, FaSquareXmark } from "react-icons/fa6";

export const TaskCard = ({
  title,
  body,
  state,
  priority,
  changePriority,
  color,
  saved,
  deleted,
}) => {
  const [newState, setNewState] = useState(state);

  const [editMode, setEditMode] = useState(false);
  const [originalColor, setOriginalColor] = useState(color);
  const [currentColor, setCurrentColor] = useState(color);

  //#region task colors
  const colors =
    currentColor === 0
      ? "#807c5c"
      : currentColor === 1
      ? "#755555"
      : currentColor === 2
      ? "#586e4f"
      : currentColor === 3
      ? "#805c7e"
      : currentColor === 4
      ? "#5c8077"
      : "white";

  const boldColors =
    currentColor === 0
      ? "#6e6b4f"
      : currentColor === 1
      ? "#5c4343"
      : currentColor === 2
      ? "#485a41"
      : currentColor === 3
      ? "#725270"
      : currentColor === 4
      ? "#4f6e66"
      : "white";
  //#endregion

  useEffect(
    (e) => {
      if (e !== newState) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));

        const newTasks = tasks.map((current) => {
          if (current.title === title) {
            return {
              ...current,
              done: newState,
            };
          }
          return current;
        });

        localStorage.setItem("tasks", JSON.stringify(newTasks));
      }
    },
    [newState]
  );

  const changeColor = () => {
    console.log(1);
    if (currentColor === 0) {
      setCurrentColor(1);
    } else if (currentColor === 1) {
      setCurrentColor(2);
    } else if (currentColor === 2) {
      setCurrentColor(3);
    } else if (currentColor === 3) {
      setCurrentColor(4);
    } else if (currentColor === 4) {
      setCurrentColor(0);
    }
  };

  const cancelChanges = () => {
    setCurrentColor(originalColor);
    setEditMode(false);
  }

  const saveChanges = (newTitle, newBody) => {
    if (newBody && newTitle) {
      const newTaks = JSON.parse(localStorage.getItem("tasks")).map(
        (current) => {
          if (current.title === title) {
            current.color = currentColor;
            current.title = newTitle;
            current.body = newBody;
          }
          return current;
        }
      );
      localStorage.setItem("tasks", JSON.stringify(newTaks));
      setEditMode(false);
      setOriginalColor(currentColor)
      saved();
    }
  };

  useEffect(()=> {
    setOriginalColor(currentColor)
  }, [])

  return (
    <div
      className="Task-card"
      style={{
        backgroundColor: colors,
      }}
    >
      {editMode ? (
        <EditPanel
          lastTitle={title}
          lastBody={body}
          currentColor={currentColor}
          changeColor={changeColor}
          colors={colors}
          boldColors={boldColors}
          cancelChanges={cancelChanges}
          saveChanges={saveChanges}
        />
      ) : (
        <>
          <div className="Task-card-header">
            <h2>{title}</h2>
          </div>
          <div className="Task-card-body">
            <p>{body}</p>
          </div>
          <div className="Task-card-footer">
            <div className="Task-footer-state">
              <a
                onClick={() => setNewState(false)}
                style={
                  !newState
                    ? {
                        backgroundColor: boldColors,
                      }
                    : undefined
                }
              >
                in progress
              </a>
              <a
                onClick={() => setNewState(true)}
                style={
                  newState
                    ? {
                        backgroundColor: boldColors,
                      }
                    : undefined
                }
              >
                done
              </a>
            </div>
            <div className="Task-footer-settings">
              {priority ? (
                <div><BsStarFill onClick={changePriority} /></div>
              ) : (
                <div><BsStar onClick={changePriority} /></div>
              )}
              <div><BsPencil onClick={() => setEditMode(true)} /></div>
              <div>
              <BsTrash3
                onClick={deleted}
                className={priority ? "Soft-trash" : ""}
              />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const EditPanel = ({
  lastTitle,
  lastBody,
  changeColor,
  boldColors,
  cancelChanges,
  saveChanges,
}) => {
  const [newTitle, setNewTitle] = useState(lastTitle);
  const [newBody, setNewBody] = useState(lastBody);

  return (
    <div className="Edit-panel">
      <div className="Edit-panel-header">
        <div
          style={{
            backgroundColor: boldColors,
          }}
        >
          <textarea
            placeholder="New title here!"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          >
            {lastTitle}
          </textarea>
        </div>
      </div>
      <div className="Edit-panel-body">
        <div
          style={{
            backgroundColor: boldColors,
          }}
        >
          <textarea
            placeholder="I need change something..."
            maxLength={1608}
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          >
            {lastBody}
          </textarea>
        </div>
      </div>
      <div className="Edit-panel-footer">
        <div className="Edit-panel-footer-preferences">
          <div
            className="Edit-panel-footer-color"
            onClick={changeColor}
            style={{
              backgroundColor: boldColors,
            }}
          />
        </div>
        <div className="Edit-panel-footer-resolution">
          <div><FaSquareXmark onClick={cancelChanges} /></div>
          <div><FaSquareCheck onClick={() => saveChanges(newTitle, newBody)} /></div>
        </div>
      </div>
    </div>
  );
};
