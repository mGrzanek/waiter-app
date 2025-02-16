import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import NavBar from "./NavBar";
import Home from "./../../pages/Home/Home";

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
});