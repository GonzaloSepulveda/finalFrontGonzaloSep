import { useEffect, useState } from "preact/hooks";
import { Char } from "../types.ts";


type Data = {
    chars:Char[]
}



export default function CharList({chars}:Data){

    const [id,setId] = useState<string>("")
    const [flag,setFlag] = useState<boolean>(false) //Para indicar si está añadido o no
    
   //Funciones de manejo de favoritos
    const checkId = ():boolean => {
        const misChars=misIds();
        if(id){
            const check = misChars.some((f)=>f===id)
            if(!check){
               
                return true
            }
            return false;
        }
        return false;
    }


    const misIds = ():string[] => {
        const cookie = document.cookie
        const cookies = cookie.split("; ");
        const misFavs = cookies.find((c)=>c.trim().startsWith("favs="))?.split("=")[1]
        if(misFavs){
            const ids = misFavs.split(",");
            return ids
        } else {
            return [];
        }
    }

    const addFav = () => {
        const prevFavs = misIds();
        if(checkId()){
        prevFavs.push(id)
        const date = new Date();
        const expires = new Date(date.getTime()+365*24*60*60*1000).toUTCString();
        document.cookie = `favs=${prevFavs.join(",")};path=/;expires=${expires}`
        }
    }

    const remFav = () => {
        const date = new Date();
        const expires = new Date(date.getTime()-365*24*60*60*1000).toUTCString();
        document.cookie = `favs=a;path=/;expires=${expires}`
    }

    const handleClick = (id:string) => {
        globalThis.location.href = `/characters/${id}`
    }
    const handleid = (id:string) => {
        console.log(flag)
        setId(id)
        if(flag===true){
            setFlag(false)
        } else {
            setFlag(true)
        }
    }


    useEffect(() => {
        addFav()
  }, [id]);


    
    return(
        <div class="grid">
            {chars.map((c)=>(
                <div class="card">
                {c.image&&<img src={c.image} width={100} onClick={()=>handleClick(c.id)} />}
                <p>Nombre: {c.name}</p>
                <button type="button" onClick={()=>handleid(c.id)}>Añadir a favoritos</button>
                <button type ="button" onClick={()=>remFav()}>Eliminar los favoritos</button>
                </div>
            ))}
        </div>
    )
}