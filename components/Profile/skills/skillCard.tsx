import { Colors } from "@/constants/Colors";

import { Dimensions, StyleSheet, Text, View } from "react-native";

import { Skill } from "@/type/skills";
import { ThemedText } from "@/components/themedComponents/ThemedText";

const width = Dimensions.get("screen").width;

export default function SkillCard(props: { skill: Skill; color: string }) {
  const { skill, color } = props;

  return (
    <View
      style={[
        styles.cardContainer,
        { width: (width * skill.level * 10) / 100, backgroundColor: color },
      ]}
    >
      <View style={styles.nameContainer}>
        <ThemedText>{skill.name}</ThemedText>
      </View>
      <ThemedText>level : {Math.floor(skill.level)}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 50,
    paddingLeft: 20,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    backgroundColor: Colors.dark.dark,
  },
  nameContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    position: "absolute",
    top: -15,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
