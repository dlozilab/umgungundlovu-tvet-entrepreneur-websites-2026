import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import type { AppDispatch } from "../store";
import {signIn, selectAuthStatus, selectAuthError, selectAuthUser} from '../store/slices/authSlice'
import Field from "../components/shared/Field";
import Button from "../components/shared/Button";
import { useEffect } from "react";
import styles from './LoginPage.module.css'
import { useState } from "react";

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const status = useSelector(selectAuthStatus);
    const error = useSelector(selectAuthError);
    const user = useSelector(selectAuthUser);
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');

    useEffect(()=> {
        if (user) {
            const from = (location.state as any)?.from?.pathname || '/admin';
            navigate(from, {replace: true});
        }
    }, [user, navigate, location]);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        dispatch(signIn({email, password}))
    } return (
        <div className={styles.wrap}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <p className={styles.sub}>Manage your website.</p>
                <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="name@business.co.za"/>
                <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="Your Password"/>
                {error && <p style={{color: 'var(--danger)', fontSize:13, marginBottom:12}}>{error}</p>}

                <Button type="submit" variant="solid" block disabled={status === 'loading'}>
                    {status === 'loading' ? 'Signing In...' : 'Sign In'}
                </Button>
            
            <p className={styles.help}>Forgotten your password? Phone mLab and we will reset it for you!</p>

            </form>
        </div>
    )
}