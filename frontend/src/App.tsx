import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sender" element={<Sender />} />
        <Route path="/reciever" element={<Reciever />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
