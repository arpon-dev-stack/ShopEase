const application = import.meta.env.VITE_APP;
const root = import.meta.env.VITE_DEMOBACKEND;
const backend = import.meta.env.VITE_BACKEND

export const productQuery = () => {
    if (application === 'development') {
        return root
    }
    return backend
}