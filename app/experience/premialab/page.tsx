
import Header from "@/components/header";

export default function PremialabPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Premialab</h1>
        <p className="text-lg text-gray-600 mb-8">Fintech Data Scientist (July 2022 – Jan 2024)</p>
        <div className="space-y-4 text-gray-700">
          <p>● Led development of a risk aggregation engine, incorporating both additive and non-additive metrics such as H-VaR by implementing algorithms from written documentation, resulting in a 60% reduction in report runtime.</p>
          <p>● Mentored junior data scientists on model selection and deployment, ensuring business alignment.</p>
          <p>● Optimized SQL processes, cutting query time by 90%.</p>
          <p>● Led ML & AI discussions in external partnership meetings, providing strategic insights.</p>
          <p>● Deployed a microservice ETL pipeline to an AWS Cloud ECS cluster in collaboration with DevOps.</p>
        </div>
      </div>
    </div>
  );
}
