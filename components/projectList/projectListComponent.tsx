import { ThemedText } from "../themedComponents/ThemedText";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Project } from "@/type/project";
import { ThemedView } from "../themedComponents/ThemedView";
import ProjectCard from "./projectCard";

export default function ProjectList(props: { projects: Project[] }) {
  const { projects } = props;

  const renderItem = ({ item }: { item: Project }) => {
    return <ProjectCard project={item} />;
  };

  console.log("projectList COmponent", projects);
  return (
    <ThemedView style={styles.listContainer}>
      <View
        style={{
          width: "100%",
          height: 70,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThemedText style={{ fontSize: 40, lineHeight: 0 }}>
          Projects : {projects.length}
        </ThemedText>
      </View>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        // extraData={selectedId}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
