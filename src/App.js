import React from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  async function handleLikeRepository(id) {
    const repositoryLiked = repositories.find(repository => repository.id === id);
    repositoryLiked.likes++; 
    setRepositories([... repositories.filter(repository => repository.id !== id), repositoryLiked]);
  }

  const [repositories, setRepositories] = React.useState([]);
  React.useEffect(() => {
    api.get("/repositories").then(({ data }) => setRepositories(data));
  }, []);

  const renderItem = (repository) => {
    return (
      <>
        <Text style={styles.repository}>{repository.title}</Text>
        <View style={styles.techsContainer}>
          {repository.techs?.map((tech) => (
            <Text key={tech} style={styles.tech}>{tech}</Text>
          ))}
        </View>
        <View style={styles.likesContainer}>
          <Text
            style={styles.likeText}
            testID={`repository-likes-${repository.id}`}
          >
            {repository.likes} curtidas
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLikeRepository(repository.id)}
          testID={`like-button-${repository.id}`}
        >
          <Text style={styles.buttonText}>Curtir</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          renderItem={({ item: repository }) => renderItem(repository)}
          keyExtractor={(item) => item.id}
          style={styles.repositoryContainer}
        ></FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
