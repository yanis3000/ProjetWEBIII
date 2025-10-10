export default function MainButton ({children, className = "", onClick}) {
    return (
        <button
  className={"bg-slate-500 text-white py-2 px-4 rounded cursor-pointer " + className}
  onClick={onClick}>
            {children}
        </button>
    );
}