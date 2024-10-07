import CarouselComponent from "@/components/Carousel/carousel";
import CourselList from "./courseList";
import Footer from "@/components/Layouts/Footer";
const Page = () => {
  return (
    <main>
      <div className="px-10">
        <CarouselComponent />
        <CourselList />
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </main>
  );
};

export default Page;
