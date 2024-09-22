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

// Zod schema for form validation
const formSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
  programming_language: z.string().min(1, { message: "Programming language is required" }),
  is_ai_related: z.union([z.boolean(), z.string()]).transform(value => value === 'yes'),
  context: z.string().min(1, { message: "Context is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

// Mock function simulating an API call
const mockSubmission = (isAI: boolean) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (isAI) {
        // AI-related data
        resolve({
          code: `import tensorflow as tf\nimport numpy as np\n\nclass BadNeuralNetwork:\n    def __init__(self):\n        self.model = tf.keras.Sequential([\n            tf.keras.layers.Dense(64, input_shape=(784,)),  \n            tf.keras.layers.Dense(32), \n            tf.keras.layers.Dense(10) \n        ])\n\n    def compile(self):\n        self.model.compile(optimizer=None, loss=None)  \n\n    def train(self, X_train, y_train):\n        self.model.fit(X_train, y_train, epochs=10)  \n\ny_train = np.random.random((100, 10))  \n\nnn = BadNeuralNetwork()\n\nnn.compile()\n\nnn.train(X_train, y_train)`,
          programming_language: "python",
          is_ai_related: true,
          context: "This is a bad implementation of a neural network using TensorFlow with multiple issues including missing activation functions, optimizer, loss function, and incorrect data dimensions.",
          code_evaluation: {
            works: false,
            errors: [
              "Missing optimizer in model compilation.",
              "Missing loss function in model compilation.",
              "The variable 'X_train' is not defined before use in 'nn.train(X_train, y_train)'.",
              "No activation function is specified for the Dense layers.",
              "The shape of 'y_train' should match the output shape of the network (10 classes), but it needs to be one-hot encoded or categorical in practice."
            ],
          },
          refactoring_suggestions: {
            suggestions: [
              "Define the optimizer and loss function in the compile method.",
              "Add activation functions to the Dense layers to improve network performance.",
              "Ensure 'X_train' is defined with the appropriate shape and type before calling train.",
              "One-hot encode 'y_train' to match the output of the network.",
              "Use a proper data preprocessing step to prepare 'X_train' and 'y_train'."
            ],
            rationale: [
              "Specifying an optimizer and loss function is essential for model training, allowing the model to learn effectively.",
              "Activation functions introduce non-linearity, which is crucial for the network to learn complex patterns.",
              "'X_train' must be defined for the training process to work; otherwise, it will result in a runtime error.",
              "One-hot encoding 'y_train' ensures that the labels match the output layer's expected shape, which is necessary for correct training.",
              "Data preprocessing ensures that the input features are properly scaled and shaped, which improves training efficiency and model performance."
            ],
          },
          design_pattern_research: {
            design_pattern_applicable: true,
            pattern_name: "Procedural Design Pattern",
            resources_found: {
              "1": "https://www.oreilly.com/library/view/deep-learning-patterns/9781617298264/OEBPS/Text/05.htm",
              "2": "https://arxiv.org/abs/1611.00847"
            }
          },
          quality_attributes_application: {
            attributes_applied: ["SOLID principles", "DRY", "KISS"],
            improvements_achieved: [
              "Applying SOLID principles, particularly the Single Responsibility Principle, enhances maintainability by ensuring that each method has a distinct purpose, such as separating the model compilation and training logic.",
              "The DRY (Don't Repeat Yourself) principle helps avoid code duplication by encouraging the reuse of components like the model definition and preprocessing steps, which simplifies future updates and reduces the chance of errors.",
              "KISS promotes simplicity in code design, making it easier for developers to read and understand the code."
            ],
          },
          optimized_code: {
            optimized_code: `import tensorflow as tf\nimport numpy as np\nfrom sklearn.preprocessing import OneHotEncoder\n\nclass OptimizedNeuralNetwork:\n    def __init__(self):\n        self.model = tf.keras.Sequential([\n            tf.keras.layers.Dense(64, activation='relu', input_shape=(784,)),\n            tf.keras.layers.Dense(32, activation='relu'), \n            tf.keras.layers.Dense(10, activation='softmax')\n        ])\n\n    def compile(self, optimizer='adam', loss='categorical_crossentropy'):\n        self.model.compile(optimizer=optimizer, loss=loss, metrics=['accuracy'])\n\n    def train(self, X_train, y_train, epochs=10):\n        self.model.fit(X_train, y_train, epochs=epochs)\n\n    @staticmethod\n    def preprocess_data(X, y):\n        X = X.astype('float32') / 255\n        encoder = OneHotEncoder(sparse=False)\n        y = encoder.fit_transform(y.reshape(-1, 1))\n        return X, y\n\nX_train = np.random.random((100, 784))\ny_train = np.random.randint(0, 10, size=(100,))\n\nnn = OptimizedNeuralNetwork()\nX_train, y_train = nn.preprocess_data(X_train, y_train)\nnn.compile()\nnn.train(X_train, y_train)`
          }
        });
      } else {
        // Non-AI-related data
        resolve({
          code: `def quicksort(arr):\n    if len(arr) == 1:\n        return arr # This will fail for an empty array, causing a crash\n    pivot = arr[0]\n    left = []\n    right = []\n    for i in arr:\n        if i < pivot:\n            left.append(pivot) \n        else:\n            right.append(pivot) \n    return quicksort(left) + quicksort([pivot]) + quicksort(right) \n    \n    arr = [3, 6, 8, 10, 1, 2, 1]\n    sorted_arr = quicksort(arr)\n    print(sorted_arr)`,
          programming_language: "python",
          is_ai_related: false,
          context: "This is an incorrect Quicksort algorithm that needs major refactoring and fixes.",
          code_evaluation: {
            works: false,
            errors: [
              "The quicksort function does not handle an empty array, which will cause a crash.",
              "The pivot element is incorrectly added to the left and right lists instead of the current element being compared.",
              "The logic for appending elements to the left and right lists is incorrect; it should append 'i', not 'pivot'.",
              "The base case should also check for an empty array, returning the array directly if it's empty."
            ],
          },
          refactoring_suggestions: {
            suggestions: [
              "Handle the case for an empty array in the base case of the quicksort function.",
              "Correctly append the current element 'i' to the left and right lists instead of appending 'pivot'.",
              "Fix the logic to ensure that elements equal to the pivot are included in the correct segment.",
              "Refactor the recursive calls to quicksort to avoid repeating the pivot element unnecessarily."
            ],
            rationale: [
              "By handling the empty array case, we prevent potential crashes when the input is an empty list.",
              "Appending 'i' instead of 'pivot' ensures that the correct elements are being sorted into the left and right partitions.",
              "Including elements equal to the pivot in the right partition ensures that we maintain the correct order and completeness of the sort.",
              "Refactoring the recursive calls will improve efficiency by avoiding unnecessary duplication of the pivot in the output."
            ],
          },
          design_pattern_research: {
            design_pattern_applicable: true,
            pattern_name: "Recursive Pattern",
            resources_found: null
          },
          quality_attributes_application: {
            attributes_applied: ["DRY", "KISS", "SOLID"],
            improvements_achieved: [
              "The DRY (Don't Repeat Yourself) principle was applied by ensuring that the pivot element is only added once to the final sorted array during the recursive calls, reducing redundancy and potential errors.",
              "The KISS (Keep It Simple, Stupid) principle was applied by simplifying the logic of the quicksort implementation. This enhances readability and maintainability, making it easier for future developers to understand the sorting mechanism.",
              "The SOLID principles were applied, particularly the Single Responsibility Principle, as each part of the quicksort function now has a clear responsibility: to sort the given list based on the pivot. This improves the maintainability of the code by making it easier to test and extend."
            ],
          },
          optimized_code: {
            optimized_code: `def quicksort(arr):\n    if len(arr) == 0:\n        return arr\n    pivot = arr[0]\n    left = [i for i in arr[1:] if i < pivot]\n    right = [i for i in arr[1:] if i >= pivot]\n    return quicksort(left) + [pivot] + quicksort(right)\n\narr = [3, 6, 8, 10, 1, 2, 1]\nsorted_arr = quicksort(arr)\nprint(sorted_arr)`
          }
        });
      }
    }, 3000); // Mocking a 3-second delay for the request
  });

const CodeXpertForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null);

  const onSubmit = async (data: FormSchema) => {
    setLoading(true);
    console.log(data)
    try {
      const responseData = await mockSubmission(data.is_ai_related); 
      setResults(responseData);
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

          {/* AI-related radio buttons */}
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

          {/* Context field */}
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

      {/* Results Section */}
      {results && (
        <Results data={results} />
      )}
    </div>
  );
};

const Results = ({ data }: any) => {
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  // Function to copy the optimized code to clipboard
  const handleCopy = async () => {
    if (data?.optimized_code?.optimized_code) {
      try {
        await navigator.clipboard.writeText(data.optimized_code.optimized_code);
        setCopyStatus("Copied!");
        setTimeout(() => {
          setCopyStatus("Copy Code");
        }, 2000); // Reset button text after 2 seconds
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

        {/* Programming Language and Context */}
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

        {/* Original Code */}
        <div className="mb-6">
          <h4 className="text-2xl font-semibold flex items-center">
            <FaCode className="text-yellow-500 mr-2" />
            Original Code
          </h4>
          <SyntaxHighlighter language="python" style={darcula}>
            {data?.code || "# No code provided"}
          </SyntaxHighlighter>
        </div>

        {/* Code Evaluation */}
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

        {/* Refactoring Suggestions */}
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

        {/* Optimized Code with Copy Button */}
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

        {/* Quality Attributes and Improvements */}
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
