import CarouselComponent from "@/components/Carousel/carousel";
import CourselList from "./courseList";
const Page = () => {
  return (
    <div>
      <div className="px-10">
        <CarouselComponent />
        <CourselList />
      </div>
    </div>
  );
};

export default Page;
