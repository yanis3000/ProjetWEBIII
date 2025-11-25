export default function mapButton ({children, className = "", onClick}) {
    return (
        <button
  className={"text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 " + className}
  onClick={onClick}>
            <img src="https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png" alt="Group Of 10 Guys - Login User Icon Png@nicepng.com"></img>
        </button>
    );

    // https://tw-elements.com/learn/te-foundations/tailwind-css/rounded-corners/#:~:text=In%20Tailwind%20CSS%2C%20it%27s%20very,class%20rounded%2Dmd%20or%20similar.
}