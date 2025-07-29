import GoogleSearchBar from "@/components/google-search-bar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 flex items-center">
        <GoogleSearchBar />
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Left side - Search results */}
          <div className="flex-1 max-w-2xl">
            <div className="text-sm text-gray-500 mb-4">About 1,240,000 results (0.45 seconds)</div>

            {/* Search results */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                  Your Name - Full Stack Developer
                </h3>
                <div className="text-sm text-green-700 mb-2">https://yourportfolio.github.io</div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Passionate full-stack developer with expertise in modern web technologies. Experienced in building
                  scalable applications using React, Node.js, and cloud platforms. Strong background in software
                  engineering principles and agile development methodologies.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">Your Name - GitHub</h3>
                <div className="text-sm text-green-700 mb-2">github.com/yourusername</div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Open source contributions and personal projects. Active contributor to various JavaScript and Python
                  libraries with 50+ repositories and 1000+ commits.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">Your Name | LinkedIn</h3>
                <div className="text-sm text-green-700 mb-2">linkedin.com/in/yourname</div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Professional network profile showcasing career progression and endorsements from colleagues and
                  clients. Currently working as Senior Full Stack Developer.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                  Your Name's Technical Blog
                </h3>
                <div className="text-sm text-green-700 mb-2">yourblog.dev</div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Technical articles and tutorials covering modern web development, best practices, and emerging
                  technologies. Over 50 published articles with 10k+ monthly readers.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Knowledge panel */}
          <div className="w-80 flex-shrink-0">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="text-center mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=160"
                  alt="Profile"
                  width={160}
                  height={200}
                  className="rounded-lg mx-auto mb-3"
                />
                <h2 className="text-xl font-normal text-gray-900">Your Name</h2>
                <p className="text-sm text-gray-600">Full Stack Developer</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Born</span>
                  <span className="text-gray-900">January 1, 1990</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Education</span>
                  <span className="text-gray-900">Computer Science</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="text-gray-900">San Francisco, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="text-gray-900">5+ years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialization</span>
                  <span className="text-gray-900">React, Node.js</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">JavaScript</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Node.js</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
