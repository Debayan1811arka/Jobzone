// eslint-disable-next-line no-unused-vars
import React from 'react'; 
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import { skills } from '../../../utils/constant';
import { axiosClient } from './../../../utils/utils';
import { toast } from 'react-toastify';
import { useJobContext } from '../../../context/JobContext';




const AddJob = () => {

    let [isOpen, setIsOpen] = useState(false)
    const {fetchAllJobs} = useJobContext()
    

    const initialStates = {
      title:'',
      skills:[],
      company_name:'',
      salary:0,
      extend_date:new Date(),
      job_url:'',
      company_profile_pic:'',
      job_type:''
    }

    const validationSchema = yup.object({
      title: yup.string().required('Title is required'),
      skills: yup.array().of(yup.string()).required('Atleast one skill is required'),
      company_name: yup.string().required('Company name is required'),
      salary: yup.number().positive().required('Salary is required'),
      extend_date: yup.date().required('Extend date is required'),
      job_url: yup.string().url().required('Job URL is required'),
      company_profile_pic: yup.string().url().required('Company Profile Pic is required'),
      job_type: yup.string().required('Job type is required')
    })

    const onSunmitHandler =async (values, helpers)=>{
      try{
          console.log(values)
          const response = await axiosClient.post("/create",values)
          const data = await response.data
          await fetchAllJobs()
          toast.success(data.msg)
          close()
          
      } catch (error) {
        console.log(error.message);
      }
    }



  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
  return (
    <>
         <div className="mb-3 flex justify-end">
           <button 
           onClick={open}
           className='px-3 py-2 border-none outline-none text-white rounded-sm bg-blue-500 mx-5.5 cursor-pointer'>Add Job</button>
         </div>

         <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-[30vh] items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white border p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex  justify-between">
                
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                Post Your Job  
              </DialogTitle>
              <button onClick={close} className="outline-none cursor-pointer border-none p-3 text-xl bg-gray-300 rounded-full">
              <RxCross1/>
              </button>
              </div>

              <Formik onSubmit={onSunmitHandler} validationSchema={validationSchema} initialValues={initialStates}>
               {({values, setFieldValue})=>(
                 <Form className="py-4">
                 <div className="mb-3">
                 <Field name="title" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Job Title " />
                 <ErrorMessage name="title" component="p" className="text-red-500 text-xs" />
                 </div>
                 <div className="mb-3">

                  <label htmlFor="skills" >Skills</label>
        <ul className="flex flex-wrap gap-2">
  {skills.map((skill, index) => (
    <li
      key={index}
      onClick={() => {
        if (values.skills.includes(skill)) {
          const filter_skills = values.skills.filter((cur) => cur !== skill);
          setFieldValue('skills', filter_skills);
        } else {
          setFieldValue('skills', [...values.skills, skill]);
        }
      }}
      className={`px-3 py-2 border border-blue-500 cursor-pointer text-sm rounded-sm text-center break-words min-w-[70px] 
        ${values.skills.includes(skill)
          ? 'bg-blue-500 text-white'
          : 'text-black'
        }`}
    >
      {skill}
    </li>
  ))}
</ul>

                 <ErrorMessage name="skills" component="p" className="text-red-500 text-xs" />
                 </div>

                 <div className="mb-3">
                 <Field name="company_name" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Company Name " />
                 <ErrorMessage name="company_name" component="p" className="text-red-500 text-xs" />
                 </div>

                 <div className="mb-3">
                 <Field type="number" name="salary" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Salary " />
                 <ErrorMessage name="salary" component="p" className="text-red-500 text-xs" />
                 </div>

                 <div className="mb-3">
                 <Field type="date" name="extend_date" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Extend Date " />
                 <ErrorMessage name="salary" component="p" className="text-red-500 text-xs" />
                 </div>

                 <div className="mb-3">
                 <Field type="url" name="job_url" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Job URL " />
                 <ErrorMessage name="job_url" component="p" className="text-red-500 text-xs" />
                 </div>  

                 <div className="mb-3">
                 <Field type="url" name="company_profile_pic" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Company Profile Pic " />
                 <ErrorMessage name="company_profile_pic" component="p" className="text-red-500 text-xs" />
                 </div>

                 <div className="mb-3">
                 <Field as="select" name="job_type" className="w-full py-2 border rounded px-3 outline-none">
                  <option value="">Select Job Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                 </Field>
                 <ErrorMessage name="job_type" component="p" className="text-red-500 text-xs" />
                 </div>

                 <div className="mb-3">
                 <button type="submit" className="w-full py-2 border px-3 outline-none text-white rounded-sm bg-blue-500 cursor-pointer">Post Your Job</button> 
                 </div>
               </Form>
               )}
              </Formik>
         
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default AddJob
