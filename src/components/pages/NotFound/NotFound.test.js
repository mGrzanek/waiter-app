import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from "react-router";
import NotFound from "./NotFound";

describe("NotFound component", () => {
    it("should render without crashing when path is invalid", () => {
        render(
            <MemoryRouter initialEntries={["/invalid-path"]}>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MemoryRouter>
        );

        const notFoundTitle = screen.getByText("404 NotFound");
        const notFoundContent = screen.getByText("Sorry... This website address doesn't exist.");
        expect(notFoundTitle).toBeInTheDocument();
        expect(notFoundContent).toBeInTheDocument();
    });
});