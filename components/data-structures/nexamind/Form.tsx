import axios from 'axios';
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

    const formatRequirements = (requirements: string) => {
        return requirements.replace(/\n/g, "\\n");
    };

    const onSubmit = async (data: any) => {
        setLoading(true);

        const formattedData = {
            ...data,
            requirements: formatRequirements(data.requirements)
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/software-architecture-assistant`,
                formattedData,
                {
                    headers: {
                        'api-key': process.env.NEXT_PUBLIC_API_KEY,
                    },
                }
            );

            toast.success("Response generated successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            dispatch(resetArchitectureData());
            dispatch(setArchitectureData(response.data));

            setShowDetails(true);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            toast.error("Failed to submit the form. Please try again.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setLoading(false);
        }
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
                        <label htmlFor="img_url" className="font-medium flex items-center dark:text-white">
                            <FaCloudUploadAlt className="mr-2 text-xl text-blue-500" /> Image URL
                        </label>
                        <input
                            id="img_url"
                            type="text"
                            {...register('img_url')}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={`border ${errors.img_url ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'} rounded-md p-2 mt-1 w-full bg-white dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 transition-all`}
                        />
                        {errors.img_url?.message && (
                            <p className="text-red-400 text-sm flex items-center mt-2">
                                <FaExclamationCircle className="mr-1" /> {String(errors.img_url.message)}
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
                        <label htmlFor="lang" className="font-medium flex items-center dark:text-white">
                            <IoLanguage className="mr-2 text-xl text-blue-500" /> Language
                        </label>
                        <select
                            id="lang"
                            {...register('lang')}
                            className={`border ${errors.lang ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'} rounded-md p-2 mt-1 w-full bg-white dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 transition-all`}
                        >
                            <option value="">Select Language</option>
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="pt">Portuguese</option>
                        </select>
                        {errors.lang && (
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
