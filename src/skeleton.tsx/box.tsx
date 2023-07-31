import React from "react";
export function Box({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div
        style={{
          border: '1px solid #ccc',
          display: 'block',
        //   lineHeight: 2,
          padding: '0.2rem',
          marginBottom: '0.5rem',
          width: 250,
        }}
      >
        {children}
      </div>
    );
  }