import HeaderComponent from "@/components/header/headerComponent";
import ProjectList from "@/components/projectList/projectListComponent";
import { useSession } from "@/context/authContext";
import { UserProfile } from "@/type/user";
import { ThemeProvider } from "@react-navigation/native";
import { SafeAreaView, Text, View } from "react-native";

export default function Profile() {
  const { me } = useSession();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent userProfile={me.userProfile} />
      <ProjectList projects={me.userProjects} />
    </SafeAreaView>
  );
}
