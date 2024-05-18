import { Toaster } from 'react-hot-toast';

function ErrorMessage() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false} />
    )
}

export default ErrorMessage;