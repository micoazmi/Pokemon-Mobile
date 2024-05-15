import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

const DetailScreen = ({route}) => {
  const {pokemon} = route.params;
  const [detailPokemon, setDetailPokemon] = useState(null);
  const [abilityDescription, setAbilityDescription] = useState('');
  const [abilityDescription2, setAbilityDescription2] = useState('');
  const [abilityDescription3, setAbilityDescription3] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const {data} = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        );
        setDetailPokemon(data);

        if (data.abilities.length > 0) {
          fetchAbilityDescription(data.abilities[0].ability.url);
          if (data.abilities.length > 1) {
            fetchAbilityDescription2(data.abilities[1].ability.url);
          }
          if (data.abilities.length >= 3) {
            fetchAbilityDescription3(data.abilities[2].ability.url);
          }
        }
      } catch (error) {
        console.error('Failed to fetch pokemon details:', error);
      }
    };

    const fetchAbilityDescription = async url => {
      try {
        const {data} = await axios.get(url);
        const effectEntry = data.effect_entries.find(
          entry => entry.language.name === 'en',
        );
        if (effectEntry) {
          setAbilityDescription(effectEntry.effect);
        }
      } catch (error) {
        console.error('Failed to fetch ability details:', error);
      }
    };
    const fetchAbilityDescription2 = async url => {
      try {
        const {data} = await axios.get(url);
        const effectEntry = data.effect_entries.find(
          entry => entry.language.name === 'en',
        );
        if (effectEntry) {
          setAbilityDescription2(effectEntry.effect);
        }
      } catch (error) {
        console.error('Failed to fetch ability details:', error);
      }
    };
    const fetchAbilityDescription3 = async url => {
      try {
        const {data} = await axios.get(url);
        const effectEntry = data.effect_entries.find(
          entry => entry.language.name === 'en',
        );
        if (effectEntry) {
          setAbilityDescription3(effectEntry.effect);
        }
      } catch (error) {
        console.error('Failed to fetch ability details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.name]);

  if (!detailPokemon) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Image source={{uri: pokemon.imageUrl}} style={styles.image} />
        <Text style={styles.normal}>Height: {detailPokemon.height}</Text>
        <Text style={styles.normal}>Weight: {detailPokemon.weight}</Text>
        <Text style={styles.normal}>
          Type: {detailPokemon.types.map(type => type.type.name).join(', ')}
        </Text>
        <Text style={styles.normal}>
          Abilities:{' '}
          {detailPokemon.abilities
            .map(ability => ability.ability.name)
            .join(', ')}
        </Text>
        <Text style={styles.description}>
          Ability 1 Description: {abilityDescription}
        </Text>
        {abilityDescription2 ? (
          <Text style={styles.description}>
            Ability 2 Description: {abilityDescription2}
          </Text>
        ) : (
          ''
        )}
        {abilityDescription3 ? (
          <Text style={styles.description}>
            Ability 3 Description: {abilityDescription3}
          </Text>
        ) : (
          ''
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set background to white
  },
  content: {
    alignItems: 'center', // Center content horizontally
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Center-align text
  },
  normal: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center', // Center-align text
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center', // Center-align text
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default DetailScreen;
