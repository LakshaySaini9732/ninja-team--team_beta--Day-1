import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import AddToCartButton from "./AddToCartButton";

interface GroceryItem {
  id: string;
  name: string;
  price: number;
  image: any;
}

interface GroceryListProps {
  onAddToCart: (item: GroceryItem) => void;
  cart: GroceryItem[];
  setCart: React.Dispatch<React.SetStateAction<GroceryItem[]>>;
}

const GroceryList: React.FC<GroceryListProps> = ({ onAddToCart, cart, setCart }) => {
  const [search, setSearch] = useState("");

  const groceries: GroceryItem[] = [
    { id: "1", name: "Apples", price: 80, image: require("../assets/images/apples.png") },
    { id: "2", name: "Bananas", price: 50, image: require("../assets/images/banana.png") },
    { id: "4", name: "Milk", price: 60, image: require("../assets/images/verka.png") },
    { id: "5", name: "Bread", price: 40, image: require("../assets/images/bread.png") },
    { id: "6", name: "Tomato", price: 30, image: require("../assets/images/tomato.png") },
  ];

  const filteredGroceries = groceries.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const removeAll = () => {
    setCart([]);
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groceryItem}>
            <View style={styles.itemInfo}>
              <Image source={item.image} style={styles.itemImage} />
              <View>
                <Text style={styles.groceryText}>{item.name}</Text>
                <Text style={styles.priceText}>₹{item.price.toFixed(2)}</Text>
              </View>
            </View>
            <AddToCartButton item={item} onAddToCart={onAddToCart} />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.cartSection}>
            <Text style={styles.cartTitle}>🧺 Cart Items:</Text>

            {cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <View key={index} style={styles.cartItemRow}>
                    <Text style={styles.cartItem}>• {item.name} - ₹{item.price.toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeBtn}>
                      <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Total Price */}
                <Text style={styles.totalPrice}>Total: ₹{totalPrice.toFixed(2)}</Text>

                <TouchableOpacity onPress={removeAll} style={styles.removeAllBtn}>
                  <Text style={styles.removeAllText}>Remove All</Text>
                </TouchableOpacity>
              </>
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
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 30, backgroundColor: "#f9fafb" },
  header: { fontSize: 28, fontWeight: "800", color: "#111827", marginBottom: 20, textAlign: "center" },
  searchInput: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 10, marginBottom: 10, backgroundColor: "white" },
  groceryItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: 12, marginVertical: 5, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 3, elevation: 2 },
  itemInfo: { flexDirection: "row", alignItems: "center" },
  itemImage: { width: 50, height: 50, marginRight: 10, borderRadius: 8 },
  groceryText: { fontSize: 16, color: "#111" },
  priceText: { fontSize: 14, color: "#4b5563", marginTop: 2 },
  cartSection: { marginTop: 20, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
  cartTitle: { fontSize: 20, fontWeight: "700", color: "#1f2937", marginBottom: 10 },
  cartItemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 3 },
  cartItem: { fontSize: 16, color: "#111" },
  removeBtn: { backgroundColor: "#ef4444", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  removeBtnText: { color: "#fff", fontWeight: "600" },
  removeAllBtn: { marginTop: 10, backgroundColor: "#b91c1c", padding: 8, borderRadius: 8, alignItems: "center" },
  removeAllText: { color: "#fff", fontWeight: "700" },
  totalPrice: { fontSize: 18, fontWeight: "700", marginTop: 10, textAlign: "right", color: "#111827" },
  emptyCart: { fontSize: 16, color: "#9ca3af" },
});

export default GroceryList;
