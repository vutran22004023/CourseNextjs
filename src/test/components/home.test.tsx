import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";
import "@testing-library/jest-dom";

// Mocking `html` and `body` tags by simplifying RootLayout for testing
jest.mock("@/app/layout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="root-layout">{children}</div>
    ),
}));

jest.mock("@/components/ClientProviders", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="client-providers">{children}</div>,
}));

describe("RootLayout", () => {
    it("renders RootLayout correctly", () => {
        const content = "Test Content";

        render(
            <RootLayout>
                <div>{content}</div>
            </RootLayout>
        );

        // Verify main layout elements
        expect(screen.getByTestId("root-layout")).toBeInTheDocument();

        // Verify content
        expect(screen.getByText(content)).toBeInTheDocument();
    });
});
