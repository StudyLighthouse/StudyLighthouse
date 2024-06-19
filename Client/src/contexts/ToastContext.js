// ToastProvider.js

import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

const ToastProvider = ({ children }) => {
    const showLoadingToast = (message) => {
        return toast.loading(message);
    };

    const updateToast = (toastId, { render, type, autoClose, isLoading }) => {
        toast.update(toastId, {
            render,
            type,
            autoClose,
            isLoading,
        });
    };

    const dismissAllToasts = () => {
        toast.dismiss();
    };

    return (
        <>
            <ToastContainer /> {/* Ensure ToastContainer is rendered */}
            <ToastContext.Provider value={{ showLoadingToast, updateToast, dismissAllToasts }}>
                {children}
            </ToastContext.Provider>
        </>
    );
};

export default ToastProvider;
