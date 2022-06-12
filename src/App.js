import './App.css';
import Done from './Component/Done/Done';
import InProgress from './Component/InProgress/InProgress';
import Searchtask from './Component/Search/Search';
import Todo from './Component/ToDo/Todo';

function App() {
  return (
    <div className="App">
      
      <div className="App-header" onClick={() => window.scroll(0, 0)}>
        <div className='searchbox'>
          <Searchtask/>
        </div>
        <div className='header'>
          <span>To Do</span>
          <span>In Progress</span>
          <span>Done</span>
        </div>
      </div>
      
      <div >
        <div className='split left'>  {/*splitting whole body area in 3 equal panes*/}
          <Todo />
        </div>
        
        <div className='split middle'>
          <InProgress />
        </div>
        
        <div className='split right'>
          <Done />
        </div>
      </div>
    </div>
  );
}

export default App;
