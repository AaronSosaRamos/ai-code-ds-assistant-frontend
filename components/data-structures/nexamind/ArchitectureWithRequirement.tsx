import { motion } from "framer-motion";
import { FaServer, FaList, FaCheckCircle } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";

interface ArchitectureWithRequirementsProps {
  data: any;
}

const ArchitectureWithRequirements: React.FC<ArchitectureWithRequirementsProps> = ({ data }) => {
  const { architecture, requirements } = data;

  return (
    <motion.div
      className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <FaServer className="mr-2 text-blue-500" /> {architecture.architecture_name || "Unknown Architecture"}
      </h2>

      {architecture.layers && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Layers:</h3>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            {architecture.layers.map((layer: string, index: number) => (
              <li key={index} className="text-gray-600 dark:text-gray-400">{layer}</li>
            ))}
          </ul>
        </div>
      )}

      {architecture.components && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Components:</h3>
          {architecture.components.map((component: any, index: number) => (
            <motion.div
              key={index}
              className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                <FaList className="mr-2 text-green-500" /> {component.name || "Unnamed Component"}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{component.description || "No description available."}</p>
            </motion.div>
          ))}
        </div>
      )}

      {architecture.data_flow_description && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <HiOutlineInformationCircle className="mr-2 text-indigo-500" /> Data Flow Description:
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{architecture.data_flow_description}</p>
        </div>
      )}

      {requirements && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <FaCheckCircle className="mr-2 text-blue-500" /> Requirements
          </h2>

          {requirements.map((requirement: any, index: number) => (
            <motion.div
              key={index}
              className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                <FaCheckCircle className="mr-2 text-green-500" /> {requirement.name || "Unnamed Requirement"}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{requirement.description || "No description available."}</p>
              {requirement.must_have_components && requirement.must_have_components.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Must Have Components:</span>
                  <ul className="list-disc ml-5 mt-1 text-gray-600 dark:text-gray-400">
                    {requirement.must_have_components.map((component: string, index: number) => (
                      <li key={index}>{component}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ArchitectureWithRequirements;
