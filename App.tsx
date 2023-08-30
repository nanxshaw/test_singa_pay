import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './apps/Navigation/AppNavigator';
import { persistor, store } from './apps/Redux/store/store';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
    //   </PersistGate>
    // </Provider>
  );
}

export default App;
