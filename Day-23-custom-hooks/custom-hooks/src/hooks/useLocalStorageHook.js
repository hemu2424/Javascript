const { useState } = require("react");

function useLocalStorage(key,initialValue){
    const [value,setValue] = useState(()=>{
        try{
            const item = localStorage.getItem(key);
            if(item !== null){
                return JSON.parse(item);
            }
            return initialValue
        }
        catch(error){
            console.log("erro reading localStorage",error)
            return initialValue
        }

    })

        
    const setValue = (value) =>{
        try{
            const caluetoStore = value instanceof Function ? value(storedValue): value;
            setStoredValue(valueToStore);
        localStorage(valuetoStore);
        }
        catch(error){
            console.log("error while saving to localstorage",error);
        }

    }
const removeValue = ()=>{
    try{
        localStorage.removeItem(key);
        setStoredValue(initialValue);
    }
    catch(error){
        console.log("error while removing",error)

    }
}
return [storedValue,setValue,removeValue]
}