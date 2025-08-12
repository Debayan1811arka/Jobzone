// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { RxCross1 } from "react-icons/rx";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { axiosClient } from './../../../utils/utils';
import { toast } from 'react-toastify';
import { useJobContext } from '../../../context/JobContext';

const AddJob = () => {
  let [isOpen, setIsOpen] = useState(false)
  const { fetchAllJobs } = useJobContext()

  const initialStates = {
    title: '',
    skills: [],
    company_name: '',
    salary: 0,
    extend_date: new Date(),
    job_url: '',
    company_profile_pic: '',
    job_type: ''
  }

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    skills: yup.array().of(yup.string()).min(1, 'At least one skill is required'),
    company_name: yup.string().required('Company name is required'),
    salary: yup.number().positive().required('Salary is required'),
    extend_date: yup.date().required('Extend date is required'),
    job_url: yup.string().url().required('Job URL is required'),
    company_profile_pic: yup.string().url().required('Company Profile Pic is required'),
    job_type: yup.string().required('Job type is required')
  })

  const onSunmitHandler = async (values, helpers) => {
    try {
      const response = await axiosClient.post("/create", values)
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
      {/* Add Job Button */}
      <div className="mb-3 flex justify-end">
        <button
          onClick={open}
          className='px-3 py-2 border-none outline-none text-white rounded-sm bg-blue-500 mx-5.5 cursor-pointer'>
          Add Job
        </button>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-[30vh] items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white border p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between">
                <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                  Post Your Job
                </DialogTitle>
                <button onClick={close} className="outline-none cursor-pointer border-none p-3 text-xl bg-gray-300 rounded-full">
                  <RxCross1 />
                </button>
              </div>

              {/* Form */}
              <Formik onSubmit={onSunmitHandler} validationSchema={validationSchema} initialValues={initialStates}>
                {({ values, setFieldValue }) => {
                  const [skillInput, setSkillInput] = useState("");

                  const addSkill = () => {
                    const newSkill = skillInput.trim();
                    if (newSkill && !values.skills.includes(newSkill)) {
                      setFieldValue('skills', [...values.skills, newSkill]);
                    }
                    setSkillInput("");
                  };

                  const removeSkill = (skill) => {
                    setFieldValue('skills', values.skills.filter((s) => s !== skill));
                  };

                  const handleKeyDown = (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  };

                  return (
                    <Form className="py-4">
                      {/* Job Title */}
                      <div className="mb-3">
                        <Field name="title" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Job Title " />
                        <ErrorMessage name="title" component="p" className="text-red-500 text-xs" />
                      </div>

                      {/* Skills - LinkedIn style */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2 my-2">
                          {values.skills.map((skill, index) => (
                            <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                              {skill}
                              <span
                                onClick={() => removeSkill(skill)}
                                className="ml-2 cursor-pointer font-bold"
                              >
                                ×
                              </span>
                            </div>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type a skill and press Enter"
                          className="w-full py-2 border rounded px-3 outline-none"
                        />
                        <ErrorMessage name="skills" component="p" className="text-red-500 text-xs" />
                      </div>

                      {/* Company Name */}
                      <div className="mb-3">
                        <Field name="company_name" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Company Name " />
                        <ErrorMessage name="company_name" component="p" className="text-red-500 text-xs" />
                      </div>

                      {/* Salary */}
                      <div className="mb-3">
                        <Field type="number" name="salary" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Salary " />
                        <ErrorMessage name="salary" component="p" className="text-red-500 text-xs" />
                      </div>

                      {/* Extend Date */}
                      <div className="mb-3">
                        <Field type="date" name="extend_date" className="w-full py-2 border rounded px-3 outline-none" />
                        <ErrorMessage name="extend_date" component="p" className="text-red-500 text-xs" />
                      </div>

                      {/* Job URL */}
                      <div className="mb-3">
                        <Field type="url" name="job_url" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Job URL " />
                        <ErrorMessage name="job_url" component="p" className="text-red-500 text-xs" />
                      </div>

                      {/* Company Profile Pic */}
                      <div className="mb-3">
                        <Field type="url" name="company_profile_pic" className="w-full py-2 border rounded px-3 outline-none" placeholder="Enter Company Profile Pic " />
                        <ErrorMessage name="company_profile_pic" component="p" className="text-red-500 text-xs" />
                      </div>

                      {/* Job Type */}
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

                      {/* Submit Button */}
                      <div className="mb-3">
                        <button type="submit" className="w-full py-2 border px-3 outline-none text-white rounded-sm bg-blue-500 cursor-pointer">
                          Post Your Job
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default AddJob;
