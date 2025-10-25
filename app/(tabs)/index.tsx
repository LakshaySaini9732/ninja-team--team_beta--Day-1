import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import GroceryList from "../../components/GroceryList"; // ✅ correct path

export default function App() {
  const [cart, setCart] = useState<string[]>([]);

  const handleAddToCart = (item: string) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <GroceryList onAddToCart={handleAddToCart} cart={cart} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
});
