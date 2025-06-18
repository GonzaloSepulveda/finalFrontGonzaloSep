import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import SingleChar from "../../islands/SingleChar.tsx";
import { Char } from "../../types.ts";

type Data = {
    char:Char
}

export const handler:Handlers = {
    GET:async (_req:Request,ctx:FreshContext<unknown,Data>) => {
        const {id} = ctx.params;
        const res = await fetch("https://hp-api.onrender.com/api/character/"+id)
        if(res.status!==200) throw new Error("HP API devolvio error")
        const data = await res.json();
        return ctx.render({char:data[0]}) //HP API nos lo devuelve en un array
    }
}




export default function Page(props:PageProps<Data>) {
    const {char} = props.data; 

    return(
        <div>
            <SingleChar char={char} />
        </div>
    )
}


