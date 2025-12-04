export default function buttonEnd ({children, onClick}) {
    return (
        <button
  className={"font-mono text-white-lg border-1  active:bg-blue-300 focus:ring-4 focus:ring-blue-500 shadow-md font-medium rounded-lg text-base px-6 py-3.5 transition duration-150"}
  onClick={onClick}>
            {children}
        </button>
    );
}