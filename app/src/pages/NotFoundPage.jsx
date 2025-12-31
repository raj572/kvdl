import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
      useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-4 text-center">
      <h1 className="text-7xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! This page doesn’t exist.</p>

      <Link
        to="/"
        className="px-6 py-3 bg-primary text-background rounded-full font-medium hover:bg-primary/80 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
