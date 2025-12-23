import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  // const { data: posts, isLoading: isProductsLoading } = useGetPostsQuery();

  // if (isProductsLoading) return <Text>Loading...</Text>;

  // console.log(posts, "query products");

  const fetchData = async () => {
    try {
      // const response = await fetch(
      //   "https://jsonplaceholder.typicode.com/posts"
      // );
      const response = await fetch("http://192.168.1.118:8080/api/products");
      const { data } = await response.json();
      console.log(data, "fetched data");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/home"}> Home</Link>
      <Text onPress={fetchData} style={{ marginTop: 20, color: "blue" }}>
        Fetch Data
      </Text>
    </View>
  );
}
