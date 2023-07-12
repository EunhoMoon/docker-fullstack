import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios
      .get('/api/values')
      .then((res) => {
        console.log(res);
        setLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post('/api/values', { value: value })
      .then((res) => {
        if (res.data.success) {
          console.log('res.data', res.data);
          setLists((prev) => [...prev, res.data]);
          setValue('');
        } else {
          alert('실패하였습니다.');
        }
      })
      .catch((err) => {
        alert('실패하였습니다.');
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists &&
            lists.map((list, index) => {
              return <li key={index}>{list.value}</li>;
            })}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
