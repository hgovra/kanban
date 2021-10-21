import { Provider } from "react-redux";

import store from "./store";

import { Reset } from "styled-reset";
import GlobalStyle from "./themes/globalStyles";

import Kanban from './components/Kanban';

const App = () => {
  return (
    <Provider store={store}>
      <Reset />
      <GlobalStyle />

      <Kanban />
    </Provider>
  );
}

export default App;
