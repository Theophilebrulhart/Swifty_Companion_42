import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../themedComponents/ThemedText";
import { Skill } from "@/type/skills";
import { Colors } from "@/constants/Colors";
import SkillCard from "./skillCard";

export default function SkillsComponent(props: { skills: Skill[] }) {
  const { skills } = props;

  console.log("skikks", skills);
  const renderItem = ({ item }: { item: Skill }) => {
    return <SkillCard skill={item} />;
  };

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.listContainer}>
        <FlatList
          data={skills}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          // extraData={selectedId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    marginTop: 40,
    width: "100%",

    paddingHorizontal: 20,
  },
});
