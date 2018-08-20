import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FabToBottomToolbar } from 'react-native-material-motion';

const App = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <FabToBottomToolbar
        fabIcon={<MaterialIcons name="share" />}
        toolbarItems={[
          {
            icon: <MaterialIcons name="email" />,
            onPress: () => {
              alert('Sending email');
            },
          },
          {
            icon: <MaterialIcons name="content-copy" />,
            onPress: () => {
              alert('Link copied');
            },
          },
          {
            icon: <MaterialCommunityIcons name="google-plus" />,
            onPress: () => {
              alert('Sharing on Google Plus');
            },
          },
          {
            icon: <MaterialCommunityIcons name="facebook" />,
            onPress: () => {
              alert('Sharing on Facebook');
            },
          },
          {
            icon: <MaterialCommunityIcons name="twitter" />,
            onPress: () => {
              alert('Sharing on Twitter');
            },
          },
        ]}
      />
    </View>
  </SafeAreaView>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
});
