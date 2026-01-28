import { useVerifyMeQuery } from './services/auth/verify';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from './services/auth/authSlice';
import { useEffect } from 'react';

function ProtectedComponent({children}) {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const { data: user, isLoading, isSuccess, isError } = useVerifyMeQuery(undefined, { skip: token });

    useEffect(() => {
        if (isSuccess && user) {
            dispatch(setCredentials(user, token))
        } else {
            dispatch(logout())
        }

    }, [isError, isLoading, isSuccess, user, token]);

    if (isSuccess && user) {
        return (
            children
        )
    } else {
        return <h1>You don</h1>
    }

}

export default ProtectedComponent