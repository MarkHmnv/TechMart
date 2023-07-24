import {toast} from "react-toastify";

export const showToastError = (error) => {
    const errorMessage = Array.isArray(error?.data?.message)
        ? error.data.message.map((err, i) => <p key={i}>{err}</p>)
        : error.data?.message || error.error;
    toast.error(<>{errorMessage}</>);
}