import { motion } from "framer-motion";
import { FaServer, FaArrowCircleRight, FaLink, FaCodeBranch, FaCube } from "react-icons/fa";
import { MdOutlineDataObject } from "react-icons/md";
import { GiCircuitry, GiRollingEnergy } from "react-icons/gi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BsFillLayersFill } from "react-icons/bs";

interface ArchitectureDetailsProps {
  architectureData: any;
}

const ArchitectureDetails: React.FC<ArchitectureDetailsProps> = ({ architectureData }) => {
  if (!architectureData) {
    return <div className="text-center">No architecture data available.</div>;
  }

  const { architecture_name, layers, components, data_flow_description } = architectureData;

  return (
    <motion.div
      className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-extrabold text-center text-blue-800 dark:text-blue-300 mb-10">
        Detected Architecture
      </h1>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <FaServer className="mr-2 text-blue-500" /> {architecture_name || "Unknown Architecture"}
      </h2>

      {layers && layers.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <BsFillLayersFill className="mr-2 text-purple-500" /> Layers:
          </h3>
          <ul className="ml-5 mt-2 space-y-2">
            {layers.map((layer: string, index: number) => (
              <li key={index} className="text-lg text-gray-600 dark:text-gray-400 flex items-center">
                <FaCube className="mr-2 text-green-500" /> {layer}
              </li>
            ))}
          </ul>
        </div>
      )}

      {components && components.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <GiCircuitry className="mr-2 text-yellow-500" /> Components:
          </h3>
          {components.map((component: any, index: number) => (
            <motion.div
              key={index}
              className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <MdOutlineDataObject className="mr-2 text-blue-500" /> {component.name || "Unnamed Component"}
              </h4>

              <p className="text-gray-600 dark:text-gray-400 mt-1">{component.description || "No description available."}</p>

              {component.dependencies && component.dependencies.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Dependencies:</span>
                  <ul className="list-disc ml-5 mt-1 text-gray-600 dark:text-gray-400">
                    {component.dependencies.map((dep: string, depIndex: number) => (
                      <li key={depIndex} className="flex items-center">
                        <FaCodeBranch className="mr-2 text-orange-500" /> {dep}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {component.exposed_endpoints && component.exposed_endpoints.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Exposed Endpoints:</span>
                  <ul className="list-disc ml-5 mt-1 text-gray-600 dark:text-gray-400">
                    {component.exposed_endpoints.map((endpoint: string, epIndex: number) => (
                      <li key={epIndex} className="flex items-center">
                        <FaLink className="mr-2 text-indigo-500" /> {endpoint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {component.input_data && component.input_data.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Input Data:</span>
                  <ul className="list-disc ml-5 mt-1 text-gray-600 dark:text-gray-400">
                    {component.input_data.map((input: string, inputIndex: number) => (
                      <li key={inputIndex} className="flex items-center">
                        <HiOutlineExclamationCircle className="mr-2 text-red-500" /> {input}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {component.output_data && component.output_data.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Output Data:</span>
                  <ul className="list-disc ml-5 mt-1 text-gray-600 dark:text-gray-400">
                    {component.output_data.map((output: string, outputIndex: number) => (
                      <li key={outputIndex} className="flex items-center">
                        <FaArrowCircleRight className="mr-2 text-green-500" /> {output}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {data_flow_description && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <GiRollingEnergy className="mr-2 text-pink-500" /> Data Flow Description:
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{data_flow_description}</p>
        </div>
      )}
    </motion.div>
  );
};

export default ArchitectureDetails;
