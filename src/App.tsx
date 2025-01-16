import "./App.css";
import FeedbackForm from "./components/feedback-form";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <FeedbackForm />
      <Toaster />
    </main>
  );
}

export default App;
