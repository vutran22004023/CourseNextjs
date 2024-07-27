import Anh1 from "@/assets/Images/hinh-dep.jpg";
import CardComponentBlog from "@/components/Card/CardBlog";
import { Users } from "lucide-react";
import Image from "next/image";
export default function PersonalPage() {
  return (
    <div className="container mt-[20px] w-full" style={{ padding: "0 90px" }}>
      <div className="min-h-screen bg-gray-100">
        <div className="relative w-full h-64">
          <Image
            src={Anh1}
            alt="Header"
            className="w-full h-full object-cover rounded-b-2xl"
          />
        </div>
        <div className="container mx-auto p-4 flex justify-center">
          <div className="relative flex flex-col items-center bg-white p-4 rounded-lg shadow mt-2 ">
            <div className="absolute -top-[120px]  ">
              <div className="w-32 h-32 bg-slate-500 text-white flex items-center justify-center rounded-full text-3xl font-bold ">
                Vũ
              </div>
            </div>
            <div className=" text-center ">
              <div className="text-lg font-bold">Lê Vũ</div>
            </div>
          </div>
        </div>

        <div className="mt-1 p-5 flex justify-between w-full">
          <div className="w-[300px] mr-3" >
            <CardComponentBlog>
              <h2 className="cactus-classical-serif-md text-[16px]  mb-3">
                Giới thiệu
              </h2>
              <p className="mb-10 text-[12px] flex">
                <Users />{" "}
                <span className="ml-1">
                  Thành viên của F8 - Học lập trình để đi làm từ 2 năm trước
                </span>
              </p>
            </CardComponentBlog>

            <CardComponentBlog>
              <h2 className="cactus-classical-serif-md text-[16px]  mb-3">
                Hoạt động gần đây
              </h2>
              <p className="mb-10 text-[12px] flex">
                <Users />{" "}
                <span className="ml-1">
                  Chưa có hoạt động gần đây
                </span>
              </p>
            </CardComponentBlog>
          </div>
          <div className="flex-1">

          <CardComponentBlog>
              <h2 className="cactus-classical-serif-md text-[16px] mb-3 ">
                Các khóa học đã tham gia
              </h2>
              <div className="flex justify-between ">
                <div><Image src={Anh1} className="w-[200px] h-[100px]" style={{borderRadius: '10px'}}/></div>
                <div className="w-150px ml-2"> 
                  <div>Node & ExpressJS</div>
                  <div>Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful API cho trang web.</div>
                </div>
              </div>
              <hr style={{margin:'10px 0'}}/>
              <div className="flex justify-between ">
                <div><Image src={Anh1} className="w-[200px] h-[100px] " style={{borderRadius: '10px'}}/></div>
                <div className="w-150px ml-2"> 
                  <div>Node & ExpressJS</div>
                  <div>Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful API cho trang web.</div>
                </div>
              </div>

              <hr style={{margin:'10px 0'}}/>
              <div className="flex justify-between ">
                <div><Image src={Anh1} className="w-[200px] h-[100px]" style={{borderRadius: '10px'}}/></div>
                <div className="w-150px ml-2"> 
                  <div>Node & ExpressJS</div>
                  <div>Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful API cho trang web.</div>
                </div>
              </div>

              <hr style={{margin:'10px 0'}}/>
              <div className="flex justify-between ">
                <div><Image src={Anh1} className="w-[200px] h-[100px]" style={{borderRadius: '10px'}}/></div>
                <div className="w-150px ml-2"> 
                  <div>Node & ExpressJS</div>
                  <div>Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful API cho trang web.</div>
                </div>
              </div>
            </CardComponentBlog>
          </div>
        </div>
      </div>
    </div>
  );
}
