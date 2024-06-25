import HomeHeaderComponent from "@/components/Home/HomeHeader/homeHeaderComponent";
import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Tabs } from "./profile";
import { useSession } from "@/context/authContext";
import CustomTabBar from "@/components/utils/customTabBar";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import EventsComponent from "@/components/Home/events/eventsComponent";
import MyEventsComponent from "@/components/Home/events/myEventsComponent";
import Loading from "@/utils/loading";

export type HomeTabs = "events" | "myEvents";

export default function Home() {
  const { me } = useSession();
  const [type, setType] = useState<HomeTabs | Tabs>("events");
  const labels: HomeTabs[] = ["events", "myEvents"];

  if (!me) {
    return <Loading />;
  }

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart((event) => {
      if (event.translationX < -10 && type === "events") setType("myEvents");
      if (type === "myEvents" && event.translationX > 10) setType("events");
    })
    .runOnJS(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeHeaderComponent />
      <ImageBackground
        source={{
          uri: "https://play-lh.googleusercontent.com/R7908CY0RwHLy9zBRvK5iYfRPZdSlhOPOyAqwPd9cCYICrvU809bRhqDz28qRpteqCM",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <CustomTabBar
          contentType={type}
          setContentType={setType}
          activeColor={me?.userCoalition.dark_color}
          labels={labels}
        />
        <GestureDetector gesture={pan}>
          <View style={{ flex: 1 }}>
            {type === "events" && <EventsComponent />}
            {type === "myEvents" && <MyEventsComponent />}
          </View>
        </GestureDetector>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
