import { FlatList, StyleSheet, View } from "react-native";
import { Project } from "@/type/project";
import ProjectCard from "./projectCard";

export default function ProjectList(props: { projects: Project[] }) {
  const { projects } = props;

  const renderItem = ({ item }: { item: Project }) => {
    return <ProjectCard project={item} />;
  };

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.listContainer}>
        <FlatList
          data={projects}
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
    marginTop: 30,
    width: "100%",

    paddingHorizontal: 20,
  },
});
