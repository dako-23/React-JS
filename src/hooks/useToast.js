import { toast } from 'react-toastify';


export const useToast = () => {
    return {
        success: (msg) => toast.success(msg),
        error: (msg) => toast.error(msg),
        info: (msg) => toast.info(msg, { autoClose: 500 }),
        warn: (msg) => toast.warn(msg),
    };
};
