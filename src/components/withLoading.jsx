import React from 'react';

export const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, loadingText = "Loading data...", ...props }) {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-12 min-h-[220px] rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute w-6 h-6 border-4 border-emerald-500/20 border-b-emerald-500 rounded-full animate-spin [animation-direction:reverse]"></div>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-400 animate-pulse">
            {loadingText}
          </p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};