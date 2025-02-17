import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import { updateTables } from "../../../redux/tablesReducer";
import { MemoryRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import TableListItem from "./TableListItem";
import Table from "../../pages/Table/Table";

describe("TableListItem component", () => {
    beforeAll(() => {
        store.dispatch(updateTables([
            {
                "id": "1",
                "number": 1,
                "status": "Free",
                "peopleAmount": 0,
                "maxPeopleAmount": 5,
                "bill": 0
            }
        ]));
    });
    it("should render without crashing", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <TableListItem id="1" number={1} status="Free" />
                </Provider>
            </MemoryRouter>
        );
        
        const tableNumber = screen.getByText("Table 1");
        const tableStatus = screen.getByText("Free");
        const removeBtn = screen.getByTestId("remove-btn");
        const showBtn = screen.getByText("Show more");

        expect(tableNumber).toBeInTheDocument();
        expect(tableStatus).toBeInTheDocument();
        expect(removeBtn).toBeInTheDocument();
        expect(showBtn).toBeInTheDocument();
    });
    it("should render Table page after click on 'Show more' button", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <TableListItem id="1" number={1} status="Free" />
                    <Routes>
                        <Route path="/table/:id" element={<Table />} />
                    </Routes>
                </Provider>
            </MemoryRouter>
        );

        const showBtn = screen.getByText("Show more");
        userEvent.click(showBtn);
        const tablePage = screen.getByTestId("section-table");

        expect(window.location.pathname).toBe("/table/1");
        expect(tablePage).toBeInTheDocument();
    });
    it("should render ModalPage after click on trash icon", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <TableListItem id="1" number={1} status="Free" />
                </Provider>
            </MemoryRouter>
        );

        const removeBtn = screen.getByTestId("remove-btn");
        userEvent.click(removeBtn);
        const modalTitle = screen.getByText("Are you sure?");
        const modalContent = screen.getByText("This action will completely remove this table from the app. Are you sure you want to do this?");
        const cancelBtn = screen.getByText("Cancel");
        const acceptBtn = screen.getByText("Accept");

        expect(modalTitle).toBeInTheDocument();
        expect(modalContent).toBeInTheDocument();
        expect(cancelBtn).toBeInTheDocument();
        expect(acceptBtn).toBeInTheDocument();
    });
});