import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NexaMindSchema } from "@/util/schemas/NexaMindSchema";
import { FaCloudUploadAlt, FaExclamationCircle } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { motion } from "framer-motion";
import ArchitectureDetails from './ArchitectureDetails';
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { resetArchitectureData, setArchitectureData } from "@/redux/architectureSlice";
import React from "react";

const CircularSpinner = () => (
    <div className="flex justify-center items-center space-x-2">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

const NexaMindForm = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const architectureData = useSelector((state: RootState) => state.architecture.architectureData);

    React.useEffect(() => {
        console.log('Updated architectureData:', architectureData);
    }, [architectureData]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(NexaMindSchema),
    });

    const result = {
        detected_architecture: {
            architecture_name: "Microservices Architecture",
            layers: ["Presentation", "API Gateway", "Business Logic", "Data"],
            components: [
                {
                    name: "Client UI/UX (React)",
                    description: "The user interface of the application, built using React.",
                    dependencies: ["API Gateway"],
                    type_component: "Service",
                    exposed_endpoints: null,
                    input_data: null,
                    output_data: ["API requests"],
                },
                {
                    name: "Client UI/UX (Angular)",
                    description: "The user interface of the application, built using Angular.",
                    dependencies: ["API Gateway"],
                    type_component: "Service",
                    exposed_endpoints: null,
                    input_data: null,
                    output_data: ["API requests"],
                },
                {
                    name: "Client UI/UX (Vue)",
                    description: "The user interface of the application, built using Vue.",
                    dependencies: ["API Gateway"],
                    type_component: "Service",
                    exposed_endpoints: null,
                    input_data: null,
                    output_data: ["API requests"],
                },
                {
                    name: "API Gateway",
                    description: "A central point of entry for all API requests.",
                    dependencies: [
                        "Load Balancer",
                        "LLM Code Assistant (FastAPI)",
                        "LLM Documentation Builder (FastAPI)",
                        "LLM Advanced RAG Planner (FastAPI)",
                    ],
                    type_component: "Service",
                    exposed_endpoints: [
                        "/code-assistant",
                        "/documentation-builder",
                        "/rag-planner",
                    ],
                    input_data: ["API requests"],
                    output_data: ["API responses"],
                },
                {
                    name: "Load Balancer",
                    description: "Distributes incoming requests across multiple instances of the LLM services.",
                    dependencies: [
                        "LLM Code Assistant (FastAPI)",
                        "LLM Documentation Builder (FastAPI)",
                        "LLM Advanced RAG Planner (FastAPI)",
                    ],
                    type_component: "Service",
                    exposed_endpoints: null,
                    input_data: ["API requests"],
                    output_data: ["API requests"],
                },
                {
                    name: "LLM Code Assistant (FastAPI)",
                    description: "A large language model service that provides code assistance.",
                    dependencies: null,
                    type_component: "Service",
                    exposed_endpoints: ["/code-assistant"],
                    input_data: ["Code prompts"],
                    output_data: ["Generated code"],
                },
                {
                    name: "LLM Documentation Builder (FastAPI)",
                    description: "A large language model service that helps build documentation.",
                    dependencies: null,
                    type_component: "Service",
                    exposed_endpoints: ["/documentation-builder"],
                    input_data: ["Documentation prompts"],
                    output_data: ["Generated documentation"],
                },
                {
                    name: "LLM Advanced RAG Planner (FastAPI)",
                    description: "A large language model service that plans advanced RAG (Retrieval Augmented Generation) tasks.",
                    dependencies: null,
                    type_component: "Service",
                    exposed_endpoints: ["/rag-planner"],
                    input_data: ["RAG planning prompts"],
                    output_data: ["RAG planning results"],
                },
            ],
            external_services: null,
            events: null,
            data_flow_description:
                "Clients send API requests to the API Gateway, which routes them to the Load Balancer. The Load Balancer distributes the requests across multiple instances of the LLM services. Each LLM service processes the request and returns a response to the API Gateway, which then sends the response back to the client.",
        },
        architecture_with_requirements: {
            architecture: {
                architecture_name: "Microservices Architecture",
                layers: ["Presentation", "API Gateway", "Business Logic", "Data"],
                components: [
                    {
                        name: "Client UI/UX (React)",
                        description: "The user interface of the application, built using React.",
                        dependencies: ["API Gateway"],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: null,
                        output_data: ["API requests"]
                    },
                    {
                        name: "Client UI/UX (Angular)",
                        description: "The user interface of the application, built using Angular.",
                        dependencies: ["API Gateway"],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: null,
                        output_data: ["API requests"]
                    },
                    {
                        name: "Client UI/UX (Vue)",
                        description: "The user interface of the application, built using Vue.",
                        dependencies: ["API Gateway"],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: null,
                        output_data: ["API requests"]
                    },
                    {
                        name: "API Gateway",
                        description: "A central point of entry for all API requests.",
                        dependencies: [
                            "Load Balancer",
                            "LLM Code Assistant (FastAPI)",
                            "LLM Documentation Builder (FastAPI)",
                            "LLM Advanced RAG Planner (FastAPI)"
                        ],
                        type_component: "Service",
                        exposed_endpoints: [
                            "/code-assistant",
                            "/documentation-builder",
                            "/rag-planner"
                        ],
                        input_data: ["API requests"],
                        output_data: ["API responses"]
                    },
                    {
                        name: "Load Balancer",
                        description: "Distributes incoming requests across multiple instances of the LLM services.",
                        dependencies: [
                            "LLM Code Assistant (FastAPI)",
                            "LLM Documentation Builder (FastAPI)",
                            "LLM Advanced RAG Planner (FastAPI)"
                        ],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: ["API requests"],
                        output_data: ["API requests"]
                    },
                    {
                        name: "LLM Code Assistant (FastAPI)",
                        description: "A large language model service that provides code assistance.",
                        dependencies: null,
                        type_component: "Service",
                        exposed_endpoints: ["/code-assistant"],
                        input_data: ["Code prompts"],
                        output_data: ["Generated code"]
                    },
                    {
                        name: "LLM Documentation Builder (FastAPI)",
                        description: "A large language model service that helps build documentation.",
                        dependencies: null,
                        type_component: "Service",
                        exposed_endpoints: ["/documentation-builder"],
                        input_data: ["Documentation prompts"],
                        output_data: ["Generated documentation"]
                    },
                    {
                        name: "LLM Advanced RAG Planner (FastAPI)",
                        description: "A large language model service that plans advanced RAG (Retrieval Augmented Generation) tasks.",
                        dependencies: null,
                        type_component: "Service",
                        exposed_endpoints: ["/rag-planner"],
                        input_data: ["RAG planning prompts"],
                        output_data: ["RAG planning results"]
                    }
                ],
                external_services: null,
                events: null,
                data_flow_description: "Clients send API requests to the API Gateway, which routes them to the Load Balancer. The Load Balancer distributes the requests across multiple instances of the LLM services. Each LLM service processes the request and returns a response to the API Gateway, which then sends the response back to the client."
            },
            requirements: [
                {
                    name: "Cross-platform support",
                    description: "El sistema debe permitir que los clientes de React, Angular y Vue interactúen con el backend sin problemas.",
                    must_have_layers: [],
                    must_have_components: [],
                    must_have_services: null,
                    must_handle_events: null
                },
                {
                    name: "Load balancing",
                    description: "El API Gateway debe distribuir las solicitudes de manera equitativa entre los servicios de LLM.",
                    must_have_layers: [],
                    must_have_components: [],
                    must_have_services: null,
                    must_handle_events: null
                },
                {
                    name: "LLM interoperability",
                    description: "Los servicios LLM (Asistente de Código, Generador de Documentación y RAG Avanzado) deben ser accesibles y funcionar correctamente a través de FastAPI.",
                    must_have_layers: [],
                    must_have_components: [
                        "LLM Code Assistant (FastAPI)",
                        "LLM Documentation Builder (FastAPI)",
                        "LLM Advanced RAG Planner (FastAPI)"
                    ],
                    must_have_services: null,
                    must_handle_events: null
                },
                {
                    name: "Scalability",
                    description: "La arquitectura debe manejar incrementos en el volumen de usuarios o solicitudes sin degradación en el rendimiento.",
                    must_have_layers: [],
                    must_have_components: [],
                    must_have_services: null,
                    must_handle_events: null
                },
                {
                    name: "API security",
                    description: "El sistema debe asegurar una autenticación y autorización seguras para los usuarios que accedan a los servicios.",
                    must_have_layers: [],
                    must_have_components: [],
                    must_have_services: null,
                    must_handle_events: null
                }
            ]
        },
        improved_architecture: {
            architecture: {
                architecture_name: "Microservices Architecture",
                layers: ["Presentation", "API Gateway", "Business Logic", "Data"],
                components: [
                    {
                        name: "Client UI/UX (React)",
                        description: "The user interface of the application, built using React.",
                        dependencies: ["API Gateway"],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: null,
                        output_data: ["API requests"]
                    },
                    {
                        name: "Client UI/UX (Angular)",
                        description: "The user interface of the application, built using Angular.",
                        dependencies: ["API Gateway"],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: null,
                        output_data: ["API requests"]
                    },
                    {
                        name: "Client UI/UX (Vue)",
                        description: "The user interface of the application, built using Vue.",
                        dependencies: ["API Gateway"],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: null,
                        output_data: ["API requests"]
                    },
                    {
                        name: "API Gateway",
                        description: "A central point of entry for all API requests.",
                        dependencies: [
                            "Load Balancer",
                            "LLM Code Assistant (FastAPI)",
                            "LLM Documentation Builder (FastAPI)",
                            "LLM Advanced RAG Planner (FastAPI)"
                        ],
                        type_component: "Service",
                        exposed_endpoints: ["/code-assistant", "/documentation-builder", "/rag-planner"],
                        input_data: ["API requests"],
                        output_data: ["API responses"]
                    },
                    {
                        name: "Load Balancer",
                        description: "Distributes incoming requests across multiple instances of the LLM services.",
                        dependencies: [
                            "LLM Code Assistant (FastAPI)",
                            "LLM Documentation Builder (FastAPI)",
                            "LLM Advanced RAG Planner (FastAPI)"
                        ],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: ["API requests"],
                        output_data: ["API requests"]
                    },
                    {
                        name: "LLM Code Assistant (FastAPI)",
                        description: "A large language model service that provides code assistance.",
                        dependencies: null,
                        type_component: "Service",
                        exposed_endpoints: ["/code-assistant"],
                        input_data: ["Code prompts"],
                        output_data: ["Generated code"]
                    },
                    {
                        name: "LLM Documentation Builder (FastAPI)",
                        description: "A large language model service that helps build documentation.",
                        dependencies: null,
                        type_component: "Service",
                        exposed_endpoints: ["/documentation-builder"],
                        input_data: ["Documentation prompts"],
                        output_data: ["Generated documentation"]
                    },
                    {
                        name: "LLM Advanced RAG Planner (FastAPI)",
                        description: "A large language model service that plans advanced RAG (Retrieval Augmented Generation) tasks.",
                        dependencies: null,
                        type_component: "Service",
                        exposed_endpoints: ["/rag-planner"],
                        input_data: ["RAG planning prompts"],
                        output_data: ["RAG planning results"]
                    }
                ],
                external_services: null,
                events: null,
                data_flow_description:
                    "Clients send API requests to the API Gateway, which routes them to the Load Balancer. The Load Balancer distributes the requests across multiple instances of the LLM services. Each LLM service processes the request and returns a response to the API Gateway, which then sends the response back to the client."
            },
            requirements: [
                {
                    name: "Cross-platform support",
                    description:
                        "El sistema debe permitir que los clientes de React, Angular y Vue interactúen con el backend sin problemas.",
                    must_have_layers: [],
                    must_have_components: [],
                    must_have_services: null,
                    must_handle_events: null
                },
                {
                    name: "Load balancing",
                    description: "El API Gateway debe distribuir las solicitudes de manera equitativa entre los servicios de LLM.",
                    must_have_layers: [],
                    must_have_components: [],
                    must_have_services: null,
                    must_handle_events: null
                },
                {
                    name: "LLM interoperability",
                    description:
                        "Los servicios LLM (Asistente de Código, Generador de Documentación y RAG Avanzado) deben ser accesibles y funcionar correctamente a través de FastAPI.",
                    must_have_layers: [],
                    must_have_components: ["LLM Code Assistant (FastAPI)", "LLM Documentation Builder (FastAPI)", "LLM Advanced RAG Planner (FastAPI)"],
                    must_have_services: null,
                    must_handle_events: null
                },
                {
                    name: "Scalability",
                    description:
                        "La arquitectura debe manejar incrementos en el volumen de usuarios o solicitudes sin degradación en el rendimiento.",
                    must_have_layers: [],
                    must_have_components: [],
                    must_have_services: null,
                    must_handle_events: null
                },
                {
                    name: "API security",
                    description:
                        "El sistema debe asegurar una autenticación y autorización seguras para los usuarios que accedan a los servicios.",
                    must_have_layers: [],
                    must_have_components: [],
                    must_have_services: null,
                    must_handle_events: null
                }
            ],
            suggestions: [
                {
                    suggestion: "Implement API Security Layer",
                    details:
                        "Add an Authentication and Authorization layer at the API Gateway to ensure secure access to all services. Consider using OAuth2 or JWT for token-based authentication."
                },
                {
                    suggestion: "Introduce a Service Registry",
                    details:
                        "Implement a service registry (like Consul or Eureka) to facilitate service discovery. This will improve LLM interoperability by allowing services to dynamically discover each other."
                },
                {
                    suggestion: "Add Caching Mechanism",
                    details:
                        "Introduce a caching layer between the API Gateway and the LLM services to improve scalability and performance by reducing redundant calls to the LLM services."
                },
                {
                    suggestion: "Event Handling Mechanism",
                    details:
                        "Establish an event-driven communication mechanism (like Apache Kafka) to handle asynchronous events between services, which will aid in scaling and improving performance."
                },
                {
                    suggestion: "Implement Rate Limiting",
                    details:
                        "Incorporate rate limiting at the API Gateway to control the flow of requests to the LLM services, ensuring that no single service is overwhelmed during peak usage."
                }
            ]
        },
        architecture_with_quality_attributes: {
            architecture: {
                architecture_name: "Microservices Architecture",
                layers: ["Presentation", "API Gateway", "Business Logic", "Data"],
                components: [
                    {
                        name: "Client UI/UX (React)",
                        description: "The user interface of the application, built using React.",
                        dependencies: ["API Gateway"],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: null,
                        output_data: ["API requests"]
                    },
                    {
                        name: "Client UI/UX (Angular)",
                        description: "The user interface of the application, built using Angular.",
                        dependencies: ["API Gateway"],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: null,
                        output_data: ["API requests"]
                    },
                    {
                        name: "Client UI/UX (Vue)",
                        description: "The user interface of the application, built using Vue.",
                        dependencies: ["API Gateway"],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: null,
                        output_data: ["API requests"]
                    },
                    {
                        name: "API Gateway",
                        description: "A central point of entry for all API requests.",
                        dependencies: [
                            "Load Balancer",
                            "LLM Code Assistant (FastAPI)",
                            "LLM Documentation Builder (FastAPI)",
                            "LLM Advanced RAG Planner (FastAPI)"
                        ],
                        type_component: "Service",
                        exposed_endpoints: ["/code-assistant", "/documentation-builder", "/rag-planner"],
                        input_data: ["API requests"],
                        output_data: ["API responses"]
                    },
                    {
                        name: "Load Balancer",
                        description: "Distributes incoming requests across multiple instances of the LLM services.",
                        dependencies: [
                            "LLM Code Assistant (FastAPI)",
                            "LLM Documentation Builder (FastAPI)",
                            "LLM Advanced RAG Planner (FastAPI)"
                        ],
                        type_component: "Service",
                        exposed_endpoints: null,
                        input_data: ["API requests"],
                        output_data: ["API requests"]
                    },
                    {
                        name: "LLM Code Assistant (FastAPI)",
                        description: "A large language model service that provides code assistance.",
                        dependencies: null,
                        type_component: "Service",
                        exposed_endpoints: ["/code-assistant"],
                        input_data: ["Code prompts"],
                        output_data: ["Generated code"]
                    },
                    {
                        name: "LLM Documentation Builder (FastAPI)",
                        description: "A large language model service that helps build documentation.",
                        dependencies: null,
                        type_component: "Service",
                        exposed_endpoints: ["/documentation-builder"],
                        input_data: ["Documentation prompts"],
                        output_data: ["Generated documentation"]
                    },
                    {
                        name: "LLM Advanced RAG Planner (FastAPI)",
                        description: "A large language model service that plans advanced RAG (Retrieval Augmented Generation) tasks.",
                        dependencies: null,
                        type_component: "Service",
                        exposed_endpoints: ["/rag-planner"],
                        input_data: ["RAG planning prompts"],
                        output_data: ["RAG planning results"]
                    }
                ],
                external_services: null,
                events: null,
                data_flow_description:
                    "Clients send API requests to the API Gateway, which routes them to the Load Balancer. The Load Balancer distributes the requests across multiple instances of the LLM services. Each LLM service processes the request and returns a response to the API Gateway, which then sends the response back to the client."
            },
            quality_attributes: [
                {
                    attribute_name: "Scalability",
                    current_status: "Partially Implemented",
                    priority: 4,
                    description:
                        "The architecture can handle increased requests through load balancing but lacks additional mechanisms like caching or rate limiting to enhance scalability.",
                    implementation_details:
                        "Load balancing is implemented to distribute requests, but further enhancements like caching and rate limiting are suggested."
                },
                {
                    attribute_name: "Security",
                    current_status: "Not Implemented",
                    priority: 5,
                    description: "There is no current implementation of security measures for API access.",
                    implementation_details:
                        "It is suggested to implement an Authentication and Authorization layer at the API Gateway to secure access to services."
                },
                {
                    attribute_name: "Performance",
                    current_status: "Partially Implemented",
                    priority: 4,
                    description:
                        "The architecture can perform adequately under normal load, but optimizations are suggested to improve performance.",
                    implementation_details:
                        "Adding a caching mechanism and rate limiting could enhance performance by reducing redundant calls and controlling request flow."
                },
                {
                    attribute_name: "Maintainability",
                    current_status: "Partially Implemented",
                    priority: 3,
                    description:
                        "The microservices architecture allows for some level of maintainability, but lacks a service registry for improved service discovery.",
                    implementation_details:
                        "Introducing a service registry could enhance maintainability by facilitating service discovery."
                }
            ],
            quality_evaluation: {
                Scalability: 2,
                Security: 0,
                Performance: 2,
                Maintainability: 2
            }
        }
    };

    const onSubmit = (data: any) => {
        toast.success("Form submitted successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        setLoading(true);

        setTimeout(() => {
            dispatch(resetArchitectureData());

            setTimeout(() => {
                dispatch(setArchitectureData(result));
            }, 500);

            setLoading(false);
            setShowDetails(true);
        }, 2000);
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:bg-gray-900 p-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-30" style={{ backgroundImage: 'url("/path-to-your-background-pattern.png")' }} />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-white dark:bg-gray-800 dark:text-white shadow-xl rounded-lg p-8 max-w-lg w-full transform transition-all duration-500 hover:shadow-2xl"
            >
                <h2 className="text-3xl font-extrabold text-center mb-8 dark:text-white">NexaMind</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="imageUrl" className="font-medium flex items-center dark:text-white">
                            <FaCloudUploadAlt className="mr-2 text-xl text-blue-500" /> Image URL
                        </label>
                        <input
                            id="imageUrl"
                            type="text"
                            {...register('imageUrl')}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={`border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'} rounded-md p-2 mt-1 w-full bg-white dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 transition-all`}
                        />
                        {errors.imageUrl?.message && (
                            <p className="text-red-400 text-sm flex items-center mt-2">
                                <FaExclamationCircle className="mr-1" /> {String(errors.imageUrl.message)}
                            </p>
                        )}
                    </div>

                    {imageUrl && (
                        <Suspense fallback={<div>Loading image...</div>}>
                            <motion.img
                                src={imageUrl}
                                alt="Preview"
                                className="mt-4 w-full object-cover rounded-md h-64 transition-transform duration-500 transform hover:scale-105 shadow-md"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </Suspense>
                    )}

                    <div className="flex flex-col">
                        <label htmlFor="requirements" className="font-medium flex items-center dark:text-white">
                            <FaExclamationCircle className="mr-2 text-xl text-blue-500" /> Requirements
                        </label>
                        <textarea
                            id="requirements"
                            {...register('requirements')}
                            rows={4}
                            className={`border ${errors.requirements ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'} rounded-md p-2 mt-1 w-full bg-white dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 transition-all`}
                        ></textarea>
                        {errors.requirements?.message && (
                            <p className="text-red-400 text-sm flex items-center mt-2">
                                <FaExclamationCircle className="mr-1" /> {String(errors.requirements.message)}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="language" className="font-medium flex items-center dark:text-white">
                            <IoLanguage className="mr-2 text-xl text-blue-500" /> Language
                        </label>
                        <select
                            id="language"
                            {...register('language')}
                            className={`border ${errors.language ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'} rounded-md p-2 mt-1 w-full bg-white dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 transition-all`}
                        >
                            <option value="">Select Language</option>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="pt">Portuguese</option>
                        </select>
                        {errors.language && (
                            <p className="text-red-400 text-sm flex items-center mt-2">
                                <FaExclamationCircle className="mr-1" /> Select a valid language
                            </p>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Submit
                    </motion.button>

                    {loading ? null : showDetails && (
                        <>
                            <motion.button
                                type="button"
                                onClick={() => {
                                    console.log(architectureData);
                                    router.push('/nexamind/architecture-with-requirements');
                                }}
                                className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 hover:shadow-lg transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Go to Architecture with Requirements
                            </motion.button>
                        </>
                    )}
                </form>
            </motion.div>

            <div className="mt-10 w-full max-w-5xl">
                {loading ? (
                    <CircularSpinner />
                ) : showDetails ? (
                    <Suspense fallback={<CircularSpinner />}>
                        <ArchitectureDetails architectureData={architectureData?.detected_architecture} />
                    </Suspense>
                ) : null}
            </div>
            <ToastContainer />
        </div>
    );
};

export default NexaMindForm;
