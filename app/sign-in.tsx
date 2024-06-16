import { Pressable, Text, View } from "react-native";
import { useSession } from "@/context/authContext";

export default function App() {
  const { signIn } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable
        onPress={() => {
          console.log("Login button pressed");
          signIn();
        }}
      >
        <Text style={{ fontSize: 20, color: "blue" }}>Login</Text>
      </Pressable>
    </View>
  );
}
