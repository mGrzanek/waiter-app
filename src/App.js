import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTables } from "./redux/tablesReducer";
import { fetchStatus } from "./redux/statusReducer";
import Header from "./components/views/Header/Header";
import Home from "./components/pages/Home/Home";
import AddTable from "./components/pages/AddTable/AddTable";
import Table from "./components/pages/Table/Table";
import NotFound from "./components/pages/NotFound/NotFound";
import Footer from "./components/views/Footer/Footer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatus()), [dispatch]);
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<Table />} />
        <Route path="/table/add" element={<AddTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
