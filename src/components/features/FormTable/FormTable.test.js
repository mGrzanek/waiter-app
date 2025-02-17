import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import { updateTables } from "../../../redux/tablesReducer";
import { updateStatus } from "../../../redux/statusReducer";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./../../../redux/store";
import FormTable from "./FormTable";

describe("FormTable component", () => {
    beforeEach(() => {
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
        store.dispatch(updateStatus([
            {
                "id": "free",
                "name": "Free"
              },
              {
                "id": "reserved",
                "name": "Reserved"
              },
              {
                "id": "busy",
                "name": "Busy"
              },
              {
                "id": "cleaning",
                "name": "Cleaning"
              }
        ]));
    });
    it("should render form to add table without crashing", () => {
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <FormTable txtBtn="Add" action={() => {}}/>
                </Provider>
            </MemoryRouter>
        );

        const numberLabel = screen.getByLabelText("Number:");
        const statusLabel = screen.getByLabelText("Status:");
        const peopleAmount = screen.getByTestId("people-amount");
        const maxPeopleAmount = screen.getByTestId("max-people-amount");
 
        expect(numberLabel.value).toBe("");
        expect(statusLabel.value).toBe("default");
        expect(parseInt(peopleAmount.value)).toBe(0);
        expect(parseInt(maxPeopleAmount.value)).toBe(0);
        expect(screen.queryByLabelText("Bill:")).not.toBeInTheDocument();

        userEvent.selectOptions(statusLabel, "Busy");
        const billLabel = screen.getByLabelText("Bill:");
        expect(parseInt(billLabel.value)).toBe(0);

    });

    it("should display bill input when status is 'Busy' or 'Reserved' in form to add table", () => {
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <FormTable txtBtn="Add" action={() => {}}/>
                </Provider>
            </MemoryRouter>
        );
        const statusLabel = screen.getByLabelText("Status:");
        expect(statusLabel.value).toBe("default");
        expect(screen.queryByLabelText("Bill:")).not.toBeInTheDocument();

        userEvent.selectOptions(statusLabel, "Busy");
        const billLabel = screen.getByLabelText("Bill:");
        expect(parseInt(billLabel.value)).toBe(0);

        userEvent.selectOptions(statusLabel, "Free");
        expect(billLabel).not.toBeInTheDocument();

        userEvent.selectOptions(statusLabel, "Reserved");
        expect(parseInt(billLabel.value)).toBe(0);

        userEvent.selectOptions(statusLabel, "Cleaning");
        expect(billLabel).not.toBeInTheDocument();
    });
    it("should run action callback with proper data on add table form submit", async() => {
        const action = jest.fn();
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <FormTable txtBtn="Add" action={action}/>
                </Provider>
            </MemoryRouter> 
        );
       const numberLabel = screen.getByLabelText("Number:");
        const statusLabel = screen.getByLabelText("Status:");
        const peopleAmount = screen.getByTestId("people-amount");
        const maxPeopleAmount = screen.getByTestId("max-people-amount");
        const addBtn = screen.getByText("Add");

        await userEvent.type(numberLabel, "10");
        await userEvent.selectOptions(statusLabel, "Busy");
        await userEvent.type(peopleAmount, 2) ;
        await userEvent.type(maxPeopleAmount, 4);
        const billLabel = screen.getByLabelText("Bill:");
        await userEvent.type(billLabel, 20);
        await userEvent.click(addBtn);
        expect(action).toHaveBeenCalledTimes(1);
    });
});