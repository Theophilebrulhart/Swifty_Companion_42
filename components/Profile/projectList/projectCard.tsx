import { Colors } from "@/constants/Colors";
import { Project } from "@/type/project";
import { Dimensions, StyleSheet, View } from "react-native";
import { formatDate } from "date-fns";
import { ThemedText } from "@/components/themedComponents/ThemedText";

const width = Dimensions.get("screen").width;

export default function ProjectCard(props: {
  project: Project;
  color: string;
}) {
  const { project, color } = props;
  const bgColor = project.validated ? Colors.dark.success : Colors.dark.error;
  const date = formatDate(project.created_at, "dd MM yy");
  return (
    <View style={[styles.cardContainer, { width: width - 50 }]}>
      <View style={styles.leftContainer}>
        <View style={[styles.nameContainer, { backgroundColor: color }]}>
          <ThemedText style={{ fontSize: 20 }}>{project.name}</ThemedText>
        </View>
        <View style={[styles.markContainer, { borderColor: bgColor }]}>
          <ThemedText style={{ fontSize: 30, lineHeight: 0 }}>
            {project.final_mark}
          </ThemedText>
        </View>
      </View>
      <View style={[styles.rightContainer, { borderColor: bgColor }]}>
        <ThemedText style={{ fontSize: 20 }}>{date}</ThemedText>
        <ThemedText style={{ fontSize: 20 }}>
          {project.status.toLocaleUpperCase()}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
  },
  leftContainer: {
    flex: 3,
  },
  nameContainer: {
    flex: 2,
    backgroundColor: Colors.dark.dark,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
  },
  markContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
  },
  rightContainer: {
    flex: 2,
    height: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 6,
    borderLeftWidth: 0,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
