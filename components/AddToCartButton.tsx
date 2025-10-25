import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface AddToCartButtonProps {
  item: string;
  onAddToCart: (item: string) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item, onAddToCart }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onAddToCart(item)}>
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#16a34a",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default AddToCartButton;
