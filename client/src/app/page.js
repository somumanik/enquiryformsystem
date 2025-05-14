'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  // ab ek enquiry table ko fill karne ka state banayenge
  let [enquiryList, setEnquiryList] = useState([])

  // Har Ek input Value ka state banana

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')

  let saveEnquiry = (e) => {
    e.preventDefault()
    let obj = {
      name,
      email,
      phone
    }
    axios.post('http://localhost:8000/enquiryform/save', obj)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes)
        if (finalRes.status) {
          toast.success(finalRes.msg)
          setEmail('')
          setName('')
          setPhone('')
          getEnquiry()
        }
      })

  }

  let getEnquiry = () => {
    axios.get('http://localhost:8000/enquiryform/view')
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes)
        setEnquiryList(finalRes.data)
      })
  }

  useEffect(() => {
    getEnquiry()
  }, [])

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-[30%_auto] my-12 gap-8 shadow-2xl w-full max-w-[1320px] mx-auto">
        {/* Form Section */}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Contact Form</h2>
          <form onSubmit={saveEnquiry} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Enquiry Table</h2>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                enquiryList.length >= 1
                  ?
                  enquiryList.map((items, index) => {
                    return (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                        <td className="border border-gray-300 px-4 py-2">{items.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{items.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{items.phone}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 mr-2">
                            Delete
                          </button>
                          <button className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">
                            Edit
                          </button>
                        </td>
                      </tr>
                    )
                  })


                  :
                  <tr>
                    <td colSpan={6}>
                      No Data Found
                    </td>
                  </tr>

              }

            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}
