# React Native Material Motion

`react-native-material-motion` contains the common material design motion implemented using pure Javascript.

## Installation

```bash
yarn add react-native-material-motion
```

or

```bash
npm install react-native-material-motion
```

## Examples

### Fab To Bottom Toolbar Motion

![Fab to Bottom Toolbar](docs/images/fab-to-bottom-toolbar.gif)

```jsx
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FabToBottomToolbar } from 'react-native-material-motion';

const App = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
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
    </View>
  </SafeAreaView>
);
```

### Fab expanding Menu Motion

![Fab expanding Menu](docs/images/fab-expanding-menu.gif)

```jsx
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FabToBottomToolbar } from 'react-native-material-motion';

const App = () => (
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
);
```

<hr />

#### Looking for developers for your project

This project is maintained by Prodios Labs. We specialize in the designing and coding of custom UI for Mobile Apps and Websites.

[![Hire Prodios Labs Team](docs/images/hire.png)](https://prodioslabs.com/contact/)
