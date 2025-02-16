import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import Home from "./Home";

describe("Home component", () => {
    it("should render without crashing", () => {
        render(    
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </MemoryRouter>
            </Provider>       
        );

        const homeTestId = screen.getByTestId("home-section");
        const homeTitle = screen.getByText("All Tables:");
        expect(homeTestId).toBeInTheDocument();
        expect(homeTitle).toBeInTheDocument();
    });
});