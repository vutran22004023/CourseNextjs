import Image from "next/image";
import CarouselComponent from "@/components/Carousel/carousel";
import CourselList from './courseList'
const Page= () => { 
  return (
    <main>
      <CarouselComponent />
      <CourselList/>
    </main>
  );
}



export default Page;