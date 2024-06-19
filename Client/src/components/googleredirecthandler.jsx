import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

export default function GoogleRedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useSession();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const user = {
            name: query.get('name'),
            email: query.get('email'),
            uid:query.get('uid')
        };

        if (user.name && user.email && user.uid) {
            setUser(user);
            navigate('/main');
        } else {
            alert("Error logging in with Google");
            navigate('/login');
        }
    }, [location, navigate, setUser]);

    return <div>Loading...</div>;
}
