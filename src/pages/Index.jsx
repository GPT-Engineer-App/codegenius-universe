import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Code, Zap, Rocket, Users, MessageSquare, AlertTriangle, Sparkles, Check, Image as ImageIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useQuery } from '@tanstack/react-query'

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { toast } = useToast();

  const generateCode = async (prompt, imageUrl) => {
    // Simulating API call to AI service
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `function greet() {\n  console.log("Hello from CodeGenius AI!");\n  // Generated based on prompt: ${prompt}\n  ${imageUrl ? '// Image analysis included' : ''}\n}\n\ngreet();`;
  };

  const { data: code, isLoading, isError, refetch } = useQuery({
    queryKey: ['generateCode', prompt, imageUrl],
    queryFn: () => generateCode(prompt, imageUrl),
    enabled: false,
  });

  useEffect(() => {
    if (code) {
      setGeneratedCode(code);
      toast({
        title: "Code Generated",
        description: "Your AI-powered code is ready!",
      });
    }
  }, [code, toast]);

  const handleGenerateCode = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt before generating code.",
        variant: "destructive",
      });
      return;
    }
    refetch();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        toast({
          title: "Image Uploaded",
          description: "Your image has been successfully uploaded for AI analysis.",
        });
      };
      reader.readAsDataURL(file);
    }
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
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8 flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Transform Ideas into Code</h1>
              <p className="text-xl text-gray-600 mb-8">Harness the power of AI to generate high-quality code in seconds</p>
              <div className="w-full max-w-md space-y-4">
                <Textarea
                  placeholder="Describe your code requirements..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full"
                />
                <div className="flex items-center space-x-4">
                  <Button onClick={handleGenerateCode} className="flex-1" disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate Code'}
                  </Button>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    onClick={() => document.getElementById('image-upload').click()}
                    variant="outline"
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
                {imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Uploaded Image:</p>
                    <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto rounded-lg" />
                  </div>
                )}
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

          {isError && (
            <div className="mt-8 px-4 sm:px-0">
              <p className="text-red-500">An error occurred while generating code. Please try again.</p>
            </div>
          )}

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Code className="h-8 w-8 text-indigo-600" />}
                title="Multi-Language Support"
                description="Generate code in a wide range of programming languages and frameworks using advanced AI models."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-indigo-600" />}
                title="Real-Time AI Generation"
                description="Experience lightning-fast code generation powered by state-of-the-art AI algorithms."
              />
              <FeatureCard
                icon={<Rocket className="h-8 w-8 text-indigo-600" />}
                title="AI-Powered Optimization"
                description="Leverage machine learning for intelligent code optimization and performance enhancements."
              />
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8 text-indigo-600" />}
                title="Intelligent Prompt Interpretation"
                description="Advanced AI understands and interprets complex coding requirements."
              />
              <FeatureCard
                icon={<AlertTriangle className="h-8 w-8 text-indigo-600" />}
                title="Syntax Error Detection"
                description="Automatically detect and suggest fixes for syntax errors in real-time."
              />
              <FeatureCard
                icon={<Sparkles className="h-8 w-8 text-indigo-600" />}
                title="AI-Powered Code Completion"
                description="Intelligent code suggestions to speed up your development process using predictive AI models."
              />
              <FeatureCard
                icon={<ImageIcon className="h-8 w-8 text-indigo-600" />}
                title="Image-to-Code AI"
                description="Transform images into code snippets using advanced computer vision and natural language processing."
              />
            </div>
          </div>

          <div className="mt-16 bg-gray-50 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Advanced Capabilities</h2>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {[
                  "Natural Language to Code Conversion",
                  "Cross-Platform Compatibility",
                  "Code Optimization Suggestions",
                  "Intelligent Context-Aware Recommendations",
                  "Customizable Output Formats",
                  "Integration with Popular IDEs",
                  "Version Control System Integration",
                  "Collaborative Coding Support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-lg text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
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
