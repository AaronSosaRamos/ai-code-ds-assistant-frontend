import { motion } from 'framer-motion';
import { FaServer, FaList, FaCheckCircle, FaCog } from 'react-icons/fa';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

const ArchitectureWithQualityAttributes = () => {
    const data = useSelector((state: RootState) => state.architecture?.architectureData);
    const router = useRouter();

    if (!data) {
        return <p className="text-center text-gray-800 dark:text-gray-100">No architecture data available.</p>;
    }

    const { architecture, quality_attributes, quality_evaluation } = data?.architecture_with_quality_attributes;

    return (
        <motion.div
            className="p-8 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 shadow-lg rounded-lg max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl font-extrabold text-center text-blue-800 dark:text-blue-300 mb-10">
                Architecture with Quality Attributes
            </h1>
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6 flex items-center justify-center">
                <FaServer className="mr-3 text-indigo-500" /> {architecture?.architecture_name || 'Unknown Architecture'}
            </h2>

            {architecture?.layers && (
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center">
                        Layers
                    </h3>
                    <ul className="list-disc ml-5 space-y-2 text-blue-600 dark:text-blue-200">
                        {architecture?.layers.map((layer: string, index: number) => (
                            <li key={index}>{layer}</li>
                        ))}
                    </ul>
                </div>
            )}

            {architecture?.components && (
                <div className="mb-10">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center">
                        Components
                    </h3>
                    {architecture?.components.map((component: any, index: number) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                        >
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                                <FaList className="mr-2 text-pink-500" /> {component.name || 'Unnamed Component'}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">{component.description || 'No description available.'}</p>
                            {component.dependencies && component.dependencies.length > 0 && (
                                <div className="mt-3">
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">Dependencies:</span>
                                    <ul className="list-disc ml-5 space-y-2 text-gray-600 dark:text-gray-400">
                                        {component.dependencies.map((dep: string, depIndex: number) => (
                                            <li key={depIndex}>{dep}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}

            {architecture?.data_flow_description && (
                <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 flex items-center mb-4">
                        <HiOutlineInformationCircle className="mr-2 text-yellow-500" /> Data Flow Description
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">{architecture?.data_flow_description}</p>
                </div>
            )}

            {quality_attributes && (
                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6 flex items-center">
                        <FaCheckCircle className="mr-3 text-green-500" /> Quality Attributes
                    </h2>

                    {quality_attributes.map((attribute: any, index: number) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                        >
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                                <FaCheckCircle className="mr-2 text-green-500" /> {attribute?.attribute_name || 'Unnamed Attribute'}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">{attribute?.description || 'No description available.'}</p>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Priority: {attribute.priority}</p>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Current Status: {attribute.current_status}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            {quality_evaluation && (
                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6 flex items-center">
                        <FaCog className="mr-3 text-blue-500" /> Quality Evaluation
                    </h2>
                    <motion.div
                        className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {Object.entries(quality_evaluation).map(([key, value]: any) => (
                            <div key={key} className="mb-4">
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{key}</h4>
                                <p className="text-gray-600 dark:text-gray-400">Score: {value}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}

            <motion.button
                type="button"
                onClick={() => {
                    router.push('/nexamind');
                }}
                className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Submit another Software Architecture assistance
            </motion.button>
        </motion.div>
    );
};

export default ArchitectureWithQualityAttributes;
