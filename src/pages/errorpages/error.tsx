// "use client";
// import { ErrorBoundary } from "react-error-boundary";
interface errorRender{
    error?:any,
    resetErrorBoundary?:any
}
export const FallbackRender:React.FC<errorRender>=({ error, resetErrorBoundary })=> {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
  
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }