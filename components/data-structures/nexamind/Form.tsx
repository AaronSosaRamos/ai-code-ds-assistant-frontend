import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NexaMindSchema } from "@/util/schemas/NexaMindSchema";
import { FaCloudUploadAlt, FaExclamationCircle } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { motion } from "framer-motion";  // Para animaciones

const NexaMindForm = () => {
    const [imageUrl, setImageUrl] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(NexaMindSchema),
    });

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
        console.log(data);
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:bg-gray-900 p-6 overflow-hidden">
            {/* Fondo con animación de líneas sutiles */}
            <div className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-30" style={{ backgroundImage: 'url("/path-to-your-background-pattern.png")' }} />

            {/* Formulario con soporte para modo oscuro */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-white dark:bg-gray-800 dark:text-white shadow-xl rounded-lg p-8 max-w-lg w-full transform transition-all duration-500 hover:shadow-2xl"
            >
                <h2 className="text-3xl font-extrabold text-center mb-8 dark:text-white">NexaMind</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Campo de URL de la Imagen */}
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

                    {/* Preview de la Imagen */}
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

                    {/* Campo de Requirements */}
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

                    {/* Selector de Lenguaje */}
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

                    {/* Botón de Submit */}
                    <motion.button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Submit
                    </motion.button>
                </form>
            </motion.div>

            <ToastContainer />
        </div>
    );
};

export default NexaMindForm;
