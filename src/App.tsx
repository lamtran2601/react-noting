import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import { NoteDetailsContainer } from 'features/Note';
import { message } from 'antd';

message.config({
  duration: 1,
});

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/note/:id" element={<NoteDetailsContainer />} />
      </Route>
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  </div>
);

export default App;
