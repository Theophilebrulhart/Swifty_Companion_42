import HeaderComponent from "@/components/Profile/profileHeader/headerComponent";
import ProjectList from "@/components/Profile/projectList/projectListComponent";
import SettingsComponent from "@/components/Profile/settings/settingsComponent";
import SkillsComponent from "@/components/Profile/skills/skillsComponent";
import { useSession } from "@/context/authContext";
import { Redirect } from "expo-router";
import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { HomeTabs } from "./home";
import CustomTabBar from "@/components/utils/customTabBar";

export type Tabs = "projects" | "skills" | "settings";

export default function Profile() {
  const { me, isMeLoading } = useSession();
  const [contentType, setContentType] = useState<Tabs | HomeTabs>("projects");
  const labels: Tabs[] = ["skills", "projects", "settings"];

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart((event) => {
      if (contentType === "projects") {
        if (event.translationX > 10) setContentType("skills");
        if (event.translationX < -10) setContentType("settings");
      }
      if (event.translationX < -10 && contentType === "skills")
        setContentType("projects");
      if (event.translationX > 10 && contentType === "settings")
        setContentType("projects");
    })
    .runOnJS(true);

  if (!me) {
    console.log(
      "me not defined so back to login and isMeLoading :",
      isMeLoading
    );
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent
        userProfile={me.userProfile}
        userCoalition={me.userCoalition}
      />
      <ImageBackground
        source={{
          uri: "https://play-lh.googleusercontent.com/R7908CY0RwHLy9zBRvK5iYfRPZdSlhOPOyAqwPd9cCYICrvU809bRhqDz28qRpteqCM",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <CustomTabBar
          contentType={contentType}
          setContentType={setContentType}
          activeColor={me.userCoalition.dark_color}
          labels={labels}
        />
        <GestureDetector gesture={pan}>
          <View style={{ flex: 1 }}>
            {contentType === "projects" && (
              <ProjectList
                projects={me.userProjects}
                color={me.userCoalition.dark_color}
              />
            )}
            {contentType === "skills" && (
              <SkillsComponent
                skills={me.userSkills}
                color={me.userCoalition.dark_color}
              />
            )}
            {contentType === "settings" && <SettingsComponent />}
          </View>
        </GestureDetector>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
