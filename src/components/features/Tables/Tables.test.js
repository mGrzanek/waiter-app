import { render , screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./../../../redux/store";
import { updateTables } from "../../../redux/tablesReducer";
import Tables from "./Tables";

describe("Tables component", () => {
    it("should render without crashing if tables data exist", async() => {
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
        render(         
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <Tables />
                </Provider>               
            </MemoryRouter>
        );

        const tablesTestId = await screen.findByTestId("tables-section");
        expect(tablesTestId).toBeInTheDocument();
        
    });
    it("should render Loader component if tables data not exist", () => {
        store.dispatch(updateTables([]));
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <Tables />
                </Provider>               
            </MemoryRouter>
        );

        const loaderContent = screen.getByText("Loading...");
        const tablesTestId = screen.queryByTestId("tables-section");
        expect(loaderContent).toBeInTheDocument();
        expect(tablesTestId).toBeNull();
    });
    it("should hide Loader component if tables data exist", async() => {
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
        render(         
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <Tables />
                </Provider>               
            </MemoryRouter>
        );

        await screen.findByTestId("tables-section");
        const loader = screen.queryByText("Loading...");
        expect(loader).not.toBeInTheDocument();
        
    });
});