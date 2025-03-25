import { toast } from 'react-toastify';


export const useToast = () => {
    return {
        success: (msg) => toast.success(msg),
        error: (msg) => toast.error(msg),
        info: (msg) => toast.info(msg),
        warn: (msg) => toast.warn(msg),
    };
};
