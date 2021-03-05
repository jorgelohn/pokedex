import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import {darken} from 'polished';
import {api} from '../../services/api';
import {Carregando} from '../../components';
import PokemonUtil from '../../helper/util';
import {Image} from 'react-native-elements';
//import {Icon} from 'react-native-vector-icons/Feather';

const Container = styled.View`
  height: 300px;
  background: ${(props) => props.color};
  padding: 10px 20px;
`;

const ContainerType = styled.View`
  background: ${(props) => darken(0.1, props.color)};
  padding: 0 8px;
  margin: 0 8px 8px 0;
  align-self: flex-start;
`;

const Header = styled.View`
  height: 40px;
  background: ${(props) => props.color};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 10px 20px;
`;

export default function Pokemon({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const [color, setColor] = useState('#ccc');
  const {name} = route.params;

  useEffect(() => {
    api
      .get(`/${name}`)
      .then((response) => {
        setPokemon(response.data);
        setColor(PokemonUtil.getColor(response.data.types));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [name]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header color={color}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Text style={styles.voltar}>Voltar</Text>
          </TouchableWithoutFeedback>
        </Header>
      ),
    });
  }, [navigation, color]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Carregando backgroundColor="#fff" color="#000" />
      </View>
    );
  }

  function renderType(types, color) {
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
  }

  const renderStat = (stats) => {
    if (stats && stats.length > 0) {
      return stats.map((stat, index) => {
        return (
          <View key={index} style={styles.containerCaracteristica}>
            <Text style={styles.label}>{stat.stat.name}</Text>
            <Text style={styles.value}>{stat.base_stat}</Text>
          </View>
        );
      });
    }

    return false;
  };

  function getAbilities(abilities) {
    if (abilities && abilities.length > 0) {
      return abilities.reduce(
        (str, ability) => str + (str && ', ') + ability.ability.name,
        '',
      );
    }

    return false;
  }

  const {id} = pokemon;
  return (
    <SafeAreaView style={styles.container}>
      <Container color={color}>
        <View style={styles.info}>
          <Text style={styles.name}>
            {PokemonUtil.capitalizeFirstLetter(name)}
          </Text>
          <Text style={styles.id}>#{('0000' + id).slice(-4)}</Text>
        </View>
        <View style={styles.containerType}>
          {renderType(pokemon.types, color)}
        </View>
        <View style={styles.containerImage}>
          <Image
            style={styles.image}
            containerStyle={styles.containerImage}
            placeholderStyle={styles.containerImage}
            source={{
              uri: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      </Container>

      <ScrollView contentContainerStyle={styles.about}>
        <Text style={styles.title}>About</Text>
        <View style={styles.containerCaracteristica}>
          <Text style={styles.label}>Height</Text>
          <Text style={styles.value}>{pokemon.height}</Text>
        </View>
        <View style={styles.containerCaracteristica}>
          <Text style={styles.label}>Weight</Text>
          <Text style={styles.value}>{pokemon.weight}</Text>
        </View>
        <View style={styles.containerCaracteristica}>
          <Text style={styles.label}>Abilities</Text>
          <Text style={styles.value}>{getAbilities(pokemon.abilities)}</Text>
        </View>
        <Text style={styles.title}>Base Stats</Text>
        {renderStat(pokemon.stats)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  id: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    textAlignVertical: 'bottom',
  },
  type: {
    color: '#fff',
    padding: 2,
    fontSize: 16,
  },
  containerType: {
    flexDirection: 'row',
  },
  image: {
    borderRadius: 10,
    width: 250,
    height: 250,
    marginTop: -15,
    marginRight: -15,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  containerImage: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  voltar: {
    color: '#fff',
    fontSize: 16,
  },
  about: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ddd',
    width: 120,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  containerCaracteristica: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
};
