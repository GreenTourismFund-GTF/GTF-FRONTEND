import Stats from './Stats';
import FeaturedProjects from './FeaturedProjects';
import Newsletter from './Newsletter';
import Hero from './Hero';

const LandingPage = () =>
{




    return (
        <div className="min-h-screen bg-gradient-to-b w-full from-green-50 to-white">
            <Hero />
            <Stats />
            <FeaturedProjects />
            <Newsletter />
        </div>
    );
};

export default LandingPage;