export default function MapButton ({className="", onClick}) {
    return (
        <button
            className={"text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 pt-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-500 dark:border-gray-500 " + className}
            onClick={onClick}>
            <img style={{width:"4.1vw"}} src="../src/images/position-marker.svg" alt="no image"></img>
        </button>
    );
}