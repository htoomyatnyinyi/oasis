import { useGetPostsQuery } from "@/services/api/apiSlice";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const Posts = () => {
  // Automatically handles fetching, loading, error, and caching
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
        <Text>Error fetching posts: {error.status}</Text>
      </View>
    );
  }

  return (
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
  );
};

export default Posts;
