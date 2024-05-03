import React, { createContext, useState } from "react";



interface ILoginContext {
    customerLogin: {}, 
    setCustomerLogin: React.Dispatch<React.SetStateAction<{}>>
}

export const LoginContext = createContext<ILoginContext>({} as ILoginContext)


export const LoginContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customerLogin, setCustomerLogin] = useState({})

    return (
        <LoginContext.Provider value={{ customerLogin, setCustomerLogin }}>
            {children}
        </LoginContext.Provider>
    )
}