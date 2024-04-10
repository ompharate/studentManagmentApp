import React from "react";
import { View, StyleSheet } from "react-native";

const Loader = () => {
  return (
    <View style={styles.threeBody}>
      <View style={styles.dot} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  threeBody: {
    position: "relative",
    display: "flex",
    height: 35, // You can adjust the size as needed
    width: 35, // You can adjust the size as needed
    transform: [{ rotate: "0deg" }], // Adjust this for animations
  },
  dot: {
    position: "absolute",
    height: "100%",
    width: "30%",
    borderRadius: 50,
    backgroundColor: "#5D3FD3", // Use your desired color
  },
});

export default Loader;
