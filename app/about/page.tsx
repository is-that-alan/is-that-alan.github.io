import AiOverviewPanel from "@/components/ai-overview-panel";
import Header from "@/components/header";
import GoogleSearchBar from "@/components/google-search-bar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header>
        <GoogleSearchBar defaultValue="Alan Wong" />
      </Header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Search results */}
          <div className="flex-1 max-w-2xl">
            <div className="mb-6">
              <AiOverviewPanel bio="This is a placeholder for a bio. It can be a brief introduction about yourself, your interests, and your professional background." />
            </div>
            <div className="text-sm text-gray-500 mb-4">About 3 results (0.25 seconds)</div>

            {/* Search results */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                  <a href="/experience/nan-fung">Nan Fung International Properties - Associate - Data Science</a>
                </h3>
                <div className="text-sm text-green-700 mb-2">https://www.nanfung.com/</div>
                <div className="text-sm text-gray-500 mb-2">Jan 2024 – Present</div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Built an agentic Q&A chatbot for real estate acquisition, achieving 80% accuracy in database retrieval. Developed an adaptive AI prompting framework, improving business team-approved results by 1.75x.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                  <a href="/experience/premialab">Premialab - Fintech Data Scientist</a>
                </h3>
                <div className="text-sm text-green-700 mb-2">https://www.premialab.com/</div>
                <div className="text-sm text-gray-500 mb-2">July 2022 – Jan 2024</div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Led development of a risk aggregation engine, incorporating both additive and non-additive metrics such as H-VaR, resulting in a 60% reduction in report runtime. Optimized SQL processes, cutting query time by 90%.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                  <a href="/experience/hkust">HKUST Fintech Research Project - Data Analytics Research Assistant</a>
                </h3>
                <div className="text-sm text-green-700 mb-2">https://www.hkust.edu.hk/</div>
                <div className="text-sm text-gray-500 mb-2">Aug 2021 – July 2022</div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Automated text classification, replacing manual processes with NLP models, achieving 90%+ accuracy. Fine-tuned GPT-2 and BERT on NVIDIA DGX using HuggingFace, optimizing performance for text classification tasks.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Knowledge panel */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="text-center mb-4">
                <Image
                  src="/images/digital_alan.jpg"
                  alt="Alan Wong"
                  width={160}
                  height={200}
                  className="rounded-lg mx-auto mb-3"
                />
                <h2 className="text-xl font-normal text-gray-900">Alan Wong</h2>
                <p className="text-sm text-gray-600">Associate - Data Science</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Education</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold">Georgia Institute of Technology</p>
                    <p className="text-gray-600">MSc Analytics (In Progress)</p>
                  </div>
                  <div>
                    <p className="font-semibold">University of Bath</p>
                    <p className="text-gray-600">MSc Computer Science (Completed)</p>
                  </div>
                  <div>
                    <p className="font-semibold">University of Bristol</p>
                    <p className="text-gray-600">BSc Economics (Completed)</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">SQL</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">LangChain</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Power BI</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Airflow</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Spark</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
