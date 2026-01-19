import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="flex items-center justify-center min-h-screen bg-black text-white p-5 text-center flex-col font-['Michroma']">
                    <h1 className="text-4xl mb-4 text-red-500">Something went wrong.</h1>
                    <p className="text-white/70 mb-8">
                        The application encountered an unexpected error.
                        <br />
                        Please refresh the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors"
                    >
                        REFRESH PAGE
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
