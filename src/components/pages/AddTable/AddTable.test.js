import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { Provider } from "react-redux";
import store from "./../../../redux/store";
import { MemoryRouter, Routes, Route } from "react-router";
import AddTable from "./AddTable";

describe("AddTable component", () => {
    it("should render without crashing", () => {
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <Routes>
                        <Route path="/table/add" element={<AddTable />} />
                    </Routes>
                </Provider>
            </MemoryRouter>
        );

        const addTableTestId = screen.getByTestId("add-table-section");
        expect(addTableTestId).toBeInTheDocument();
        expect(addTableTestId).toHaveTextContent("Add Table");
        expect(addTableTestId).toHaveTextContent("Add");
    });
});