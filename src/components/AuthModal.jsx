import { X } from "lucide-react";

const AuthModal = ({ dialogRef, title, children, onClose, switchModal, switchText, formSubmit }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        formSubmit()
    }
    return (
        <dialog
            ref={dialogRef}
            onClick={(e) => e.target === dialogRef.current && onClose()}
            className="rounded-2xl p-0 backdrop:backdrop-blur-[0.1px] shadow-2xl"
        >
            <div className="p-8 w-[90vw] max-w-md bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
                </div>
                <form className="flex flex-col gap-4" onSubmit={(e) => { handleSubmit(e) }}>
                    {children}
                    <button type="submit" className="btn-primary w-full py-3 mt-2">Continue</button>
                    <button
                        type="button"
                        onClick={switchModal}
                        className="text-sm text-gray-500 hover:text-primary transition-colors text-center mt-2"
                    >
                        {switchText}
                    </button>
                </form>
            </div>
        </dialog>
    )
};

export default AuthModal;