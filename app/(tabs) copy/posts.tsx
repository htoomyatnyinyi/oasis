import { useGetPostsQuery } from "@/services/api/apiSlice";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Posts = () => {
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPostsQuery(null);
  console.log(isFetching, "check");

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading posts...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error fetching posts</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="dark:text-shadow-yellow-300 p-2 m-1  border text-green-500">
            <Text className="text-green-300">{item.title}</Text>
            <Text>{item.body.substring(0, 100)}...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Posts;
