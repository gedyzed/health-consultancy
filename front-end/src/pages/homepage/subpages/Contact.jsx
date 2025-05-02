const ContactPage = () => {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center 
                bg-[url(src/assets/home_page/images/contactUs.png)]"
      >
        <div className="rounded-xl p-8 w-[90%] max-w-md shadow-lg text-white">
          <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>
          <form className="space-y-4" action="">
            <div>
              <label className="block text-md mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-black focus:outline-[#023E8A]"
              />
            </div>
            <div>
              <label className="block text-md mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-black focus:outline-[#023E8A]"
              />
            </div>
            <div>
              <label className="block text-md mb-1">Message</label>
              <textarea
                rows="4"
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
  