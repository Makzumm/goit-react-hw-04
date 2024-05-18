import { Hearts } from 'react-loader-spinner'

function Loader() {
    return (
        <Hearts
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}

export default Loader;