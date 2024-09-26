import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  FlatList,
  Platform,
} from "react-native";
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
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: Platform.OS === "ios" ? "green" : "#1c1c45",
      }}>
      <InputComponent
        placeholder="Enter a task..."
        value={currentTask}
        onChangeText={setCurrentTask}
        style={styles.input}
      />
      <ButtonComponent
        title="+"
        color=""
        onPress={handleAddTask}
        style={styles.button}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item: Task) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={{ color: "white" }}>{item.text}</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <ButtonComponent
                title="*"
                color="blue"
                onPress={() => handleEditTask(item)}
                style={styles.buttons}
              />
              <ButtonComponent
                title="-"
                color="red"
                onPress={() => deleteTask(item.id)}
                style={styles.buttonss}
              />
            </View>
          </View>
        )}
        contentContainerStyle={{ flex: 1, width: "100%", marginTop: 12, paddingHorizontal: 20 }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed");
          setModalVisible(!isModalVisible);
        }}>
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
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // flex: 1,
    width: "100%",
    marginBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  input: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 24,
    backgroundColor: "white",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 100,
    backgroundColor: "green",
    paddingHorizontal: 30,
    paddingVertical: 16,
  },
  buttons: {
    borderRadius: 20,
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonss: {
    borderRadius: 20,
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
