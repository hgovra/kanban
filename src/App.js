import { Provider, useSelector } from "react-redux";

import store from "./store";

import { Reset } from "styled-reset";
import GlobalStyle from "./themes/globalStyles";

import Kanban from './components/Kanban';

const App = () => {
  //const { tarefas } = useSelector((state) => state.tarefas);

  return (
    <Provider store={store}>
      <Reset />
      <GlobalStyle />

      <Kanban />
    </Provider>
  );
}

export default App;
