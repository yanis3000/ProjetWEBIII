export default function mapButton ({children, className = "", onClick}) {
    return (
        <button
  className={"rounded-full" + className}
  onClick={onClick}>
            {children}
        </button>
    );

    // https://tw-elements.com/learn/te-foundations/tailwind-css/rounded-corners/#:~:text=In%20Tailwind%20CSS%2C%20it%27s%20very,class%20rounded%2Dmd%20or%20similar.
}