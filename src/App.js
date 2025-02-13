import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router";
import Home from "./components/pages/Home/Home";
import Table from "./components/pages/Table/Table";
import NotFound from "./components/pages/NotFound/NotFound";

const App = () => {
  return (
    <Container>
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
