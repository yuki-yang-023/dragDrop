
import styled from 'styled-components'
import { DropDownList } from './components/DropdownList';
import { Header } from './components/Header';

const S = {
  AppContainer: styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 20px;
  `
}

function App() {
  return (
    <S.AppContainer className="App">
      <Header></Header>
      <DropDownList></DropDownList>
    </S.AppContainer>
  );
}

export default App;
