import { Tabs } from "@/app/(tabs)/profile";
import { Colors } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themedComponents/ThemedText";

type ProfileTabProps = {
  contentType: Tabs;
  changeContentTo: (changeTo: Tabs) => void;
  title: Tabs;
};

export default function ProfileTab({
  contentType,
  title,
  changeContentTo,
}: ProfileTabProps) {
  return (
    <TouchableOpacity
      style={[
        styles.tab,
        {
          borderBottomWidth: title === contentType ? 3 : 0,
          borderColor: title === contentType ? Colors.dark.dark : "#fff",
        },
      ]}
      onPress={() => changeContentTo(title)}
    >
      <ThemedText
        style={[
          styles.tabText,
          {
            color:
              title === contentType
                ? Colors.dark.tabIconSelected
                : Colors.dark.tabIconDefault,
          },
        ]}
      >
        {title.toUpperCase()}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
