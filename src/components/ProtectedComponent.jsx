import { useVerifyMeQuery } from '../services/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from '../services/auth/authSlice';
import { useEffect, useCallback, useRef, useState } from 'react';
import AuthModal from '../components/AuthModal';
import AuthInput from '../components/AuthInput';
import { useSignInMutation, useSignUpMutation } from '../services/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function ProtectedComponent({ children }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });
    const navigate = useNavigate()

    // Check Redux state first
    const { isAuthenticated, user: reduxUser } = useSelector((state) => state.auth);
    const token = localStorage.getItem('token');

    // FIX: Skip should be true if there is NO token.
    const { data: user, isLoading, isSuccess, isError } = useVerifyMeQuery(undefined, {
        skip: !token
    });

    const signInRef = useRef();
    const signUpRef = useRef();

    // Sync Query result with Redux
    useEffect(() => {
        if (isSuccess && user) {
            dispatch(setCredentials({ user, token }));
        } else if (isError) {
            dispatch(logout());
            signInRef.current?.showModal(); // Auto-open login if token fails
        }
    }, [isSuccess, isError, user, token, dispatch]);

    // Open login modal on mount if no token exists at all
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

    const [signIn, { isLoading: isLoggingIn }] = useSignInMutation();
    const [signUp, { isLoading: isRegistering }] = useSignUpMutation();

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

    // 1. Show nothing or a skeleton while checking the token
    if (isLoading && token) {
        return <div className="p-10 text-center">Verifying session...</div>;
    }

    // 2. If authenticated, show protected content
    if (isAuthenticated || (isSuccess && user)) {
        return children;
    }

    // 3. If not authenticated, show the fallback UI with Modals
    return (
        <>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-primary transition-colors group"
            >
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back
            </button>
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 m-4">
                <h1 className="text-xl font-semibold text-gray-700 mb-4">This section is protected</h1>
                <p className="text-gray-500 mb-6">Please sign in to view your data.</p>
                <button
                    onClick={() => toggleModal(signInRef, 'open')}
                    className="btn-primary px-8 py-2"
                >
                    Sign In Now
                </button>

                <AuthModal
                    dialogRef={signInRef}
                    title="Sign In"
                    onClose={() => { toggleModal(signInRef, 'close') }}
                    switchModal={() => toggleModal(signUpRef, 'open')}
                    switchText="Don't have an account? Sign Up"
                    formSubmit={() => handleAuth('signin')}
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
                >
                    <AuthInput type="text" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                    <AuthInput type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <AuthInput type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </AuthModal>
            </div>
        </>
    );
}

export default ProtectedComponent;