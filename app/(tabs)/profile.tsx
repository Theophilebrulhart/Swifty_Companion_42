import HeaderComponent from "@/components/header/headerComponent";
import { useSession } from "@/context/authContext";
import { UserProfile } from "@/type/user";
import { SafeAreaView, Text, View } from "react-native";

export default function Profile() {
  const { me } = useSession();

  // console.log("me : ", me);

  return (
    <SafeAreaView>
      <HeaderComponent userProfile={me.userProfile} />
    </SafeAreaView>
  );
}
