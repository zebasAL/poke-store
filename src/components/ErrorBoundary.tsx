import React, { ReactNode } from "react";
import Bugsnag from "@bugsnag/js";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };  
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // we can log error or errorInfo to Sentry here.
    // errorInfo will contain the details 
    // and stack trace which is better for debugging
    // log the error to an error reporting service
    Bugsnag.start({
      apiKey: import.meta.env.VITE_BUGSNAG_API_KEY,
    })
  }

  render() {
    if (this.state.hasError) {
      // render custom fallback UI
      return (
        <div style={{ textAlign: "center", margin: "20px 10px" }}>
          <img
            style={{ maxHeight: "200px", width: "100%", objectFit: "contain" }}
            alt="error" src="https://metiormedia.s3.us-east-1.amazonaws.com/assets/errorImage.png"
          />
          <h2>Woops!, An Error Occurred</h2>
          <p> The application detected an error, and it"s been reported to the application development team. You can try refreshing the page.</p>
          <p>If the error keeps occurring, please file a bug report with the following details, and include any steps to reproduce the issue.</p>    
        </div>
      );
    };
    return this.props.children; 
  }
}
