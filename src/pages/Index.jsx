import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Code, Zap, Rocket, Users } from "lucide-react"

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerateCode = () => {
    // Simulating code generation
    setGeneratedCode(`function greet() {\n  console.log("Hello from CodeGenius AI!");\n}\n\ngreet();`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Zap className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">CodeGenius AI</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Features
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pricing
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button>Sign up</Button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Transform Ideas into Code</h1>
              <p className="text-xl text-gray-600 mb-8">Harness the power of AI to generate high-quality code in seconds</p>
              <div className="w-full max-w-md space-y-4">
                <Textarea
                  placeholder="Describe your code requirements..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full"
                />
                <Button onClick={handleGenerateCode} className="w-full">
                  Generate Code
                </Button>
              </div>
            </div>
          </div>

          {generatedCode && (
            <div className="mt-8 px-4 sm:px-0">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Generated Code</h2>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                <code>{generatedCode}</code>
              </pre>
            </div>
          )}

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Code className="h-8 w-8 text-indigo-600" />}
                title="Multi-Language Support"
                description="Generate code in a wide range of programming languages and frameworks."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-indigo-600" />}
                title="Real-Time Preview"
                description="Instantly view generated code as you type or modify prompts."
              />
              <FeatureCard
                icon={<Rocket className="h-8 w-8 text-indigo-600" />}
                title="AI-Powered Optimization"
                description="Get suggestions for improving performance and code quality."
              />
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to revolutionize your coding workflow?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of developers who are already using CodeGenius AI</p>
            <Button size="lg">Get Started for Free</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dt className="text-lg font-medium text-gray-900 truncate">{title}</dt>
          <dd className="mt-1 text-sm text-gray-500">{description}</dd>
        </div>
      </div>
    </div>
  </div>
);

export default Index;
