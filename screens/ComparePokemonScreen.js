import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const ComparePokemonScreen = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [leftPokemon, setLeftPokemon] = useState(null);
  const [rightPokemon, setRightPokemon] = useState(null);
  const [leftPokemonData, setLeftPokemonData] = useState(null);
  const [rightPokemonData, setRightPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.results.map((pokemon, index) => ({
          label: pokemon.name,
          value: pokemon.url,
        }));
        setPokemonList(formattedData);
      });
  }, []);

  useEffect(() => {
    if (leftPokemon) {
      setLoading(true);
      fetch(leftPokemon)
        .then(response => response.json())
        .then(data => {
          setLeftPokemonData(data);
          setLoading(false);
        });
    }
  }, [leftPokemon]);

  useEffect(() => {
    if (rightPokemon) {
      setLoading(true);
      fetch(rightPokemon)
        .then(response => response.json())
        .then(data => {
          setRightPokemonData(data);
          setLoading(false);
        });
    }
  }, [rightPokemon]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={value => setLeftPokemon(value)}
          items={pokemonList}
          placeholder={{label: 'Select Left Pokemon', value: null}}
        />
      </View>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={value => setRightPokemon(value)}
          items={pokemonList}
          placeholder={{label: 'Select Right Pokemon', value: null}}
        />
      </View>
      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <View style={styles.card}>
              {leftPokemonData && (
                <>
                  <Image
                    style={styles.image}
                    source={{uri: leftPokemonData.sprites.front_default}}
                  />
                  <Text style={styles.name}>{leftPokemonData.name}</Text>
                  <Text style={styles.details}>
                    Height: {leftPokemonData.height}
                  </Text>
                  <Text style={styles.details}>
                    Weight: {leftPokemonData.weight}
                  </Text>
                </>
              )}
            </View>
            <View style={styles.card}>
              {rightPokemonData && (
                <>
                  <Image
                    style={styles.image}
                    source={{uri: rightPokemonData.sprites.front_default}}
                  />
                  <Text style={styles.name}>{rightPokemonData.name}</Text>
                  <Text style={styles.details}>
                    Height: {rightPokemonData.height}
                  </Text>
                  <Text style={styles.details}>
                    Weight: {rightPokemonData.weight}
                  </Text>
                </>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default ComparePokemonScreen;
