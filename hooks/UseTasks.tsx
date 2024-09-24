import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";

interface Task {
  id: number;
  text: string;
}

const UseTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text };
    setTasks([...tasks, newTask]);
  };
const deleteTask =(id: number) => {
setTasks(tasks.filter(task => task.id !== id))
}
const updateTask = (id: number, newText: string) => {
    setTasks(tasks.map(task => task.id === id? {...task, text: newText}: task))
}
  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
  }
};

export default UseTasks;

