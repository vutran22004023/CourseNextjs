import CarouselComponent from "@/components/Carousel/carousel";
import CourselList from "./courseList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Trang chủ',
}
const Page = () => {
  return (
      <div className="pt-5 mx-10">
        <CarouselComponent />
        <CourselList />
      </div>
  );
};

export default Page;
