import {createContext, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const LoaderContext = createContext({});

function LoaderContextProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const contextValue = {
        setLoading,
        loading,
    };

    return(
        <LoaderContext.Provider value={contextValue}>
            {children}
        </LoaderContext.Provider>
    )
}

export default LoaderContextProvider;