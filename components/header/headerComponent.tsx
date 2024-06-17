import { UserProfile } from "@/type/user";
import { ThemedText } from "../themedComponents/ThemedText";
import { ThemedView } from "../themedComponents/ThemedView";
import { Image, StyleSheet, View } from "react-native";

import Avatar from "../utils/Avatar";
import DetailsCard from "./detailsCard";
import LevelBar from "./levelBar";

export default function HeaderComponent(props: { userProfile: UserProfile }) {
  const user = props.userProfile;
  console.log("user progil : ", user);
  return (
    <ThemedView style={styles.headerContainer}>
      <View style={styles.userDetails}>
        <Image
          style={styles.backgroundImg}
          source={{
            uri: "https://cdn.intra.42.fr/coalition/cover/192/jpeg-back5.jpg",
          }}
        />
        <View style={styles.avatarContainer}>
          <Avatar img={user.image} size={120} borderWidth={5} />
        </View>
        <View style={styles.infosContainer}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <ThemedText style={{ fontSize: 20 }}>HOUSE OF THREADS</ThemedText>
          </View>
          <DetailsCard user={user} />
        </View>
      </View>
      <LevelBar level={user.level} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 300,
    width: "100%",
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
  },
  userDetails: {
    height: 250,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  avatarContainer: {
    flex: 2,
    // backgroundColor: "#91DDCF",
    justifyContent: "center",
    alignItems: "center",
  },
  infosContainer: {
    flex: 3,
    gap: 10,
    // backgroundColor: "#3DC2EC",
    padding: 20,
  },
});
