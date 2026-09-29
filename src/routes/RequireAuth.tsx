import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthReady, selectAuthUser } from "../store/slices/authSlice";

export default function RequireAuth({children} : {children: React.ReactNode}) {
    const ready = useSelector(selectAuthReady);
    const user = useSelector(selectAuthUser);
    const location = useLocation();

    const redirectState = useMemo(() => ({ from: location }), [location]);

    if (!ready) return <p style={{padding:24}}>Checking Session...</p>;
    if (!user) return <Navigate to="/login" state={redirectState} replace />;

    return <>{children}</>;
}