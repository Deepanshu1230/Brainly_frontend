

interface Inputprops{
    placeholder:string,
    ref?:any,
    onChange?:()=> void

}


export function Input({onChange,placeholder,ref}:Inputprops){
    return(
        <div>
            <input ref={ref} placeholder={placeholder} type="text" className="bg-shadBlack-700 border border-shadBlack-800 outline-none rounded-md px-3 py-1  " onChange={onChange} ></input>
        </div>

    )
}