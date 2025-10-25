import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import AddToCartButton from "./AddToCartButton";

interface GroceryListProps {
  onAddToCart: (item: string) => void;
  cart: string[];
}

const GroceryList: React.FC<GroceryListProps> = ({ onAddToCart, cart }) => {
  const [search, setSearch] = useState("");

  const groceries = [
    "Apples",
    "Bananas",
    "Carrots",
    "Milk",
    "Eggs",
    "Bread",
    "Cheese",
    "Rice",
    "Potatoes",
    "Tomatoes",
  ];

  const filteredGroceries = groceries.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>🛒 Grocery Store</Text>

      {/* Search Input */}
      <TextInput
        placeholder="🔍 Search grocery..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* Grocery List */}
      <FlatList
        data={filteredGroceries}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.groceryItem}>
            <Text style={styles.groceryText}>{item}</Text>
            <AddToCartButton item={item} onAddToCart={onAddToCart} />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.cartSection}>
            <Text style={styles.cartTitle}>🧺 Cart Items:</Text>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <Text key={index} style={styles.cartItem}>
                  • {item}
                </Text>
              ))
            ) : (
              <Text style={styles.emptyCart}>Cart is empty.</Text>
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  groceryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  groceryText: {
    fontSize: 16,
    color: "#111",
  },
  cartSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 10,
  },
  cartItem: {
    fontSize: 16,
    color: "#111",
    marginVertical: 3,
  },
  emptyCart: {
    fontSize: 16,
    color: "#9ca3af",
  },
});

export default GroceryList;
