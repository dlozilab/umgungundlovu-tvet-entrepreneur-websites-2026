import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/shared/Loader";

import { selectAuthReady, selectAuthUser } from "../store/slices/authSlice";

export default function RequireAuth({children} : {children: React.ReactNode}) {
    const ready = useSelector(selectAuthReady);
    const user = useSelector(selectAuthUser);
    const location = useLocation();

    const redirectState = useMemo(() => ({ from: location }), [location]);

    if (!ready) return <Loader fullPage label="Checking Session.."/>;
    if (!user) return <Navigate to="/login" state={redirectState} replace />;

    return <>{children}</>;
}