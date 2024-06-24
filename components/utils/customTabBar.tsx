import { StyleSheet, View } from "react-native";
import { Tabs } from "@/app/(tabs)/profile";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { HomeTabs } from "@/app/(tabs)/home";
import CustomTab from "./customTab";

type ProfileTabBarProps = {
  contentType: Tabs | HomeTabs;
  setContentType: React.Dispatch<React.SetStateAction<Tabs | HomeTabs>>;
  activeColor: string;
  labels: Tabs[] | HomeTabs[];
};

export default function CustomTabBar({
  contentType,
  setContentType,
  activeColor,
  labels,
}: ProfileTabBarProps) {
  const changeContentTo = (changeTo: Tabs | HomeTabs) => {
    if (changeTo !== contentType) setContentType(changeTo);
  };

  return (
    <ThemedView style={styles.profileTabBarContainer}>
      {labels.map((label: Tabs | HomeTabs) => {
        return (
          <CustomTab
            contentType={contentType}
            changeContentTo={changeContentTo}
            title={label}
            activeColor={activeColor}
          />
        );
      })}
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
