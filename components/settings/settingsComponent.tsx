import {
  ImageBackground,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useSession } from "@/context/authContext";

export default function SettingsComponent() {
  const { signOut } = useSession();

  return (
    <View style={styles.container}>
      <Pressable onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
