# AI Code and DS Assistant Frontend

**AI Code and DS Assistant Frontend** is a web application designed to provide developers with a wide range of services for coding and data structure (DS) tasks. The frontend interfaces with the backend API to offer features such as **DS Docs**, a **Chatbot for Coding and DS Assistance**, **NexaMind** (Software Architecture Assistant), and **CodeXpert**, an agent focused on code optimization. The application is built with modern web technologies for a smooth and responsive user experience.

Developed by **Wilfredo Aaron Sosa Ramos**, this project is deployed on **Vercel**, ensuring high performance, scalability, and easy accessibility. The frontend integrates with various services and is designed to be intuitive, making it a versatile tool for developers and software architects.

## Table of Contents

- [1. Features](#1-features)
- [2. Services Provided](#2-services-provided)
  - [2.1 DS Docs](#21-ds-docs)
  - [2.2 Chatbot for Coding and DS Assistance](#22-chatbot-for-coding-and-ds-assistance)
  - [2.3 NexaMind (Software Architecture Assistant)](#23-nexamind-software-architecture-assistant)
  - [2.4 CodeXpert (Agent for Code Optimization)](#24-codexpert-agent-for-code-optimization)
- [3. Technologies Used](#3-technologies-used)
- [4. Environment Variables](#4-environment-variables)
- [5. Installation Guide](#5-installation-guide)
- [6. How to Use](#6-how-to-use)

---

## 1. Features

**AI Code and DS Assistant Frontend** provides a variety of tools designed to assist developers and software engineers. The key features include:

- **DS Docs**: Provides detailed documentation and examples for various data structures, helping developers better understand and implement data structures in their projects.
- **Chatbot for Coding and DS Assistance**: An AI-powered chatbot that can answer coding questions, provide code snippets, and assist with data structure-related problems in real-time.
- **NexaMind (Software Architecture Assistant)**: Helps generate architectural diagrams and advice on software architecture design, using multimodal data handling and integrating with powerful AI models.
- **CodeXpert**: An advanced agent for code optimization that analyzes code snippets, suggests improvements, and optimizes code for better performance.

These features combine to create a robust and user-friendly platform for coding assistance, software architecture design, and code optimization.

---

## 2. Services Provided

The **AI Code and DS Assistant Frontend** offers four core services that assist developers and software engineers in improving their code quality, designing better architectures, and understanding data structures.

### 2.1 DS Docs

**DS Docs** provides comprehensive documentation for various data structures, including:

- **Arrays**
- **Linked Lists**
- **Stacks**
- **Queues**
- **Trees**
- **Graphs**

This service offers detailed explanations, example implementations, and use cases for each data structure, helping developers learn and apply data structures in real-world projects.

### 2.2 Chatbot for Coding and DS Assistance

The **Chatbot** is a conversational interface powered by AI models that assists developers with coding tasks. Features include:

- **Real-time Coding Assistance**: Get help with specific coding problems, receive code snippets, and solve data structure-related challenges.
- **Code Explanations**: The chatbot explains complex code and algorithms in an easy-to-understand manner.
- **Data Structure Support**: Provides guidance on how to implement and optimize various data structures.

### 2.3 NexaMind (Software Architecture Assistant)

**NexaMind** is the **Software Architecture Assistant** that helps developers and software architects design scalable and maintainable systems. This assistant can:

- **Generate Architecture Diagrams**: Based on user input, NexaMind can create software architecture diagrams to help visualize and plan software systems.
- **Multimodal Input/Output**: Supports both text and graphical inputs and outputs, making it highly versatile for complex architectural tasks.
- **AI-Powered Advice**: NexaMind leverages **Google Generative AI** and **GPT-4o-mini** to offer detailed architectural advice tailored to the project’s needs.

### 2.4 CodeXpert (Agent for Code Optimization)

**CodeXpert** is an AI-powered agent focused on improving and optimizing code. Key features include:

- **Code Analysis**: Analyze code snippets to detect potential issues or inefficiencies.
- **Optimization Suggestions**: Provides recommendations for improving code performance, readability, and maintainability.
- **AI-Powered Internet Searches**: With **Tavily**, CodeXpert can conduct AI-related Internet searches to find relevant coding patterns, solutions, or best practices.

---

## 3. Technologies Used

The **AI Code and DS Assistant Frontend** is built using a modern tech stack that ensures performance, scalability, and maintainability. Key technologies include:

- **NextJS**: A React framework for building fast and scalable web applications with server-side rendering and static site generation.
- **ShadCN**: Provides a design system and reusable components for creating a consistent user interface.
- **axios**: A promise-based HTTP client used for making API requests to the backend.
- **react-markdown**: Allows the application to render Markdown content as HTML, useful for displaying formatted text, such as documentation and code examples.
- **zod**: A TypeScript-first schema declaration and validation library that ensures reliable form input validation.
- **react-hook-form**: Simplifies form handling and validation within the application, integrated with zod for schema-based validation.
- **@hookform/resolvers**: Connects react-hook-form with zod for seamless validation logic.
- **react-toastify**: Provides real-time notifications, such as success or error messages, enhancing user feedback.
- **Tailwind CSS**: A utility-first CSS framework for building responsive and custom user interfaces.
- **Redux**: A predictable state container for managing the global state of the application.
- **Async Management**: Handles asynchronous operations efficiently, ensuring smooth and non-blocking user interactions.

---

## 4. Environment Variables

The **AI Code and DS Assistant Frontend** requires the following environment variables to be configured for proper API integration:

- **NEXT_PUBLIC_API_BASE_URL**: The base URL of the backend API that handles coding and data structure assistance.
  
- **NEXT_PUBLIC_API_KEY**: The API key used for authenticating requests to the backend services.

Example `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.aicodeassistant.com
NEXT_PUBLIC_API_KEY=your_api_key_here
```


Replace `your_api_key_here` with the actual API key provided by the backend.

---

## 5. Installation Guide

Follow the steps below to set up and run the **AI Code and DS Assistant Frontend** locally:

1. **Clone the repository**:
   - Download the repository to your local machine using the following command:
     ```
     git clone https://github.com/yourusername/AI-Code-and-DS-Assistant-Frontend.git
     ```

2. **Navigate to the project directory**:
   - Enter the project folder:
     ```
     cd AI-Code-and-DS-Assistant-Frontend
     ```

3. **Install dependencies**:
   - Install the necessary dependencies using npm or yarn:
     ```
     npm install
     ```

4. **Set up environment variables**:
   - Create a `.env.local` file in the root directory and configure the environment variables:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://api.aicodeassistant.com
     NEXT_PUBLIC_API_KEY=your_api_key_here
     ```

5. **Run the development server**:
   - Start the application locally:
     ```
     npm run dev
     ```

6. **Build for production**:
   - To build the application for production deployment:
     ```
     npm run build
     ```

7. **Deploy**:
   - The project is deployed on **Vercel**. For custom deployment, push your code to a repository connected to Vercel or follow Vercel’s deployment instructions.

---

## 6. How to Use

Once the **AI Code and DS Assistant Frontend** is set up, you can use the application’s services as follows:

1. **Access DS Docs**:
   - Navigate to the DS Docs section to explore detailed documentation on data structures such as Arrays, Linked Lists, and more.

2. **Chatbot for Coding Assistance**:
   - Use the chatbot interface to ask coding questions, request code snippets, or get help with data structure implementations.

3. **NexaMind for Software Architecture**:
   - Provide system requirements or architecture questions, and NexaMind will generate diagrams and offer architectural advice.

4. **CodeXpert for Code Optimization**:
   - Submit code snippets to CodeXpert for analysis. The agent will suggest improvements and optimization strategies based on best practices.

5. **Real-time Notifications**:
   - **react-toastify** provides notifications for success or error messages during interactions with the API, ensuring you stay informed throughout the process.
