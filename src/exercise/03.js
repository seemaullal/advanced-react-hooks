// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import React from 'react';

const CountContext = React.createContext();

function useCount() {
  const context = React.useContext(CountContext);
  let count, setCount;
  if (!context) {
    throw new Error(
      'useCount must be used inside of a component nested under a CountContext.Provider',
    );
  } else {
    [count, setCount] = context;
  }
  return [count, setCount];
}

function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  return <CountContext.Provider value={[count, setCount]} {...props} />;
}

function CountDisplay() {
  const [count] = useCount();
  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  const [, setCount] = useCount();
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}

export default App;
