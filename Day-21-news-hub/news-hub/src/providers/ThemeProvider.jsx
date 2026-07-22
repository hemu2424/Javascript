import { useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function ThemeProvider({children}){
    const[theme,setTheme] = useState(()=>{
        const save = localStorage.getItem("theme")
        return save ? save:"light"
    });
    useEffect(()=>{
        localStorage.setItem("theme",theme)
    },[theme])
    useEffect(() => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [theme]);


    function toggleTheme() {
  setTheme((prevTheme) =>
    prevTheme === "light" ? "dark" : "light"
  );
}
    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>

            {children}
        </ThemeContext.Provider>
    )

}
