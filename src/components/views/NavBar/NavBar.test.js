import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "./../../../redux/store";
import { MemoryRouter, Routes, Route } from "react-router";
import NavBar from "./NavBar";
import Home from "./../../pages/Home/Home";
import AddTable from "../../pages/AddTable/AddTable";

describe("NavBar Component", () => {
    it("should render without crashing", () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );
        const navbarId = screen.getByTestId("navbar-section");
        expect(navbarId).toBeInTheDocument();
    });
    it("should render Home page after click on brand link", () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const brandLink = screen.getByText("Waiter.app");
        userEvent.click(brandLink);
        expect(window.location.pathname).toBe("/");
        expect(screen.getByText("All Tables:")).toBeInTheDocument();
    });
    it("should render Home page after click on Home link", () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const homeLink = screen.getByText("Home");
        userEvent.click(homeLink);
        expect(window.location.pathname).toBe("/");
        expect(screen.getByText("All Tables:")).toBeInTheDocument();
    });
    it("should render Add page after click on Add link", () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/table/add" element={<AddTable />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const addLink = screen.getByText("Add");
        userEvent.click(addLink);
        expect(screen.getByText("Add Table")).toBeInTheDocument();
    });
});