import React from "react";
import ThemeProvider from "./layout/provider/Theme";
import AllRoutes from "./route/Routes";

const App = () => {
    return (
        <React.Fragment>
            <ThemeProvider>
                <AllRoutes/>
            </ThemeProvider>
        </React.Fragment>
    );
};
export default App;