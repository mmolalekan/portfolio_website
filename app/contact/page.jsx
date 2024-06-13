"use client";

import { useRef } from "react";
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+234) 806 507 5359",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "abdulmuhayminolalekan@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Lagos, Nigeria",
  },
]

const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_8um97cs', 'template_2ujqv43', form.current, {
        publicKey: 'OvlvcOh9uM3Jl1_Zm',
      })
      .then(
        () => {
          alert('Your message is successfully sent!');
        },
        (error) => {
          alert('FAILED...Something went wrong', error.value);
        },
      );
  };
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" }, }} className="py-6">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-accent">Let us work together</h3>
              <p className="text-white/60">Ready to take the next step? Fill out the form below to request my services and I will get back to you shortly!</p>
              {/* input */}
              <div className="grid grids-cols-1 md:grid-cols-2 gap-6">
                <Input type="firstname" name="first_name" placeholder="Firstname" />
                <Input type="lastname" name="last_name" placeholder="Lastname" />
                <Input type="email" name="email" placeholder="Email address" />
                <Input type="phone" name="phone" placeholder="Phone number" />
              </div>
              {/* select */}
              <Select name="service" >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="web_dev">Web development</SelectItem>
                    <SelectItem value="app_dev">Mobile App. development</SelectItem>
                    <SelectItem value="SWE">Software engineering</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* text area */}
              <Textarea name="message" className="h-[200px]" placeholder="Type your message here." />
              {/* btn */}
              <Button size="md" className="max-w-40 h-12">Send message</Button>
            </form>
          </div>
          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact;