import { Reset } from "styled-reset";
import GlobalStyle from "./themes/globalStyles";

import Kanban from './components/Kanban'

const App = () => {
  return (
    <>
      <Reset />
      <GlobalStyle />

      <Kanban />
    </>
  );
}

export default App;
