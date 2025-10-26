import React, { useState, useEffect } from "react";
import { SafeAreaView, Image, StyleSheet } from "react-native";
import GroceryList from "../../components/GroceryList"; // adjust if your component path differs

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); // 3 seconds splash
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (item: any) => {
    setCart([...cart, item]);
  };

  if (showSplash) {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <Image
          source={require("../../assets/images/grocery.png")} // correct relative path
          style={styles.splashImage}
          resizeMode="cover"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GroceryList cart={cart} setCart={setCart} onAddToCart={handleAddToCart} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f2f3ff",
  },
  splashImage: {
    width: "80%",
    height: "50%",
  },
});

export default App;
