import { useVerifyMeQuery } from '../services/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from '../services/auth/authSlice';
import { useEffect, useCallback, useRef, useState } from 'react';
import AuthModal from '../components/AuthModal';
import AuthInput from '../components/AuthInput';
import { useSignInMutation, useSignUpMutation } from '../services/auth/authApi';
import { useNavigate } from 'react-router-dom';

function ProtectedComponent({ children }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const navigate = useNavigate();

    // Check Redux state first
    const { isAuthenticated, user: reduxUser } = useSelector((state) => state.auth);
    const token = localStorage.getItem('token');

    const { data: user, isLoading, isSuccess, isError } = useVerifyMeQuery(reduxUser, {
        skip: !token
    });

    const signInRef = useRef();
    const signUpRef = useRef();

    useEffect(() => {
        if (isSuccess && user) {
            dispatch(setCredentials({ user, token }));
        } else if (isError) {
            dispatch(logout());
            // signInRef.current?.showModal();
        }
    }, [isSuccess, isError, user, token, dispatch]);

    useEffect(() => {
        if (!token) {
            signInRef.current?.showModal();
        }
    }, [token]);

    const toggleModal = useCallback((ref, action) => {
        if (action === 'open') {
            signInRef.current?.close();
            signUpRef.current?.close();
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, []);

    const [signIn, { isLoading: isLoggingIn, isError: isLogInError }] = useSignInMutation();
    const [signUp, { isLoading: isRegistering, isError: isRegisterError }] = useSignUpMutation();

    const handleAuth = async (type) => {
        try {
            const result = type === 'signin'
                ? await signIn({ email: formData.email, password: formData.password }).unwrap()
                : await signUp(formData).unwrap();

            dispatch(setCredentials({ user: result.user, token: result.token }));
            toggleModal(type === 'signin' ? signInRef : signUpRef, 'close');
        } catch (err) {
            alert(err.data?.message || "Authentication failed");
        }
    };

    if (isLoading && token) {
        return <div className="p-10 text-center">Verifying session...</div>;
    }

    if (isAuthenticated || (isSuccess && user)) {
        return children;
    }

    return (
        <>
            <AuthModal
                dialogRef={signInRef}
                title="Sign In"
                onClose={() => { toggleModal(signInRef, 'close') }}
                switchModal={() => toggleModal(signUpRef, 'open')}
                switchText="Don't have an account? Sign Up"
                formSubmit={() => handleAuth('signin')}
                formSubmitting={isLoggingIn}
                formSumitError={isLogInError}
            >
                <AuthInput type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <AuthInput type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </AuthModal>

            <AuthModal
                dialogRef={signUpRef}
                title="Create Account"
                onClose={() => toggleModal(signUpRef, 'close')}
                switchModal={() => toggleModal(signInRef, 'open')}
                switchText="Already have an account? Sign In"
                formSubmit={() => handleAuth('signup')}
                formSubmitting={isRegistering}
                formSumitError={isRegisterError}
            >
                <AuthInput type="text" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <AuthInput type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <AuthInput type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </AuthModal>
        </>
    );
}

export default ProtectedComponent;