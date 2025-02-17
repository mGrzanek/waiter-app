import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import ModalPage from "./ModalPage";
import { updateTables } from "../../../redux/tablesReducer";

describe("ModalPage component", () => {
    beforeEach(() => {
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
    it("should render without crashing after click on modal button", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <ModalPage action={() => {}} >
                        <i data-testid="remove-btn" className="fa fa-trash"/>
                    </ModalPage>
                </Provider>
            </MemoryRouter>  
        );

        const trashBtn = screen.getByTestId("remove-btn");
        userEvent.click(trashBtn);
        const modalTitle = screen.getByText("Are you sure?");
        const modalContent = screen.getByText("This action will completely remove this table from the app. Are you sure you want to do this?");
        const cancelBtn = screen.getByText("Cancel");
        const acceptBtn = screen.getByText("Accept");

        expect(modalTitle).toBeInTheDocument();
        expect(modalContent).toBeInTheDocument();
        expect(cancelBtn).toBeInTheDocument();
        expect(acceptBtn).toBeInTheDocument();
    });
    it("should run action callback after click on 'Accept' button", () => {
        const action = jest.fn();
        render(
           <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                <ModalPage action={action} >
                    <i data-testid="remove-btn" className="fa fa-trash"/>
                </ModalPage>
                </Provider>
           </MemoryRouter>  
        );

        const trashBtn = screen.getByTestId("remove-btn");
        userEvent.click(trashBtn);
        const acceptBtn = screen.getByText("Accept");
        userEvent.click(acceptBtn);
        expect(action).toHaveBeenCalledTimes(1);
    });
    it("should dissapear after click on 'Cancel' button", async() => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                <ModalPage action={() => {}} >
                    <i data-testid="remove-btn" className="fa fa-trash"/>
                </ModalPage>
                </Provider>
            </MemoryRouter>  
        );
        
        const trashBtn = screen.getByTestId("remove-btn");
        userEvent.click(trashBtn);
        expect(await screen.findByText("Are you sure?")).toBeInTheDocument();
        const cancelBtn = screen.getByText("Cancel");
        userEvent.click(cancelBtn);

        await waitFor(() => {
            expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.queryByText("This action will completely remove this table from the app. Are you sure you want to do this?")).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.queryByText("Accept")).not.toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
        });
    });
});