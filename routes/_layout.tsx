import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function Layout({ Component}: PageProps) {
  return ( //Layout de la pagina
    <div>
      <Header />
      <Component />
    </div>
  );
}
