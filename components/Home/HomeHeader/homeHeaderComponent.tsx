import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/context/authContext";
import { ImageBackground } from "expo-image";
import { Image, StyleSheet, View } from "react-native";

export default function HomeHeaderComponent() {
  const { me } = useSession();

  return (
    <ThemedView style={styles.headerContainer}>
      <ImageBackground
        style={styles.backgroundImg}
        source={{
          uri: me?.userCoalition.cover_url,
        }}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/42_logo_white.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.details}>
        <ThemedText type="title">{me?.userCampus.name}</ThemedText>
        <View>
          <ThemedText>{me?.userCampus.address}</ThemedText>
          <ThemedText>{me?.userCampus.city}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 250,
    flexDirection: "row",
  },
  backgroundImg: {
    flex: 1,
    width: "100%",
    height: 330,
    position: "absolute",
    top: -80,
    left: 0,
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  logo: {
    width: 150,
    height: 150,
  },
  details: {
    flex: 2,
    justifyContent: "center",
    height: 250,
    // backgroundColor: Colors.dark.error
    paddingLeft: 20,
    gap: 20,
  },
});
