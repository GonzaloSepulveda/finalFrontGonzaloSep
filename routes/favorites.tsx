import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharList from "../islands/CharList.tsx";
import { Char } from "../types.ts";

type Data = {
    chars:Char[]
}


export const handler:Handlers = {
    GET:async (req:Request,ctx:FreshContext) => {
        let misChars:Char[] = []

        const headers = req.headers;
        const cookie = headers.get("Cookie");
        const cookies = cookie?.split("; "); 
        const myids = cookies?.find((c)=>c.trim().startsWith("favs="))?.split("=")[1] 
        if(myids){ //Si no hay favoritos
            const ids = myids.split(",");
            const promesas =ids.map(async (c)=>{
                const res = await fetch("https://hp-api.onrender.com/api/character/"+c)
                if(res.status!==200) throw new Error("API DEVUELVE ERROR")
                const data = await res.json();
                return data[0]
                
            })
            misChars = await Promise.all(promesas) //Esperamos a todas las promesas para no tener array vacio
            
            return ctx.render({chars:misChars})
        } 
        return ctx.render({chars:misChars})
    }
}


export default function Page(props:PageProps<Data>) {
    const {chars} = props.data; //Si no hay chars, da la opción a redirigir
    if(chars.length===0){
        return(
        <div>
            <a href="/">No hay favoritos...</a> 
        </div>
        )
    } 
    if(chars.length!==0){
    return(
        <div>
            <CharList chars={chars}/>
        </div>
    )
}
}
