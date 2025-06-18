import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharList from "../islands/CharList.tsx";
import { Char } from "../types.ts";


type Data = {
  chars:Char[]
}




export const handler:Handlers = {
  GET:async (_req:Request,ctx:FreshContext) => {
    const res = await fetch("https://hp-api.onrender.com/api/characters"); //Todos los chars
    if(res.status!==200) throw new Error("HP API devolvio error")
    const data = await res.json();
    return ctx.render({chars:data})
  }
}






export default function Home(props:PageProps<Data>) {
  const {chars}= props.data
  return (
    <div>
      <CharList chars={chars} />
    </div>
  );
}
