import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ModalExample = () => {
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* 1. Main Content / Trigger Button */}
      <Text style={styles.title}>Main Application Content</Text>

      <Button
        title="Show Modal"
        onPress={() => setModalVisible(true)}
        color="#3498db"
      />

      {/* 2. The Modal Component */}
      <Modal
        animationType="slide" // Options: 'none', 'slide', 'fade'
        transparent={true} // Allows background interaction (but requires custom backdrop)
        visible={modalVisible} // Controls when the modal is shown
        onRequestClose={() => {
          // This is essential for Android back button support
          setModalVisible(!modalVisible);
        }}
      >
        {/* 3. Modal Content Wrapper (The Backdrop) */}
        <View style={styles.centeredView}>
          {/* 4. The Modal Card (The actual content area) */}
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello from inside the Modal!</Text>
            <Text style={styles.subText}>
              This content floats above the rest of the app.
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  // --- Modal Styles ---
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark semi-transparent backdrop
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
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
    width: "85%", // Make it responsive
    maxWidth: 400,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  subText: {
    marginBottom: 25,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    minWidth: 120,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ModalExample;
