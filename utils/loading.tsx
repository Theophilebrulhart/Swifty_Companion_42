import { ImageBackground, StyleSheet } from "react-native";

export default function Loading() {
  return (
    <ImageBackground
      source={{
        uri: "https://play-lh.googleusercontent.com/R7908CY0RwHLy9zBRvK5iYfRPZdSlhOPOyAqwPd9cCYICrvU809bRhqDz28qRpteqCM",
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    ></ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
