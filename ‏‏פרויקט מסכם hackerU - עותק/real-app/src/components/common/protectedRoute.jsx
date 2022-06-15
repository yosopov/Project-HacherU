import { Navigate } from "react-router-dom";

const protectedRoute = ({children,user,spamUrl,accessMnger})=>{
    
    const urlPathname =window.document.location.pathname
    if (!user) {
        if (spamUrl) {
            return <Navigate to="/"/>;
        };
        if (urlPathname ==="/myProducts") {
                return <Navigate to="/"/>;
        };
        return children;
    };
    
    if (accessMnger) {
        debugger
        if (user.access === 'manager') {
            return children  ;
        };
        return <Navigate to="/"/>;
    };
    if (urlPathname === "/signin" || urlPathname === "/signup") {
        return <Navigate to="/"/>;
    };

    return children;
};

export default protectedRoute;