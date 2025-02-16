import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { updateTables } from "../../../redux/tablesReducer";
import { MemoryRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import store from "./../../../redux/store";
import Table from "./Table";
import Home from "../Home/Home";


describe("Table component", () => {
    beforeAll(() => {
        store.dispatch(updateTables([
            {
                "id": "1",
                "number": "1",
                "status": "Free",
                "peopleAmount": 0,
                "maxPeopleAmount": 5,
                "bill": 0
            }
        ]));
    });
    it("should return without crashing when good id", () => {
        render(
            <MemoryRouter initialEntries={["/table/1"]}>
                <Provider store={store}>
                    <Routes>
                        <Route path="/table/:id" element={<Table />} />
                    </Routes>
                </Provider>
            </MemoryRouter>   
        );
        
        const tableTestId = screen.getByTestId("section-table");
        expect(tableTestId).toBeInTheDocument();
        expect(tableTestId).toHaveTextContent("Table 1");
        expect(tableTestId).toHaveTextContent("Update");
    });
    it("should render Home page when the table id not exist", () => {
        render(
            <MemoryRouter initialEntries={["/table/invalid-id"]}>
                <Provider store={store}>
                    <Routes>
                        <Route path="/table/:id" element={<Table />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Provider>
            </MemoryRouter>   
        );
        
        const homeTestId = screen.getByTestId("home-section");
        const homeTitle = screen.getByText("All Tables:");
        expect(homeTestId).toBeInTheDocument();
        expect(homeTitle).toBeInTheDocument();
    });
});