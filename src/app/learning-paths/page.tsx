import CardComponent from "@/components/Card/CardBlog";
import Anh1 from "@/assets/Images/hinh-dep.jpg";
import ButtonComponment from "@/components/Button/Button";
import Anhf8 from "@/assets/Images/anhf8.png";
import Image from "next/image";
import Text from "@/components/Text/text";
export default function SarningPaths() {
  return (
    <div className="container mt-8 w-full">
      <Text type="header" className="mb-3 flex justify-center">
        Lộ trình học
      </Text>
      <Text className="text-[15px] mb-7 w-[1000px]">
        Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học.
        Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn nên tập trung
        vào lộ trình "Front-end".
      </Text>

      <div className="flex w-full">
        <div className="w-full flex justify-between gap-6">
          <CardComponent>
            <div className="flex">
              <div className="w-[70%]">
                <Text className="cactus-classical-serif-md text-[20px]">
                  Lộ trình học Font-end
                </Text>
                <Text className="mb-1">
                  Lập trình viên Front-end là người xây dựng ra giao diện
                  websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở
                  thành lập trình viên Front-end nhé.
                </Text>
                <ButtonComponment type="notesheet" className="bg-[#FF5A00] text-white px-3 py-1 w-[130px] flex justify-center" style={{ borderRadius: "20px" }}>
                  Xem chi tiết
                </ButtonComponment>
              </div>
              <div className="flex-1">
                <div className="p-3">
                  <Image
                    src={Anh1}
                    alt="Anh 1"
                    className="w-[200px] h-[100px]"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
              </div>
            </div>
          </CardComponent>

          <CardComponent>
            <div className="flex">
              <div className="w-[70%]">
                <Text className="cactus-classical-serif-md text-[20px]">
                  Lộ trình học Font-end
                </Text>
                <Text className="text-[14px] mb-1">
                  Lập trình viên Front-end là người xây dựng ra giao diện
                  websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở
                  thành lập trình viên Front-end nhé.
                </Text>
                <ButtonComponment
                  type="notesheet" className="bg-[#FF5A00] text-white px-3 py-1 w-[130px] flex justify-center"
                  style={{ borderRadius: "20px" }}
                >
                  Xem chi tiết
                </ButtonComponment>
              </div>
              <div className="flex-1">
                <div className="p-3">
                  <Image
                    src={Anh1}
                    alt="Anh 1"
                    className="w-[200px] h-[100px]"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
              </div>
            </div>
          </CardComponent>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="w-[500px]">
          <Text type="subtitleDefault" className="mb-3 mt-10 ">
            Tham gia cộng đồng học viên F8 trên Facebook
          </Text>
          <Text className="text-[15px] mb-7">
            Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia
            hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học nhé.
          </Text>

          <ButtonComponment type="notesheet" className="mt-1 bg-[#FF5A00] px-3 py-1 text-white w-[140px] flex justify-center" style={{ borderRadius: "20px" }}>
            Tham gia nhóm
          </ButtonComponment>
        </div>
        <div className="flex-1">
          <Image
            src={Anhf8}
            alt="Anh 1"
            className="w-[500px] h-[300px]"
            style={{ borderRadius: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}
