
import Header from "@/components/header";

export default function NanFungPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Nan Fung International Properties</h1>
        <p className="text-lg text-gray-600 mb-8">Associate - Data Science (Jan 2024 – Present)</p>
        <div className="space-y-4 text-gray-700">
          <p>● Built an agentic Q&A chatbot for real estate acquisition, achieving 80% accuracy in database retrieval by using RAG-enhanced few-shot prompting to optimize SQL generation with domain knowledge and specialized calculations.</p>
          <p>● Developed an adaptive AI prompting framework, improving business team-approved results by 1.75x across multiple use cases.</p>
          <p>● Built an LLM evaluation tool, reducing trial and error by 60% to streamline model selection.</p>
          <p>● Optimized vector and graph RAG with cross-encoding, boosting retrieval accuracy by 60% for better insights in daily operations.</p>
          <p>● Applied CART analysis to marketing campaigns, identifying high-potential customer segments with a 4x increase in conversions, shaping future marketing strategies.</p>
          <p>● Led AI training for London & Boston teams (15+ participants/session), upskilling associates to directors.</p>
          <p>● Optimized an internal research platform, implementing asynchronous and batch processing to triple request handling speed.</p>
          <p>● Presented AI and development updates to the Group CEO, driving strategic discussions.</p>
        </div>
      </div>
    </div>
  );
}
