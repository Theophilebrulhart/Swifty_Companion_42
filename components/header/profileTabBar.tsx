import { StyleSheet, View } from "react-native";
import { ThemedView } from "../themedComponents/ThemedView";
import { ThemedText } from "../themedComponents/ThemedText";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Tabs } from "@/app/(tabs)/profile";
import ProfileTab from "./profileTab";

type ProfileTabBarProps = {
  contentType: Tabs;
  setContentType: (contentType: Tabs) => void;
};

export default function ProfileTabBar({
  contentType,
  setContentType,
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
      />
      <ProfileTab
        contentType={contentType}
        changeContentTo={changeContentTo}
        title={"projects"}
      />
      <ProfileTab
        contentType={contentType}
        changeContentTo={changeContentTo}
        title={"settings"}
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
