import HeaderComponent from "@/components/header/headerComponent";
import ProfileTabBar from "@/components/header/profileTabBar";
import ProjectList from "@/components/projectList/projectListComponent";
import SettingsComponent from "@/components/settings/settingsComponent";
import SkillsComponent from "@/components/skills/skillsComponent";
import { useSession } from "@/context/authContext";
import { getCoalition } from "@/utils/api";
import { Redirect } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export type Tabs = "projects" | "skills" | "settings";

const { width, height } = Dimensions.get("screen");

export default function Profile() {
  const { me } = useSession();
  const [contentType, setContentType] = useState<Tabs>("projects");

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
    console.log("me not defined so back to login");
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
        <ProfileTabBar
          contentType={contentType}
          setContentType={setContentType}
          activeColor={me.userCoalition.dark_color}
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
