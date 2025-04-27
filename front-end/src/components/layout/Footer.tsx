// Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-black text-white py-8 mt-8">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          {/* Project Name */}
          <h1 className="text-2xl font-bold">Mini CRM</h1>
  
          {/* Contact Info */}
          <div className="text-center text-gray-400 text-sm space-y-1">
            <p>Name: Ramprod Gharmi</p>
            <p>
              Email:{" "}
              <a 
                href="mailto:ram.brmrstu@gmail.com" 
                className="hover:text-white transition-colors"
              >
                ram.brmrstu@gmail.com
              </a>
            </p>
            <p>Address: Madaripur, Dhaka</p>
          </div>
  
          {/* Copyright */}
          <p className="text-gray-600 text-xs mt-4">
            © {currentYear} Mini CRM. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  