import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, StatusBar} from 'react-native';
import {api} from '../../services/api';
import {Carregando, Pokemon, SemResultado} from '../../components';

import {Container} from './styles';

export default function Home() {
  const [firstQuery, setFirstQuery] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    let url = `?limit=20&offset=${page * 20}`;

    api
      .get(url)
      .then(({data}) => {
        setItems((prevState) => [...prevState, ...data.results]);
        setHasMore(data.next !== '');

        setLoading(false);

        setFirstQuery(false);
      })
      .catch((error) => {
        setLoading(false);
        setFirstQuery(false);
        setHasMore(false);
        setItems([]);
      });
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1);
    }
  };

  const _keyExtractor = (item, index) => 'i' + item.name;
  const _renderItem = ({item}) => {
    return <Pokemon pokemon={item} />;
  };

  const _renderFooter = () => {
    if (firstQuery || !hasMore) {
      return false;
    }

    return (
      <View style={styles.listLoading}>
        <ActivityIndicator animating size="large" color="#ddd" />
      </View>
    );
  };

  if (firstQuery) {
    return (
      <View style={styles.container}>
        <Carregando backgroundColor="#fff" color="#000" />
      </View>
    );
  }

  return (
    <Container style={styles.safeContainer}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <FlatList
        data={items}
        renderItem={_renderItem}
        contentContainerStyle={styles.list}
        keyExtractor={_keyExtractor}
        ListEmptyComponent={!firstQuery && <SemResultado color="#000" />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={!firstQuery && _renderFooter()}
        onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={0.4}
      />
    </Container>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  listLoading: {
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
};
