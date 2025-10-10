import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";

export default function App() {
  const [students, setStudents] = useState([
    { rollno: 1, Name: "Lakshay Saini" },
    { rollno: 2, Name: "KamalPreet Singh" },
    { rollno: 3, Name: "Arpit Dogra" },
    { rollno: 4, Name: "Sakshi" },
    { rollno: 5, Name: "Shagun" },
  ]);

  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [editingRoll, setEditingRoll] = useState(null);

  // Generate next roll number in sequence
  const getNextRollNo = () => {
    if (students.length === 0) return 1;
    const maxRoll = Math.max(...students.map((s) => s.rollno));
    return maxRoll + 1;
  };

  // Format roll number to 2 digits (e.g., 01, 09, 10, 25)
  const formatRollNo = (num) => num.toString().padStart(2, "0");

  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed === "") return Alert.alert("Error", "Enter a valid name");

    if (editingRoll) {
      setStudents((prev) =>
        prev.map((s) =>
          s.rollno === editingRoll ? { ...s, Name: trimmed } : s
        )
      );
      setEditingRoll(null);
    } else {
      const newRoll = getNextRollNo();
      setStudents((prev) => [...prev, { rollno: newRoll, Name: trimmed }]);
    }

    setName("");
    Keyboard.dismiss();
  };

  const handleDelete = (rollno) => {
    Alert.alert("Confirm Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setStudents((prev) => prev.filter((s) => s.rollno !== rollno)),
      },
    ]);
  };

  const handleEdit = (student) => {
    setName(student.Name);
    setEditingRoll(student.rollno);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.Name.toLowerCase().includes(search.toLowerCase()) ||
      formatRollNo(s.rollno).includes(search)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>📘 Student CRUD List</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search by name or roll no"
          placeholderTextColor="#555"
          value={search}
          onChangeText={setSearch}
        />

        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter student name"
          placeholderTextColor="#555"
          value={name}
          onChangeText={setName}
        />

        {/* Add / Update Button */}
        <TouchableOpacity
          style={[styles.button, editingRoll && styles.updateButton]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>
            {editingRoll ? "UPDATE STUDENT" : "ADD STUDENT"}
          </Text>
        </TouchableOpacity>

        {/* Student List */}
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={filteredStudents}
          keyExtractor={(item) => item.rollno.toString()}
          ListEmptyComponent={
            <Text style={{ color: "#333", fontSize: 16, marginTop: 20 }}>
              No students found.
            </Text>
          }
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.text}>
                {index + 1}. RollNo: {formatRollNo(item.rollno)} — {item.Name}
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.editBtn]}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.deleteBtn]}
                  onPress={() => handleDelete(item.rollno)}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#c4e773ff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 40,
  },
  searchInput: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 12,
    fontSize: 22,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#e2c20bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 15,
  },
  updateButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  item: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    color: "#222",
    fontSize: 20,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editBtn: {
    backgroundColor: "#007AFF",
  },
  deleteBtn: {
    backgroundColor: "#FF3B30",
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
});
