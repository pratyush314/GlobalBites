const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Daily Eats. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
