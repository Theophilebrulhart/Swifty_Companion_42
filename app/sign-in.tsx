import {
  ImageBackground,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useSession } from "@/context/authContext";

export default function App() {
  const { signIn } = useSession();

  return (
    <ImageBackground
      source={{
        uri: "https://play-lh.googleusercontent.com/R7908CY0RwHLy9zBRvK5iYfRPZdSlhOPOyAqwPd9cCYICrvU809bRhqDz28qRpteqCM",
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Pressable onPress={signIn} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 150,
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
  },
});
