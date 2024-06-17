import { Image, ImageURISource, StyleSheet } from "react-native";
import { ThemedView } from "../themedComponents/ThemedView";
import { Colors } from "@/constants/Colors";

type AvatarProps = {
  img: string;
  style?: any;
  size?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
};

export default function Avatar({
  img,
  style,
  size = 110,
  borderRadius = 100,
  borderWidth = 2,
  borderColor = Colors.dark.background,
}: AvatarProps) {
  return (
    <ThemedView
      style={[
        styles.avatarContainer,
        {
          height: size,
          width: size,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: borderColor,
          ...style,
        },
      ]}
    >
      <Image
        source={{ uri: img }}
        style={[styles.img, { borderRadius: borderRadius }]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "#ffffff",
  },
  img: {
    flex: 1,
    objectFit: "cover",
  },
});
