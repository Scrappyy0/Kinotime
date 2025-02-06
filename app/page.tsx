
import HomeContainer from "@/components/container/home-container";
import { Header } from "@/components/common/header";
import CarousalComponent from "@/components/common/CarousalComponent";

export default function Home() {
  return (
    <>
        <Header />
        <CarousalComponent type={"trending/movie/week"} />
        <HomeContainer/>
    </>
  );
}
