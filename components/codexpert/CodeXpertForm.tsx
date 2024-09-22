import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaCode, FaLaptopCode, FaRobot, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  programming_language: z.string().min(1, { message: "Programming language is required" }),
  is_ai_related: z.union([z.boolean(), z.string()]).transform(value => value === 'yes'),
  context: z.string().min(1, { message: "Context is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

const CodeXpertForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    toast.success("Form submitted successfully! ✅");
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen transition-all duration-500 ease-in-out bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-xl p-8 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-6 animate-fade-in flex items-center space-x-2">
          <FaLaptopCode /> <span>Code Optimization Form - CodeXpert 💻</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-slide-up">
          <div>
            <label className="block text-sm font-medium flex items-center space-x-2">
              <FaCode /> <span>Code 📝</span>
            </label>
            <textarea 
              {...register("code")}
              rows={4}
              className={`mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-all duration-300 ease-in-out ${errors.code ? "border-red-500" : "border-gray-300"} bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Enter your code here"
            />
            {errors.code && <p className="text-red-500 text-sm flex items-center"><FaTimesCircle className="mr-2" /> {errors.code.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium flex items-center space-x-2">
              <FaLaptopCode /> <span>Programming Language 💻</span>
            </label>
            <input 
              {...register("programming_language")}
              className={`mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-all duration-300 ease-in-out ${errors.programming_language ? "border-red-500" : "border-gray-300"} bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="e.g., Python, Java"
            />
            {errors.programming_language && <p className="text-red-500 text-sm flex items-center"><FaTimesCircle className="mr-2" /> {errors.programming_language.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium flex items-center space-x-2">
              <FaRobot /> <span>Is this AI-related code? 🤖</span>
            </label>
            <div className="mt-2 flex items-center">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="yes"
                  {...register("is_ai_related")}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  value="no"
                  {...register("is_ai_related")}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium flex items-center space-x-2">
              <FaCheckCircle /> <span>Context 🖋️</span>
            </label>
            <textarea 
              {...register("context")}
              rows={3}
              className={`mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 transition-all duration-300 ease-in-out ${errors.context ? "border-red-500" : "border-gray-300"} bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Describe the problem of your code"
            />
            {errors.context && <p className="text-red-500 text-sm flex items-center"><FaTimesCircle className="mr-2" /> {errors.context.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Submit 🚀</span>
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CodeXpertForm;
