import React, { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaCode, FaRobot, FaClipboardList, FaWrench, FaLightbulb, FaCopy } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Transition } from "@headlessui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import axios from "axios";

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

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null);

  const onSubmit = async (data: FormSchema) => {
    setLoading(true);
    const formattedData = {
      code: data.code,
      programming_language: data.programming_language,
      is_ai_related: data.is_ai_related,
      context: data.context,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/codexpert`, 
        formattedData,
        {
          headers: {
            'api-key': process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      setResults(response.data);
      toast.success("Results loaded! 🎉");
    } catch (error) {
      toast.error("An error occurred! ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen transition-all duration-500 ease-in-out bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-xl p-8 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-6 animate-fade-in flex items-center space-x-2">
          <FaCheckCircle /> <span>Code Optimization Form - CodeXpert</span>
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
              <FaCheckCircle /> <span>Programming Language 💻</span>
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
              className={`px-6 py-2 font-medium text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 flex items-center space-x-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : <span>Submit 🚀</span>}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />

      {results && (
        <Results data={results} />
      )}
    </div>
  );
};

const Results = ({ data }: any) => {
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  const handleCopy = async () => {
    if (data?.optimized_code?.optimized_code) {
      try {
        await navigator.clipboard.writeText(data.optimized_code.optimized_code);
        setCopyStatus("Copied!");
        setTimeout(() => {
          setCopyStatus("Copy Code");
        }, 2000); 
      } catch (err) {
        setCopyStatus("Failed to Copy");
      }
    }
  };

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className="mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl">
        <h3 className="text-3xl font-bold mb-4 flex items-center">
          <FaClipboardList className="text-indigo-600 mr-2" />
          Code Evaluation Results 📝
        </h3>

        <div className="mb-6 text-lg">
          <p className="mb-2">
            <strong className="text-indigo-600">Programming Language: </strong>
            <span className="text-gray-800 dark:text-gray-200">
              {data?.programming_language || "N/A"}
            </span>
          </p>
          <p className="mb-2">
            <strong className="text-indigo-600">Context: </strong>
            <span className="text-gray-800 dark:text-gray-200">
              {data?.context || "N/A"}
            </span>
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold flex items-center">
            <FaCode className="text-yellow-500 mr-2" />
            Original Code
          </h4>
          <SyntaxHighlighter language="python" style={darcula}>
            {data?.code || "# No code provided"}
          </SyntaxHighlighter>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            Code Evaluation
          </h4>
          <p className="mt-2 text-lg">
            <strong>Works: </strong>
            {data?.code_evaluation?.works !== undefined ? (
              data.code_evaluation.works ? (
                <span className="text-green-500">Yes</span>
              ) : (
                <span className="text-red-500">No</span>
              )
            ) : (
              "N/A"
            )}
          </p>
          <ul className="mt-3 list-disc list-inside text-red-500">
            {data?.code_evaluation?.errors ? (
              data.code_evaluation.errors.map((error: string, idx: number) => (
                <li key={idx} className="mb-1">
                  <FaTimesCircle className="inline mr-2" /> {error}
                </li>
              ))
            ) : (
              <li>No errors provided</li>
            )}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold flex items-center">
            <FaWrench className="text-blue-500 mr-2" />
            Refactoring Suggestions
          </h4>
          <ul className="mt-3 list-disc list-inside text-gray-800 dark:text-gray-200">
            {data?.refactoring_suggestions?.suggestions ? (
              data.refactoring_suggestions.suggestions.map(
                (suggestion: string, idx: number) => (
                  <li key={idx} className="mb-2">
                    <FaLightbulb className="inline text-yellow-500 mr-2" />{" "}
                    {suggestion}
                  </li>
                )
              )
            ) : (
              <li>No refactoring suggestions provided</li>
            )}
          </ul>

          <h4 className="mt-6 text-xl font-semibold">Rationale:</h4>
          <ul className="mt-2 list-disc list-inside text-gray-800 dark:text-gray-200">
            {data?.refactoring_suggestions?.rationale ? (
              data.refactoring_suggestions.rationale.map(
                (rationale: string, idx: number) => (
                  <li key={idx} className="mb-2">
                    <FaCheckCircle className="inline text-green-500 mr-2" />{" "}
                    {rationale}
                  </li>
                )
              )
            ) : (
              <li>No rationale provided</li>
            )}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold flex items-center justify-between">
            <span className="flex items-center">
              <FaCode className="text-green-600 mr-2" />
              Optimized Code
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow hover:bg-indigo-700 transition-transform transform hover:scale-105"
              disabled={!data?.optimized_code?.optimized_code}
            >
              <FaCopy className="mr-2" />
              {copyStatus}
            </button>
          </h4>
          <SyntaxHighlighter language="python" style={darcula}>
            {data?.optimized_code?.optimized_code || "# No optimized code provided"}
          </SyntaxHighlighter>
        </div>

        <div>
          <h4 className="text-2xl font-semibold flex items-center">
            <FaClipboardList className="text-indigo-600 mr-2" />
            Quality Attributes Applied
          </h4>
          <ul className="mt-3 list-disc list-inside text-gray-800 dark:text-gray-200">
            {data?.quality_attributes_application?.attributes_applied ? (
              data.quality_attributes_application.attributes_applied.map(
                (attribute: string, idx: number) => (
                  <li key={idx} className="mb-2">
                    <FaCheckCircle className="inline text-green-500 mr-2" />{" "}
                    {attribute}
                  </li>
                )
              )
            ) : (
              <li>No quality attributes applied</li>
            )}
          </ul>

          <h4 className="mt-6 text-xl font-semibold">Improvements Achieved:</h4>
          <ul className="mt-2 list-disc list-inside text-gray-800 dark:text-gray-200">
            {data?.quality_attributes_application?.improvements_achieved ? (
              data.quality_attributes_application.improvements_achieved.map(
                (improvement: string, idx: number) => (
                  <li key={idx} className="mb-2">
                    <FaCheckCircle className="inline text-green-500 mr-2" />{" "}
                    {improvement}
                  </li>
                )
              )
            ) : (
              <li>No improvements achieved</li>
            )}
          </ul>
        </div>
      </div>
    </Transition>
  );
};

export default CodeXpertForm;
