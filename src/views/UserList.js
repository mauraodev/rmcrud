import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import users from '../data/users';

export default (props) => {
  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          console.warm('delete' + user.id);
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  function getActions(user) {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />

        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="trash" size={25} color="red" />}
        />
      </>
    );
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm', user)}>
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          <View>{getActions(user)}</View>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={users}
        renderItem={getUserItem}
      />
    </View>
  );
};
