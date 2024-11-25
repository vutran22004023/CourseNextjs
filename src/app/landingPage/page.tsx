import React from "react";
import ButtonComponent from "@/components/Button/Button"
import landing1 from "@/assets/Images/landing1.png"
import landing2 from "@/assets/Images/landing2.png"
import Image from "next/image";

export default function () {
  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Learn Anytime, Anywhere with Courseniver
            </h1>
            <p className="mb-8 leading-relaxed">
              Courseniver brings you high-quality, industry-focused courses
              designed to elevate your skills. Whether you're a beginner or a
              seasoned professional, explore our comprehensive catalog and join
              thousands of learners worldwide.
            </p>
            <div className="flex justify-center">
              <ButtonComponent type="login" className="p-3 m-0 bg-[#ff5a00] font-bold text-white">
                Get Started
              </ButtonComponent>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image
              src={landing1}
              className="object-cover object-center rounded"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-[#ff5a00] tracking-widest font-medium title-font mb-1">
              WHY CHOOSE COURSENIVER?
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Empower Your Future with Our Unique Features
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#ff5a00] text-white flex-shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    Expert Instructors
                  </h2>
                </div>
                <p className="leading-relaxed text-base">
                  Learn from industry leaders and experienced professionals who
                  bring real-world knowledge to every lesson.
                </p>
                <a className="mt-3 text-[#ff5a00] inline-flex items-center">
                  Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#ff5a00] text-white flex-shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <circle cx="12" cy="7" r="4"></circle>
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    Career-Focused Content
                  </h2>
                </div>
                <p className="leading-relaxed text-base">
                  Access carefully curated courses designed to provide relevant,
                  up-to-date knowledge that helps you advance in your field.
                </p>
                <a className="mt-3 text-[#ff5a00] inline-flex items-center">
                  Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#ff5a00] text-white flex-shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    Flexible Learning
                  </h2>
                </div>
                <p className="leading-relaxed text-base">
                  Study at your own pace with online access to all course
                  materials, available 24/7 on any device.
                </p>
                <a className="mt-3 text-[#ff5a00] inline-flex items-center">
                  Learn More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto flex  flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            {/* <Image
              src={landing2}
              width={600}
              height={600}
              className="object-cover object-center h-full w-full"
              alt="ergerg"
            /> */}
            <Image
              src={landing2}
              className="object-cover object-center rounded"
              alt=""
            />
          </div>
          <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#ff5a00] mb-5">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Engaging Courses
                </h2>
                <p className="leading-relaxed text-base">
                  Explore a diverse range of engaging online courses designed to
                  enhance your skills and knowledge in various fields, available
                  anytime, anywhere.
                </p>
                <a className="mt-3 text-[#ff5a00] inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#ff5a00] mb-5">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Professional Tutors
                </h2>
                <p className="leading-relaxed text-base">
                  Learn from industry experts who bring real-world experience to
                  the online classroom, providing you with practical skills and
                  insights.
                </p>
                <a className="mt-3 text-[#ff5a00] inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#ff5a00] mb-5">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Supportive Community
                </h2>
                <p className="leading-relaxed text-base">
                  Join a community of like-minded learners, where you can share
                  experiences, collaborate, and support each other's journey.
                </p>
                <a className="mt-3 text-[#ff5a00] inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Discover Courseniver
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-base">
              Courseniver provides high-quality online courses that empower you
              to achieve your learning goals with flexibility and guidance from
              expert instructors.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#ff5a00] mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Flexible Learning
                </h2>
                <p className="leading-relaxed text-base">
                  Study at your own pace with flexible course schedules,
                  available anytime to fit your lifestyle and learning
                  preferences.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#ff5a00] mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Practical Skills
                </h2>
                <p className="leading-relaxed text-base">
                  Our courses are designed to provide practical skills that you
                  can apply immediately in your personal and professional life.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-300 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#ff5a00] mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Global Community
                </h2>
                <p className="leading-relaxed text-base">
                  Connect with a diverse community of learners from around the
                  world, exchange ideas, and support each other’s journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Our Expert Tutors
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Meet our dedicated and experienced tutors, ready to guide you
              through each step of your learning journey at Courseniver.
            </p>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-8 h-8 text-gray-400 mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-lg">
              "Courseniver is an online learning platform designed to give you
              easy access to high-quality courses, from professional skills to
              personal development. With experienced instructors and rich
              learning materials, we aim to bring you an optimal and effective
              learning experience."
            </p>
            <span className="inline-block h-1 w-10 rounded bg-[#ff5a00] mt-8 mb-6"></span>
            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
              ALEXANDRA SMITH
            </h2>
            <p className="text-gray-500">Founder & CEO of Courseniver</p>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            title="map"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.4996713709376!2d108.19914740383375!3d16.065558009047507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c55d571041%3A0xa50e8bb38c76752f!2zVlRDIEFjYWRlbXkgUGx1cyDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1731467308783!5m2!1svi!2s"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Course Feedback
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              We value your feedback! Please share your thoughts on how we can
              improve the Courseniver learning experience.
            </p>
            <textarea
              className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-[#ff5a00] text-base px-4 py-2 mb-4 resize-none"
              placeholder="Your Feedback"
            ></textarea>
            <button className="text-white bg-[#ff5a00] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Submit Feedback
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Your feedback helps us improve and provide a better learning
              experience for all students.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
