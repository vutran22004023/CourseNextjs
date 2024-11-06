import { InformationPageForm } from "./ProfileForm";
import Text from "@/components/Text/text";

export default function Informationpage() {
  return (
    <div className="container w-full">
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center w-full md:w-[80%] justify-center">
          <InformationPageForm />
        </div>
      </div>
    </div>
  );
}
