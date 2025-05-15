import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactPage = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const form = useRef();

  const sendEmail = (e) => {

      e.preventDefault();
      emailjs.sendForm(
        serviceId, 
        templateId,
        form.current,
        {
          publicKey: publicKey
      })
      .then(
        ()=> {
          console.log("success")
        },
        (error) => {
          console.log("Failed", error.text)
        }
      )

    }

    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center 
                bg-[url(src/assets/home_page/images/contactUs.png)]"
      >
        <div className="rounded-xl p-8 w-[90%] max-w-md shadow-lg text-white">
          <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>
          <form ref={form} className="space-y-4" action="" onSubmit={sendEmail}>
            <div>
              <label className="block text-md mb-1">Name</label>
              <input
                type="text"
                 onChange={(e)=> setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-black focus:outline-[#023E8A]"
              />
            </div>
            <div>
              <label className="block text-md mb-1">Email</label>
              <input
                type="email"
                onChange={(e)=> setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-black focus:outline-[#023E8A]"
              />
            </div>
            <div>
              <label className="block text-md mb-1">Message</label>
              <textarea
                rows="4"
                onChange={(e)=> setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-black focus:outline-[#023E8A]"
              />
            </div>
            <button
              type="submit"
              className="btn btn-xl w-full bg-[#2A6F97] border-none text-white"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ContactPage;
  