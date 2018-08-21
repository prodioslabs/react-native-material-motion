import React from 'react';
import {
  StyleSheet, SafeAreaView, View, StatusBar, TouchableOpacity,
} from 'react-native';
import { createDrawerNavigator, withNavigation } from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FabToBottomToolbar, FabExpandingMenu } from 'react-native-material-motion';

const Toolbar = withNavigation(({ navigation }) => (
  <View style={styles.toolbar}>
    <TouchableOpacity
      onPress={() => {
        navigation.openDrawer();
      }}
    >
      <MaterialIcons name="menu" size={24} color="#FAAB1A" />
    </TouchableOpacity>
  </View>
));

const FabToBottomToolbarScreen = () => (
  <React.Fragment>
    <Toolbar />
    <FabToBottomToolbar
      fabIcon={<MaterialIcons name="share" />}
      renderItems={({ hideToolbar }) => [
        {
          icon: <MaterialIcons name="email" />,
          onPress: () => {
            hideToolbar();
            alert('Sending email');
          },
        },
        {
          icon: <MaterialIcons name="content-copy" />,
          onPress: () => {
            hideToolbar();
            alert('Link copied');
          },
        },
        {
          icon: <MaterialCommunityIcons name="google-plus" />,
          onPress: () => {
            hideToolbar();
            alert('Sharing on Google Plus');
          },
        },
        {
          icon: <MaterialCommunityIcons name="facebook" />,
          onPress: () => {
            hideToolbar();
            alert('Sharing on Facebook');
          },
        },
        {
          icon: <MaterialCommunityIcons name="twitter" />,
          onPress: () => {
            hideToolbar();
            alert('Sharing on Twitter');
          },
        },
      ]}
    />
  </React.Fragment>
);

const FabExpandingMenuScreen = () => (
  <React.Fragment>
    <Toolbar />
    <FabExpandingMenu
      fabIcon={<MaterialIcons name="menu" />}
      fabIconMenuExpanded={<MaterialIcons name="close" />}
      renderItems={({ hideMenu }) => [
        {
          name: 'Add update',
          icon: <MaterialIcons name="create" />,
          onPress: () => {
            hideMenu();
          },
        },
        {
          name: 'Add attachment',
          icon: <MaterialIcons name="attach-file" />,
          onPress: () => {
            hideMenu();
          },
        },
        {
          name: 'Add checklist',
          icon: <MaterialIcons name="list" />,
          onPress: () => {
            hideMenu();
          },
        },
      ]}
      rotate
    />
  </React.Fragment>
);

const Navigator = createDrawerNavigator(
  {
    FabToBottomToolbarScreen: {
      screen: FabToBottomToolbarScreen,
      navigationOptions: {
        drawerLabel: 'Fab to Bottom Toolbar',
      },
    },
    FabExpandingMenuScreen: {
      screen: FabExpandingMenuScreen,
      navigationOptions: {
        drawerLabel: 'Fab expanding menu',
      },
    },
  },
  {
    drawerPosition: 'left',
    drawerBackgroundColor: '#182024',
    contentOptions: {
      labelStyle: {
        color: '#FAAB1A',
      },
    },
  },
);

const App = () => (
  <SafeAreaView style={styles.wrapper}>
    <StatusBar barStyle="light-content" backgroundColor="#1D272B" />
    <View style={styles.container}>
      <Navigator />
    </View>
  </SafeAreaView>
);

export default App;

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    padding: 16,
    backgroundColor: '#1D272B',
    elevation: 4,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#1D272B',
  },
  container: {
    flex: 1,
    backgroundColor: '#232F34',
  },
});
