


export default function Footer() {
    return (
        <footer className="bg-[#2A6F97] font-serif text-white px-6 py-4 w-full">
            <div className="flex flex-col items-center">
                {/* Horizontal Line */}
                <div className="border-t border-white w-full my-2" />
  
                {/* Navigation Links and Copyright */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-2">
                    
                    <span className="text-center md:text-left">
                        © 2025 Health Consultancy. All rights reserved.
                    </span>
  
                    <div className="flex justify-center gap-4">
                        <a href="/terms" className="link link-hover">
                            Terms
                        </a>
                        <a href="/privacy" className="link link-hover">
                            Privacy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
  }
  