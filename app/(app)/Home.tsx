import { Collapsible } from "@/components/Collapsible";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useSession } from "@/context/authContext";
import { Text, View } from "react-native";

export default function Index() {
  const { signOut, isSessionLoading, me } = useSession();

  // console.log("is session loading : ", isSessionLoading);
  console.log("me :", me);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
