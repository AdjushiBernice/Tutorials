import { StyleSheet, Text, View, Modal, Alert, FlatList } from "react-native";
import React, { useState } from "react";
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import UseTasks from "@/hooks/UseTasks";

interface Task {
  id: number;
  text: string;
}
const index: React.FC = () => {
  const { tasks, addTask, deleteTask, updateTask } = UseTasks();
  const [currentTask, setCurrentTask] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [editableTask, setEditableTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    if (!currentTask.trim()) {
      Alert.alert("Error", "Please enter a task");
      return;
    }
    addTask(currentTask);
    setCurrentTask("");
  };
  const handleEditTask = (task: Task) => {
    setEditableTask(task);
    setCurrentTask(task.text);
    setModalVisible(true);
  };
  const submitTaskEdit = () => {
    if (editableTask) {
      updateTask(editableTask.id, currentTask);
      setModalVisible(false);
      setCurrentTask("");
      setEditableTask(null);
    }
  };
  return (
    <View style={styles.container}>
      <InputComponent
        placeholder="Enter a task..."
        value={currentTask}
        onChangeText={setCurrentTask}
      />
      <ButtonComponent title="Add Task" color="" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item: Task) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.text}</Text>
            <ButtonComponent
              title="Edit"
              color=""
              onPress={() => handleEditTask(item)}
            />
            <ButtonComponent
              title="Delete"
              color="red"
              onPress={() => deleteTask(item.id)}
            />
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed");
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <InputComponent
              placeholder="Edit task..."
              value={currentTask}
              onChangeText={setCurrentTask}
            />
            <ButtonComponent title="Submit" color="" onPress={submitTaskEdit} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'

  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor:"ccc",

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
