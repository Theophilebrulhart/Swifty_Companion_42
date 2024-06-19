import { FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type ListProps = {
  data: any;
  renderItem: any;
};

export default function List({ data, renderItem }: ListProps) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      // extraData={selectedId}
    />
  );
}
