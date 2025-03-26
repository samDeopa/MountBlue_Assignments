import { useEffect, useState } from "react";
import Button from "./Button";
import ListItem from "./ListItem";

const TransferList = () => {
  const [tasks, setTasks] = useState({
    id3e5f2a1b: {
      value: "Complete project report",
      list: "left",
      checked: false,
    },
    id7c4d8e9f: {
      value: "Review pull requests",
      list: "right",
      checked: false,
    },
    id2a1b3c4d: {
      value: "Update website content",
      list: "left",
      checked: false,
    },
    id9d8e7c6b: {
      value: "Prepare for team meeting",
      list: "right",
      checked: false,
    },
    id5a4b3c2d: {
      value: "Write unit tests",
      list: "left",
      checked: false,
    },
    id1f2e3d4c: {
      value: "Fix UI responsiveness",
      list: "right",
      checked: false,
    },
    id6b7a8c9d: {
      value: "Optimize database queries",
      list: "left",
      checked: false,
    },
    id4d3e2f1g: {
      value: "Schedule client call",
      list: "right",
      checked: false,
    },
    id8c7b6a5d: {
      value: "Clean up old branches",
      list: "left",
      checked: false,
    },
    id2f1e3d4c: {
      value: "Prepare presentation slides",
      list: "right",
      checked: false,
    },
    id9a8b7c6d: {
      value: "Refactor authentication module",
      list: "left",
      checked: false,
    },
    id3d2e1f4c: {
      value: "Update API documentation",
      list: "right",
      checked: false,
    },
    id7b6a5c4d: {
      value: "Test new feature deployment",
      list: "left",
      checked: false,
    },
    id5f4e3d2c: {
      value: "Research new tech stack",
      list: "right",
      checked: false,
    },
    id1c2b3a4d: { value: "Fix critical bugs", list: "left", checked: false },
    id8e7d6c5b: {
      value: "Prepare user training guide",
      list: "right",
      checked: false,
    },
    id4a3b2c1d: {
      value: "Check application logs",
      list: "left",
      checked: false,
    },
    id2e3f4d5c: {
      value: "Update CI/CD pipelines",
      list: "right",
      checked: false,
    },
    id9b8a7c6d: {
      value: "Optimize frontend performance",
      list: "left",
      checked: false,
    },
    id6f5e4d3c: {
      value: "Write blog post on best practices",
      list: "right",
      checked: false,
    },
  });
  let itemsState = {
    left: 0,
    right: 0,
    leftSelected: 0,
    rightSelected: 0,
  };

  let leftSelected = 0,
    rightSelected = 0,
    left = 0,
    right = 0;
  Object.values(tasks).forEach((task) => {
    if (task.list === "right") {
      right++;
      if (task.checked) {
        rightSelected++;
      }
    } else {
      left++;
      if (task.checked) {
        leftSelected++;
      }
    }
  });

  itemsState = {
    left: left,
    right: right,
    leftSelected: leftSelected,
    rightSelected: rightSelected,
  };
  const toggleItem = (uid) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [uid]: { ...prevTasks[uid], checked: !prevTasks[uid].checked },
    }));
  };

  const shiftRight = () => {
    setTasks((prevTasks) =>
      Object.entries(prevTasks).reduce((accumulator, [id, task]) => {
        if (task.list === "left" && task.checked) {
          accumulator[id] = {
            value: task.value,
            list: "right",
            checked: false,
          };
        } else {
          accumulator[id] = { ...task };
        }
        return accumulator;
      }, {})
    );
  };

  const shiftLeft = () => {
    setTasks((prevTasks) =>
      Object.entries(prevTasks).reduce((accumulator, item) => {
        if (item[1].list === "right" && item[1].checked) {
          accumulator[item[0]] = {
            value: item[1].value,
            list: "left",
            checked: false,
          };
        } else {
          accumulator[item[0]] = { ...item[1] };
        }

        return accumulator;
      }, {})
    );
  };
  const shiftAllRight = () => {
    setTasks((prevTasks) =>
      Object.entries(prevTasks).reduce((accumulator, item) => {
        if (item[1].list === "left") {
          accumulator[item[0]] = {
            value: item[1].value,
            list: "right",
            checked: item[1].checked,
          };
        } else {
          accumulator[item[0]] = { ...item[1] };
        }

        return accumulator;
      }, {})
    );
  };
  const shiftAllLeft = () => {
    setTasks((prevTasks) =>
      Object.entries(prevTasks).reduce((accumulator, item) => {
        if (item[1].list === "right") {
          accumulator[item[0]] = {
            value: item[1].value,
            list: "left",
            checked: item[1].checked,
          };
        } else {
          accumulator[item[0]] = { ...item[1] };
        }

        return accumulator;
      }, {})
    );
  };

  return (
    <div className="flex justify-center ">
      <div className="  min-w-[20%]  border-1 p-4">
        {Object.entries(tasks).map((item) => {
          if (item[1].list === "left")
            return (
              <ListItem
                key={item[0]}
                uid={item[0]}
                labelText={item[1].value}
                onClickHandler={(event) => {
                  toggleItem(item[0]);
                }}
                checked={item[1].checked}
              />
            );
        })}
      </div>
      <div className="flex flex-col border-y-1 p-4">
        <Button
          value="&gt; "
          onClickHandler={shiftRight}
          disabled={itemsState.leftSelected > 0 ? false : true}
        />
        <Button
          value="&gt;&gt;"
          onClickHandler={shiftAllRight}
          disabled={itemsState.left > 0 ? false : true}
        />
        <Button
          value="&lt;"
          onClickHandler={shiftLeft}
          disabled={itemsState.rightSelected > 0 ? false : true}
        />
        <Button
          value="&lt;&lt;"
          onClickHandler={shiftAllLeft}
          disabled={itemsState.right > 0 ? false : true}
        />
      </div>
      <div className="  min-w-[20%] border-1 p-4">
        {Object.entries(tasks).map((item) => {
          if (item[1].list === "right")
            return (
              <ListItem
                key={item[0]}
                uid={item[0]}
                labelText={item[1].value}
                onClickHandler={(event) => {
                  toggleItem(item[0]);
                }}
                checked={item[1].checked}
              />
            );
        })}
      </div>
    </div>
  );
};

export default TransferList;
