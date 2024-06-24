import { UserProfile } from "@/type/user";
import { Image, StyleSheet, View } from "react-native";
import DetailsCard from "./detailsCard";
import LevelBar from "./levelBar";
import { Coalition } from "@/type/coalition";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import Avatar from "@/components/utils/Avatar";

export default function HeaderComponent(props: {
  userProfile: UserProfile;
  userCoalition: Coalition;
}) {
  const { userProfile, userCoalition } = props;
  return (
    <ThemedView style={styles.headerContainer}>
      <View style={styles.userDetails}>
        <Image
          style={styles.backgroundImg}
          source={{
            uri: userCoalition.cover_url,
          }}
        />
        <View style={styles.avatarContainer}>
          <Avatar
            img={userProfile.image}
            size={120}
            borderWidth={3}
            borderColor={userCoalition.light_color}
          />
        </View>
        <View style={styles.infosContainer}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <ThemedText style={{ fontSize: 20 }}>
              {userCoalition.name}
            </ThemedText>
          </View>
          <DetailsCard user={userProfile} />
        </View>
      </View>
      <LevelBar level={userProfile.level} coal={userCoalition} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    height: 330,
    position: "absolute",
    top: -80,
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
    justifyContent: "center",
    alignItems: "center",
  },
  infosContainer: {
    flex: 3,
    gap: 10,
    padding: 20,
  },
});
