import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from "react-router";
import Header from "./Header";

describe("Header component", () => {
    it("should render without crashing", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const headerId = screen.getByTestId("navbar-section");
        expect(headerId).toBeInTheDocument();
        expect(headerId).toHaveTextContent("Waiter.app");
        expect(headerId).toHaveTextContent("Home");
        expect(headerId).toHaveTextContent("Add");
    });
});