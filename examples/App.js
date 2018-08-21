import React from 'react';
import {
  StyleSheet, SafeAreaView, View, StatusBar, TouchableOpacity,
} from 'react-native';
import { createDrawerNavigator, withNavigation } from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FabToBottomToolbar } from 'react-native-material-motion';

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

const Navigator = createDrawerNavigator(
  {
    FabToBottomToolbarScreen: {
      screen: FabToBottomToolbarScreen,
      navigationOptions: {
        drawerLabel: 'Fab to Bottom Toolbar',
      },
    },
  },
  {
    drawerPosition: 'left',
    drawerBackgroundColor: '#5F676B',
    contentOptions: {
      labelStyle: {
        color: '#FAAB1A',
      },
    },
  },
);

const App = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />
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
  container: {
    flex: 1,
    backgroundColor: '#232F34',
    position: 'relative',
  },
});
