import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Loader from "./../../common/Loader/Loader";

describe("Loader component", () => {
    it("should render without crashing", () => {
        render(
            <Loader />
        );

        const spinner = screen.getByTestId("spinner-animation");
        const loaderText = screen.getByText("Loading...");

        expect(spinner).toBeInTheDocument();
        expect(loaderText).toBeInTheDocument();
    });
});