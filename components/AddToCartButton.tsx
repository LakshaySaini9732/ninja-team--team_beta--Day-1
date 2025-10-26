import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface GroceryItem {
  id: string;
  name: string;
  price: number;
  image: any;
}

interface AddToCartButtonProps {
  item: GroceryItem;
  onAddToCart: (item: GroceryItem) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item, onAddToCart }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onAddToCart(item)}
    >
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default AddToCartButton;
