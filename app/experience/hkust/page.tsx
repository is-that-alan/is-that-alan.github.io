
import Header from "@/components/header";

export default function HkustPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">HKUST Fintech Research Project</h1>
        <p className="text-lg text-gray-600 mb-8">Data Analytics Research Assistant (Aug 2021 – July 2022)</p>
        <div className="space-y-4 text-gray-700">
          <p>● Automated text classification, replacing manual processes with NLP models, achieving 90%+ accuracy.</p>
          <p>● Fine-tuned GPT-2 and BERT on NVIDIA DGX using HuggingFace, optimizing performance for text classification tasks.</p>
          <p>● Led an end-to-end industry report for HKMA, leveraging techniques such as hierarchical clustering from analysis to publication.</p>
          <p>● Led a federated machine learning project for a public entity, enhancing model explainability using techniques like SHAP to ensure transparency and interpretability.</p>
        </div>
      </div>
    </div>
  );
}
