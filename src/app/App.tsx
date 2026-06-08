```tsx
import { ChatBot } from "./components/ChatBot";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-8">
        
        <h1 className="text-4xl font-bold text-center mb-4">
          AI Chatbot by Muzamil
        </h1>

        <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
          Free AI chatbot for coding help, learning, programming,
          content creation, problem solving, and everyday questions.
          Get instant AI-powered answers through a fast and modern
          chat interface.
        </p>

        <div className="flex justify-center mb-12">
          <ChatBot />
        </div>

        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Features of AI Chatbot by Muzamil
          </h2>

          <ul className="space-y-2 text-gray-300">
            <li>✅ AI-powered conversations</li>
            <li>✅ Coding and programming assistance</li>
            <li>✅ Learning and study support</li>
            <li>✅ Content creation and writing help</li>
            <li>✅ Fast and responsive chat interface</li>
            <li>✅ Free online AI assistant</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
```
