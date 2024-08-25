import { ProfileForm } from "./ProfileForm";
import Text from '@/components/Text/text'
export default function Informationpage() {
  return (
    <div className="container mt-9 w-full">
      <div className="mb-3">
        <Text type="header">
          Thông tin Web
        </Text>
      </div>
      <ProfileForm />
    </div>
  );
}
