import { ThemedText } from "../themedComponents/ThemedText";
import { FlatList, ImageBackground, StyleSheet, View } from "react-native";
import { Project } from "@/type/project";
import { ThemedView } from "../themedComponents/ThemedView";
import ProjectCard from "./projectCard";

export default function ProjectList(props: { projects: Project[] }) {
  const { projects } = props;

  const renderItem = ({ item }: { item: Project }) => {
    return <ProjectCard project={item} />;
  };

  return (
    <ImageBackground
      source={{
        uri: "https://play-lh.googleusercontent.com/R7908CY0RwHLy9zBRvK5iYfRPZdSlhOPOyAqwPd9cCYICrvU809bRhqDz28qRpteqCM",
      }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.listContainer}>
        {/* <View
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
        </View> */}
        <FlatList
          data={projects}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          // extraData={selectedId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    marginTop: 30,
    width: "100%",

    paddingHorizontal: 20,
  },
});
