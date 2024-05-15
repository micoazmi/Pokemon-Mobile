import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonData = response.data.results;
        const detailedPokemonData = await Promise.all(
          pokemonData.map(pokemon => fetchPokemonDetails(pokemon.url)),
        );
        setPokemonList(detailedPokemonData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPokemonDetails = async url => {
      const response = await axios.get(url);
      return {
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
      };
    };

    fetchPokemonList();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={pokemonList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('DetailScreen', {pokemon: item})
              }>
              {item.imageUrl && (
                <Image
                  source={{uri: item.imageUrl}}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
              <Text style={styles.cardTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    alignItems: 'center', // Center the contents of the card
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default HomeScreen;
