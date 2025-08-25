import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import { updateTables } from "../../../redux/tablesReducer";
import { updateStatus } from "../../../redux/statusReducer";
import { MemoryRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import store from "./../../../redux/store";
import FormTable from "./FormTable";
import Home from "./../../pages/Home/Home";

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
            },
            {
                "id": "5",
                "number": "5",
                "status": "Busy",
                "peopleAmount": 2,
                "maxPeopleAmount": 2,
                "bill": 200
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
                    <FormTable txtBtn="Add" action={() => {}} isEditMode={false} />
                </Provider>
            </MemoryRouter>
        );

        const numberLabel = screen.getByLabelText("Number:");
        const statusLabel = screen.getByLabelText("Status:");
        const peopleAmount = screen.getByTestId("people-amount");
        const maxPeopleAmount = screen.getByTestId("max-people-amount");
        const addBtn = screen.getByText("Add");
 
        expect(numberLabel.value).toBe("");
        expect(statusLabel.value).toBe("default");
        expect(parseInt(peopleAmount.value)).toBe(0);
        expect(parseInt(maxPeopleAmount.value)).toBe(0);
        expect(screen.queryByLabelText("Bill:")).not.toBeInTheDocument();

        userEvent.selectOptions(statusLabel, "Busy");
        const billLabel = screen.getByLabelText("Bill:");
        expect(parseInt(billLabel.value)).toBe(0);
        expect(addBtn).toBeInTheDocument();
    });
    it("should render form to edit table without crashing", () => {
        render(
            <MemoryRouter initialEntries={["/table/1"]}>
                <Provider store={store}>
                    <FormTable 
                        txtBtn="Update" 
                        action={() => {}} 
                        isEditMode={true} 
                        id="1"
                        number="1"
                        status="Free"
                        peopleAmount={0}
                        maxPeopleAmount={5}
                        bill={0}
                    />
                </Provider>
            </MemoryRouter>
        );

        const numberLabel = screen.getByLabelText("Number:");
        const statusLabel = screen.getByLabelText("Status:");
        const peopleAmount = screen.getByTestId("people-amount");
        const maxPeopleAmount = screen.getByTestId("max-people-amount");
        const updateBtn = screen.getByText("Update");
 
        expect(numberLabel.value).toBe("1");
        expect(statusLabel.value).toBe("Free");
        expect(parseInt(peopleAmount.value)).toBe(0);
        expect(parseInt(maxPeopleAmount.value)).toBe(5);
        expect(screen.queryByLabelText("Bill:")).not.toBeInTheDocument();
        expect(updateBtn).toBeInTheDocument();
    });
    it("should display bill input when status is 'Busy'", () => {
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <FormTable txtBtn="Submit" action={() => {}}/>
                </Provider>
            </MemoryRouter>
        );
        const statusLabel = screen.getByLabelText("Status:");
        expect(statusLabel.value).toBe("default");
        expect(screen.queryByLabelText("Bill:")).not.toBeInTheDocument();

        userEvent.selectOptions(statusLabel, "Busy");
        const billLabel = screen.getByLabelText("Bill:");
        expect(billLabel).toBeInTheDocument();
        expect(parseInt(billLabel.value)).toBe(0);
        
        userEvent.selectOptions(statusLabel, "Free");
        expect(billLabel).not.toBeInTheDocument();

        userEvent.selectOptions(statusLabel, "Reserved");
        expect(billLabel).not.toBeInTheDocument();

        userEvent.selectOptions(statusLabel, "Cleaning");
        expect(billLabel).not.toBeInTheDocument();
    });
    it("should run action callback with proper data when add table form submit", () => {
        const action = jest.fn();
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <FormTable txtBtn="Add" action={action} isEditMode={false}/>
                </Provider>
            </MemoryRouter> 
        );
        const numberLabel = screen.getByLabelText("Number:");
        const statusLabel = screen.getByLabelText("Status:");
        const peopleAmount = screen.getByTestId("people-amount");
        const maxPeopleAmount = screen.getByTestId("max-people-amount");
        const addBtn = screen.getByText("Add");

        userEvent.type(numberLabel, "2");
        userEvent.selectOptions(statusLabel, "Busy");
        userEvent.clear(maxPeopleAmount);
        userEvent.type(maxPeopleAmount, "4");
        userEvent.clear(peopleAmount);
        userEvent.type(peopleAmount, "2") ; 
        const billLabel = screen.getByLabelText("Bill:");
        userEvent.type(billLabel, "20");
        userEvent.click(addBtn);

        expect(numberLabel.value).toBe("2");
        expect(statusLabel.value).toBe("Busy");
        expect(peopleAmount.value).toBe("2");
        expect(maxPeopleAmount.value).toBe("4");
        expect(billLabel.value.replace(/^0+/, '')).toBe("20");

        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith({
            "number": "2",
            "status": "Busy",
            "peopleAmount": 2,
            "maxPeopleAmount": 4,
            "bill": 20    
        });
    });
    it("should run action callback with proper data when edit table form submit", () => {
        const action = jest.fn();
        render(
            <MemoryRouter initialEntries={["/table/1"]}>
                <Provider store={store}>
                    <FormTable 
                        txtBtn="Update" 
                        action={action}
                        isEditMode={true}
                        id="1"
                        number="1"
                        status="Free"
                        peopleAmount={0}
                        maxPeopleAmount={5}
                        bill={0}
                    />
                </Provider>
            </MemoryRouter> 
        );
        const numberLabel = screen.getByLabelText("Number:");
        const statusLabel = screen.getByLabelText("Status:");
        const peopleAmount = screen.getByTestId("people-amount");
        const maxPeopleAmount = screen.getByTestId("max-people-amount");
        const editBtn = screen.getByText("Update");

        userEvent.selectOptions(statusLabel, "Busy");
        userEvent.clear(maxPeopleAmount);
        userEvent.type(maxPeopleAmount, "4");
        userEvent.clear(peopleAmount);
        userEvent.type(peopleAmount, "2") ; 
        const billLabel = screen.getByLabelText("Bill:");
        userEvent.clear(billLabel);
        userEvent.type(billLabel, "20");
        userEvent.click(editBtn);

        expect(numberLabel.value).toBe("1");
        expect(statusLabel.value).toBe("Busy");
        expect(peopleAmount.value).toBe("2");
        expect(maxPeopleAmount.value).toBe("4");
        expect(billLabel.value.replace(/^0+/, '')).toBe("20");

        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith({
            "number": "1",
            "status": "Busy",
            "peopleAmount": 2,
            "maxPeopleAmount": 4,
            "bill": 20    
        });
    });
    it("should not run action callback on submit when wrong input", () => {
        const action = jest.fn();
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <FormTable txtBtn="Add" action={action} isEditMode={false} />
                </Provider>
            </MemoryRouter> 
        );

        const addBtn = screen.getByText("Add");
        userEvent.click(addBtn);
        expect(action).toHaveBeenCalledTimes(0);
    });
    it("should render warning when selected table number already exist in add form", () => {
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <FormTable txtBtn="Add" action={() => {}}/>
                </Provider>
            </MemoryRouter>
        );

        const numberLabel = screen.getByLabelText("Number:");
        userEvent.type(numberLabel, "1");
        const addBtn = screen.getByText("Add");
        userEvent.click(addBtn);
        const alertNumber = screen.getByText("This number exist");
        expect(alertNumber).toBeInTheDocument();
    });
    it("should render disabled input for table number in edit form", () => {
        render(
            <MemoryRouter initialEntries={["/table/1"]}>
                <Provider store={store}>
                    <FormTable 
                        txtBtn="Update" 
                        action={() => {}}
                        isEditMode={true}
                        id="1"
                        number="1"
                        status="Free"
                        peopleAmount={0}
                        maxPeopleAmount={5}
                        bill={0}
                    />
                </Provider>
            </MemoryRouter> 
        );

        const numberLabel = screen.getByLabelText("Number:");
        expect(numberLabel).toBeDisabled();
    });
    it("should render peopleAmount value equal '0' when status changes to 'Free' or 'Cleaning'", () => {
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <FormTable txtBtn="Add" action={() => {}} isEditMode={false} />
                </Provider>
            </MemoryRouter>
        );

        const statusLabel = screen.getByLabelText("Status:");
        const peopleAmount = screen.getByTestId("people-amount");

        userEvent.type(peopleAmount, "4");
        userEvent.selectOptions(statusLabel, "Free");
        expect(peopleAmount.value).toBe("0");
        userEvent.type(peopleAmount, "4");
        userEvent.selectOptions(statusLabel, "Cleaning");
        expect(peopleAmount.value).toBe("0");
    });
    it("should render a value of max people amount value in range of 0-10", () => {
        render(
            <MemoryRouter initialEntries={["/table/add"]}>
                <Provider store={store}>
                    <FormTable txtBtn="Add" action={() => {}} isEditMode={false}/>
                </Provider>
            </MemoryRouter>
        );
        const maxPeopleAmount = screen.getByTestId("max-people-amount");
        userEvent.clear(maxPeopleAmount);
        userEvent.type(maxPeopleAmount, "5");
        expect(maxPeopleAmount.value).toBe("5");
        userEvent.clear(maxPeopleAmount);
        userEvent.type(maxPeopleAmount, "-5");
        expect(maxPeopleAmount.value).toBe("0");
        userEvent.clear(maxPeopleAmount);
        userEvent.type(maxPeopleAmount, "20");
        expect(maxPeopleAmount.value).toBe("10");
    });
    it("should render people amount value more than or equal to 0 and less than or equal to max people amount value", () => {
        render(
            <MemoryRouter initialEntries={["/table/1"]}>
                <Provider store={store}>
                    <FormTable 
                        txtBtn="Update" 
                        action={() => {}}
                        isEditMode={true}
                        id="1"
                        number="1"
                        status="Free"
                        peopleAmount={0}
                        maxPeopleAmount={5}
                        bill={0}
                    />
                </Provider>
            </MemoryRouter> 
        );

        const peopleAmount = screen.getByTestId("people-amount");
        const maxPeopleAmount = screen.getByTestId("max-people-amount");
        expect(maxPeopleAmount.value).toBe("5");

        userEvent.clear(peopleAmount);
        userEvent.type(peopleAmount, "5");
        expect(peopleAmount.value).toBe("5");

        userEvent.clear(peopleAmount);
        userEvent.type(peopleAmount, "-5");
        expect(peopleAmount.value).toBe("0");

        userEvent.clear(peopleAmount);
        userEvent.type(peopleAmount, "6");
        expect(peopleAmount.value).toBe("5");

        userEvent.clear(maxPeopleAmount);
        expect(peopleAmount.value).toBe("");
    });
});