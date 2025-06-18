import { useEffect, useState } from "preact/hooks";
import { Char } from "../types.ts";

type Data = {
    char:Char
}






export default function SingleChar({char}:Data) {
    const [id,setId] = useState<string>("")
    const handleClick = () => {
        globalThis.location.href="/"
    }


    const addFav = () => { //Añade favoritos
        const prevFavs = misIds();
        if(checkId()){
        prevFavs.push(id)
        const date = new Date();
        const expires = new Date(date.getTime()+365*24*60*60*1000).toUTCString();
        document.cookie = `favs=${prevFavs.join(",")};path=/;expires=${expires}`
        }
    }

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

    const handleid = (id:string) => {
        setId(id)
    }

    useEffect(() => {
        addFav()
  }, [id]);

    return(
        <div class="detail">
            <img src={char.image}></img>
            <p>Nombre: {char.name}</p>
            <p>Casa: {char.house}</p>
            {char.alive&&<p>Vivo</p>}
            {!char.alive&&<p>Muerto</p>}
            <button type="button" onClick={()=>handleid(char.id)}>Añadir a favoritos</button>
            <button type="button" onClick={()=>handleClick()}>Volver</button>
        </div>
    )
}