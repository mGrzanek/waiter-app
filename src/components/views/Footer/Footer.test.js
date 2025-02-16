import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Footer from "./Footer";

describe("Footer component", () => {
    it("should render without crashing", () => {
        render(<Footer />);

        const footerId = screen.getByTestId("footer-section");
        expect(footerId).toBeInTheDocument();
        expect(footerId).toHaveTextContent("Copyright © PizzeriaApp 2025");
    });
});