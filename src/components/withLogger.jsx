import React, { useEffect } from 'react';

export const withLogger = (WrappedComponent) => {
  return function WithLoggerComponent(props) {
    // Component jab mount ya update hoga, tab yeh run karega
    useEffect(() => {
      console.log(`[Logger HOC] Component "${WrappedComponent.name || 'Component'}" mounted/updated with props:`, props);
    });

    // Wrapped component ko wahi saare props pass kar dena (Props Proxy Pattern)
    return <WrappedComponent {...props} />;
  };
};