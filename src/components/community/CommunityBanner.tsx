import natural from "../../assets/about/natural_env.png";
import members from "../../assets/about/members.png";
import conserve from "../../assets/about/conserve.png";
import tour from "../../assets/about/tour.png";
import green from "../../assets/about/green.png";
import { Link } from "react-router-dom";

const CommunityBanner = () =>
{
  return (
    <div className="relative bg-gradient-to-r from-green-900 to-emerald-950 text-white overflow-hidden">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Decorative Circles - Responsive sizes */}
      <div className="absolute -left-12 -top-12 md:-left-24 md:-top-24 w-48 md:w-96 h-48 md:h-96 bg-emerald-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -right-12 -bottom-12 md:-right-24 md:-bottom-24 w-48 md:w-96 h-48 md:h-96 bg-green-700/20 rounded-full blur-3xl"></div>

      {/* Image Grid - Responsive layout */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-4 md:p-8 h-full">
          <img src={natural} alt="Community member" className="w-full h-24 md:h-48 object-cover rounded-lg" />
          <img src={tour} alt="Sustainable project" className="w-full h-24 md:h-48 object-cover rounded-lg mt-6 md:mt-12" />
          <img src={green} alt="Eco tourism" className="w-full h-24 md:h-48 object-cover rounded-lg hidden md:block" />
          <img src={natural} alt="Green initiative" className="w-full h-24 md:h-48 object-cover rounded-lg mt-6 md:mt-12 hidden md:block" />
        </div>
      </div>

      {/* Floating Elements - Hidden on mobile, visible on larger screens */}
      <div className="absolute inset-0">
        <div className="relative h-full max-w-7xl mx-auto">
          <div className="absolute left-8 top-1/4 hidden lg:block">
            <img
              src={members}
              alt="Community gathering"
              className="w-32 xl:w-48 h-32 xl:h-48 object-cover rounded-full border-4 border-white/20 shadow-lg"
            />
          </div>

          <div className="absolute right-8 top-1/3 hidden lg:block">
            <img
              src={conserve}
              alt="Nature conservation"
              className="w-28 xl:w-40 h-28 xl:h-40 object-cover rounded-full border-4 border-white/20 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content - Responsive padding and text sizes */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex items-center justify-center min-h-[300px] md:min-h-[450px]">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-50">
            Join the Green Tourism Revolution
          </h1>
          <p className="text-lg sm:text-xl text-green-50 mb-6 md:mb-8 px-4 sm:px-0">
            Connect with eco-conscious travelers, support sustainable projects, and make a real impact on global tourism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <button className="w-full sm:w-auto bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200 shadow-lg">
              <Link to={"/create"} className="text-green-600 hover:text-green-500">Start a Project </Link>
            </button>
            <button className="w-full sm:w-auto border border-white bg-emerald-950/50 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 shadow-lg">
              <Link to={"/projects"} className="text-white hover:text-gray-50"> Explore Projects </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityBanner;