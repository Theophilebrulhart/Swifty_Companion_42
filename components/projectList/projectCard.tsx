import { Colors } from "@/constants/Colors";
import { Project } from "@/type/project";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../themedComponents/ThemedText";
import { formatDate } from "date-fns";

export default function ProjectCard(props: { project: Project }) {
  const { project } = props;
  const bgColor = project.validated ? Colors.dark.success : Colors.dark.error;
  const date = formatDate(project.created_at, "dd MM yy");
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.nameContainer}>
          <ThemedText style={{ fontSize: 20 }}>{project.name}</ThemedText>
        </View>
        <View style={styles.markContainer}>
          <ThemedText style={{ fontSize: 30, lineHeight: 0 }}>
            {project.final_mark}
          </ThemedText>
        </View>
      </View>
      <View style={[styles.rightContainer, { borderColor: bgColor }]}>
        <Text style={{ fontSize: 20 }}>{date}</Text>
        <Text style={{ fontSize: 20 }}>
          {project.status.toLocaleUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // borderWidth: 3,
    // borderColor: Colors.dark.primary,
    marginVertical: 10,
    backgroundColor: "#ffffff",
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
    backgroundColor: Colors.dark.primary,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
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
