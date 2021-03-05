import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {darken, lighten} from 'polished';
import {api} from '../services/api';
import PokemonUtil from '../helper/util';

const Container = styled.View`
  flex: 1;
  height: 100px;
  min-height: 100px;
  background: ${(props) => props.color};
  border-radius: 10px;
  padding: 10px 10px 0 10px;
  margin-bottom: 20px;
`;

const ContainerImage = styled.View`
  background: ${(props) => lighten(0.1, props.color)};
  width: 120px;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
`;

const ContainerType = styled.View`
  background: ${(props) => darken(0.1, props.color)};
  border-radius: 5px;
  padding: 0 5px;
  margin-bottom: 5px;
  align-self: flex-start;
`;

export default function Pokemon(props) {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const {name} = props.pokemon;

  const navigation = useNavigation();

  useEffect(() => {
    api
      .get(`/${name}`)
      .then((response) => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderType = (types, color) => {
    if (types && types.length > 0) {
      return types.map((type, index) => {
        return (
          <ContainerType key={index} color={color}>
            <Text style={styles.type}>{type.type.name}</Text>
          </ContainerType>
        );
      });
    }

    return false;
  };

  function handleNavigateToPokemon() {
    navigation.navigate('Pokemon', {
      name,
    });
  }

  const {front_default} = pokemon.sprites || {};
  const color = PokemonUtil.getColor(pokemon.types);

  return (
    <View style={styles.grpMain}>
      <TouchableWithoutFeedback onPress={handleNavigateToPokemon}>
        <Container color={color}>
          <View style={styles.column}>
            <View>
              <Text style={styles.name}>
                {PokemonUtil.capitalizeFirstLetter(pokemon.name)}
              </Text>
              {renderType(pokemon.types, color)}
            </View>
            <View style={styles.grpImage}>
              <Text style={styles.id}>#{('0000' + pokemon.id).slice(-4)}</Text>
              <ContainerImage color={color}>
                <Image
                  style={styles.image}
                  containerStyle={styles.containerImage}
                  placeholderStyle={styles.containerImage}
                  source={{uri: front_default}}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </ContainerImage>
            </View>
          </View>
        </Container>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = {
  grpMain: {
    height: 120,
  },
  grpImage: {
    overflow: 'hidden',
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerImage: {
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  image: {
    borderRadius: 10,
    width: 120,
    height: 120,
    marginTop: -15,
    marginRight: -15,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  id: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 5,
    zIndex: 2,
  },
  type: {
    color: '#fff',
    padding: 2,
  },
};
