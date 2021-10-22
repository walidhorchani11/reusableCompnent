import './App.scss';
import Select from './components/select/Select';

function App() {
  return (
    <div className="App">
      <div style={{ width: '200px', height: '40px' }}>
        <Select
          label="colors"
          onSelect={(option, index) =>
            alert(
              `hello you choose a color :${option.label} with indx : ${index}`
            )
          }
          options={[
            { label: 'red color' },
            { label: 'green color' },
            { label: 'yellow color' },
            { label: 'blue color' },
          ]}
          renderOption={() => <p>hello other side !</p>}
        />
      </div>
    </div>
  );
}

export default App;
