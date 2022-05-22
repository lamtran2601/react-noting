import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import NoteDetailsContainer from "pages/NoteDetailsContainer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/note/:id" element={<NoteDetailsContainer />} />
        </Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;