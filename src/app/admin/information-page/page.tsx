import { InformationPageForm } from "./ProfileForm";
import Text from "@/components/Text/text";

export default function Informationpage() {
  return (
    <div className="container w-full">
      <div className="mb-3">
        <Text type="header">Thông tin Web</Text>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center w-full md:w-[80%] justify-center p-5  rounded-2xl border-2 border-black">
          <InformationPageForm />
        </div>
      </div>
    </div>
  );
}
