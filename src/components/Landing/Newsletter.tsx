import { motion } from 'framer-motion'

type Props = {}

const Newsletter = (props: Props) =>
{
    return (
        <section className="py-16 bg-green-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
                    <p className="text-gray-600 mb-8">Join our community and receive updates about new projects and impact stories.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 flex-1 max-w-md"
                        />
                        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>

    )
}

export default Newsletter