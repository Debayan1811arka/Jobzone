// eslint-disable-next-line no-unused-vars
import React from 'react'

const AboutPage = () => {
  return (
    <> <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
  <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
    <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
      <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
        <div className="w-full flex-col justify-center items-start gap-8 flex">
          <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
            <h6 className="text-gray-400 text-base font-normal leading-relaxed">About Us</h6>
            <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
              <h2 className="text-blue-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                The Tale of Jobzone</h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                This ios the place where talent and excellence meets opportunity. Our goal is to enable
                talented and hardworking individuals propsre their careers and let them get the best offers
                from the best recruiters and organisations. </p>
            </div>  
          </div>
          <div className="w-full flex-col justify-center items-start gap-6 flex">
            <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
              <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">25+ Years</h4>
                <p className="text-gray-500 text-base font-normal leading-relaxed">Helping People prosper 
                  their careers</p>
              </div>
              <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">110+ Paid Internships
                </h4>
                <p className="text-gray-500 text-base font-normal leading-relaxed">Excellence Achieved
                  Through Success</p>
              </div>
            </div>
            <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
              <div className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">34+ Awards</h4>
                <p className="text-gray-500 text-base font-normal leading-relaxed">Our Dedication to
                  Innovation Wins Understanding</p>
              </div>
              <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">99% Happy
                  Recruiters & Employees</h4>
                <p className="text-gray-500 text-base font-normal leading-relaxed">Mirrors our Focus on
                  User Satisfaction and Prosperity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:justify-start justify-center items-start flex">
        <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
          <img className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover" src="https://pagedone.io/asset/uploads/1717742431.png" alt="about Us image" />
        </div>
      </div>
    </div>
  </div>
</section>

</>
  )
}

export default AboutPage