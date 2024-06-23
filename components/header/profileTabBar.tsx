import { StyleSheet, View } from "react-native";
import { ThemedView } from "../themedComponents/ThemedView";
import { Tabs } from "@/app/(tabs)/profile";
import ProfileTab from "./profileTab";
import { Coalition } from "@/type/coalition";

type ProfileTabBarProps = {
  contentType: Tabs;
  setContentType: (contentType: Tabs) => void;
  activeColor: string;
};

export default function ProfileTabBar({
  contentType,
  setContentType,
  activeColor,
}: ProfileTabBarProps) {
  const changeContentTo = (changeTo: Tabs) => {
    if (changeTo !== contentType) setContentType(changeTo);
  };

  return (
    <ThemedView style={styles.profileTabBarContainer}>
      <ProfileTab
        contentType={contentType}
        changeContentTo={changeContentTo}
        title={"skills"}
        activeColor={activeColor}
      />
      <ProfileTab
        contentType={contentType}
        changeContentTo={changeContentTo}
        title={"projects"}
        activeColor={activeColor}
      />
      <ProfileTab
        contentType={contentType}
        changeContentTo={changeContentTo}
        title={"settings"}
        activeColor={activeColor}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  profileTabBarContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: {
    height: "100%",
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    lineHeight: 0,
  },
});
