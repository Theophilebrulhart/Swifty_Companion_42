import HeaderComponent from "@/components/header/headerComponent";
import ProjectList from "@/components/projectList/projectListComponent";
import { useSession } from "@/context/authContext";
import { UserProfile } from "@/type/user";
import { ThemeProvider } from "@react-navigation/native";
import { Redirect } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Profile() {
  const { me } = useSession();

  if (!me) {
    console.log("me not defined so back to login");
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent userProfile={me.userProfile} />
      <ProjectList projects={me.userProjects} />
    </SafeAreaView>
  );
}
