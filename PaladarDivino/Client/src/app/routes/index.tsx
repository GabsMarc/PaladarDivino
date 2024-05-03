import { BrowserRouter, Route, Routes as Switch, Navigate} from "react-router-dom"
import { Dashboard, LoginPage, Menu, RegisterPage} from "../pages"

export const Routes = () => {
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/pagina-inicial" Component={Dashboard} />
                <Route path="/login" Component={LoginPage}/>
                <Route path="/register" Component={RegisterPage}/>
                <Route path="/menu" Component={Menu}/>

                {/* Quando é digitada uma página que não existe, o código roda o navigate.*/}
                <Route path="*" Component={() => <Navigate to='/pagina-inicial' />}/>
            </Switch>
        </BrowserRouter>
    )
}