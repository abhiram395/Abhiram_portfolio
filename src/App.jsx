import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "AI Portfolio Assistant Active. Ask about projects, internships, skills or experience.",
    },
  ]);

const projects = [

  {
    title: "AI-Powered Scheduling Analytics Simulator",

    description:
      "Built an intelligent scheduling analytics simulator implementing FIFO, SJF, Priority, and Round Robin algorithms with Gantt chart visualization, turnaround-time analysis, response-time metrics, and Gemini AI-powered workload insights.",

    stack: [
      "Python",
      "Flask",
      "Gemini API",
      "HTML",
      "CSS",
      "JavaScript",
    ],

    highlights: [
      "Gantt Chart Visualization",
      "AI Workload Analysis",
      "Scheduling Algorithms",
    ],

    github:
      "https://github.com/abhiram395/Ai-scheduling-analytics-simulator",

    demo:
      "https://ai-scheduling-analytics-simulator.onrender.com",
  },



  {
    title: "Search Engine",

    description:
      "Engineered a scalable search engine using inverted indexing and optimized retrieval pipelines for fast low-latency querying.",

    stack: [
      "C++",
      "Python",
      "Indexing Systems",
      "DSA",
    ],

    highlights: [
      "Inverted Indexing",
      "Fast Retrieval",
      "Efficient Query Processing",
    ],

    github:
      "https://github.com/abhiram395/search-project",

    demo:
      "https://search-project-zpto.onrender.com/",
  },



  {
    title: "LRU Cache",

    description:
      "Implemented an optimized LRU Cache using HashMap and Doubly Linked List supporting constant-time insertion and eviction operations.",

    stack: [
      "C++",
      "HashMap",
      "System Design",
    ],

    highlights: [
      "O(1) Operations",
      "Efficient Eviction",
      "Cache Optimization",
    ],

    github:
      "https://github.com/abhiram395/lru-cache",

    demo:
      "https://lru-cache-ivory.vercel.app/",
  },



  {
    title: "Security Audit Toolkit",

    description:
      "Developed automated Linux and Windows security auditing scripts for log monitoring and system-level security analysis.",

    stack: [
      "Python",
      "Bash",
      "Linux",
      "Cybersecurity",
    ],

    highlights: [
      "Security Analysis",
      "Automation",
      "Log Monitoring",
    ],

    github:
      "https://github.com/abhiram395/security-audit-toolkit",

    demo: null,
  },

];

  const stats = [
    { label: "DSA Problems Solved", value: "500+" },
    { label: "Current CGPA", value: "8.97" },
    { label: "Internships", value: "2" },
    { label: "Core Focus", value: "Systems" },
  ];

  const skills = {
    Languages: ["C++", "Python", "C", "SQL"],
    "Core CS": [
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "OOP",
      "System Design",
      "Caching Systems",
    ],
    Backend: ["Indexing Systems", "Scheduling Systems", "System Architecture"],
    Cybersecurity: ["Wireshark", "Nmap", "Bash Scripting", "Log Analysis"],
    Tools: ["Git", "GitHub", "Linux Terminal", "VS Code", "GitHub Actions"],
  };

  const portfolioContext = `
You are Abhiram Hosmane's AI portfolio assistant.

Answer only using the following information.

Abhiram is a Computer Science undergraduate focused on systems engineering, backend development, cybersecurity and scalable software.

Projects:
1. Search Engine using inverted indexing.
2. Task Scheduler supporting FIFO, SJF, Priority and Round Robin.
3. LRU Cache using HashMap and Doubly Linked List.
4. Linux & Windows Security Audit Toolkit.

Skills:
C++, Python, C, SQL, Data Structures & Algorithms, Operating Systems, DBMS, System Design, Cybersecurity.

Internships:
1. Cybersecurity Intern at CynbitT Technologies.
2. Front-End Intern at Kistechno Software.

Achievements:
500+ DSA problems solved.
CGPA: 8.97.
`;

  async function askAI() {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;
    setQuestion("");
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${portfolioContext}

Recruiter Question:
${currentQuestion}`,
                  },
                ],
              },
            ],
          }),
        },
      );

      // Handle API errors
      if (!response.ok) {
        // 429 = quota exceeded
        if (response.status === 429) {
          throw new Error("RATE_LIMIT");
        }

        throw new Error("API_ERROR");
      }

      const data = await response.json();

      console.log(data);

      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: aiText,
        },
      ]);
    } catch (error) {
      console.error(error);

      let errorMessage = "AI assistant temporarily unavailable.";

      if (error.message === "RATE_LIMIT") {
        errorMessage =
          "AI assistant is temporarily unavailable due to API usage limits. Please explore my projects, skills, internships, and resume meanwhile.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: errorMessage,
        },
      ]);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 blur-3xl rounded-full" />
      </div>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300 mb-8 bg-white/5 backdrop-blur">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to Software Engineering Internships
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="mb-6 text-green-400 font-mono text-sm">
                <span>system.initialize()</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-bold leading-tight tracking-tight">
                Abhiram
                <br />
                Hosmane
              </h1>

              <p className="mt-6 text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Systems-Focused Developer Exploring Search, Infrastructure &
                Security
              </p>

              <p className="mt-8 text-gray-400 text-lg leading-relaxed max-w-2xl">
                Computer Science undergraduate focused on scalable systems,
                backend engineering, cybersecurity, and high-performance
                software development.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href="/Abhiram_Updated_Resume.pdf"
                  download
                  className="px-6 py-3 rounded-2xl bg-green-400 text-black font-medium hover:scale-105 transition"
                >
                  Resume
                </a>
                <a
                  href="https://github.com/abhiram395"
                  target="_blank"
                  className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:scale-105 transition"
                >
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/abhiram-hosmane-7a604a288"
                  target="_blank"
                  className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition"
                >
                  LinkedIn
                </a>

                <a
                  href="https://leetcode.com/u/abhiram12369"
                  target="_blank"
                  className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition"
                >
                  LeetCode
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">Engineering Snapshot</h2>
                <div className="text-green-400 text-sm">Live Profile</div>
              </div>

              <div className="space-y-6">
                <div className="border border-white/10 rounded-2xl p-5 bg-black/30">
                  <div className="text-gray-400 text-sm mb-2">Education</div>
                  <div className="text-xl font-semibold">B.Tech CSE</div>
                  <div className="text-gray-300 mt-1">CGPA: 8.97 / 10</div>
                </div>

                <div className="border border-white/10 rounded-2xl p-5 bg-black/30">
                  <div className="text-gray-400 text-sm mb-2">DSA Progress</div>
                  <div className="text-xl font-semibold">
                    500+ Problems Solved
                  </div>
                </div>

                <div className="border border-white/10 rounded-2xl p-5 bg-black/30">
                  <div className="text-gray-400 text-sm mb-2">
                    Current Focus
                  </div>
                  <div className="text-xl font-semibold">
                    Systems & Backend Engineering
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="max-w-7xl mx-auto px-6 py-24">

  <div className="grid md:grid-cols-4 gap-6 mb-24">

    {stats.map((stat) => (

      <div
        key={stat.label}
        className="border border-white/10 rounded-3xl p-6 bg-white/5 backdrop-blur-xl"
      >

        <div className="text-4xl font-bold">
          {stat.value}
        </div>

        <div className="text-gray-400 mt-3">
          {stat.label}
        </div>

      </div>

    ))}

  </div>

  <div className="mb-16">

    <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
      Projects
    </p>

    <h2 className="text-4xl font-bold mt-4">
      Featured Engineering Work
    </h2>

  </div>

  <div className="grid lg:grid-cols-2 gap-8">

    {projects.map((project, index) => (

      <div
        key={index}
        className="border border-white/10 rounded-3xl p-8 bg-white/5 backdrop-blur-xl hover:border-green-400/30 hover:shadow-2xl transition duration-300"
      >

        <div className="flex items-center justify-between mb-6">

          <h3 className="text-2xl font-semibold">
            {project.title}
          </h3>

          <div className="text-sm text-gray-400">
            0{index + 1}
          </div>

        </div>

        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-6">

          {project.stack.map((tech) => (

            <span
              key={tech}
              className="px-4 py-2 rounded-full text-sm border border-white/10 bg-black/30 text-gray-300"
            >
              {tech}
            </span>

          ))}

        </div>

        <div className="space-y-3 mb-8">

          {project.highlights.map((item) => (

            <div
              key={item}
              className="text-gray-400 text-sm"
            >
              • {item}
            </div>

          ))}

        </div>

        <div className="flex flex-wrap gap-4">

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition text-sm"
          >
            View Project →
          </a>

          {project.demo && (

            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-3 rounded-2xl bg-green-400 text-black hover:scale-105 transition text-sm font-medium"
            >
              Live Demo
            </a>

          )}

        </div>

      </div>

    ))}

  </div>

</section>


      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Skills
          </p>

          <h2 className="text-4xl font-bold mt-4">Technical Stack</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, values]) => (
            <div
              key={category}
              className="border border-white/10 rounded-3xl p-8 bg-white/5"
            >
              <h3 className="text-2xl font-semibold mb-6">{category}</h3>

              <div className="flex flex-wrap gap-3">
                {values.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-black/40 border border-white/10 text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Experience
          </p>

          <h2 className="text-4xl font-bold mt-4">Internships</h2>
        </div>

        <div className="space-y-8">
          <div className="border border-white/10 rounded-3xl p-8 bg-white/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-semibold">Cybersecurity Intern</h3>

                <p className="text-gray-400 mt-2">
                  CynbitT Technologies • Jaipur
                </p>
              </div>

              <div className="text-gray-400">Jun 2025 – Jul 2025</div>
            </div>

            <ul className="space-y-4 text-gray-300 text-lg leading-relaxed list-disc pl-6">
              <li>
                Built a Python-based security monitoring system for structured
                event logging and forensic analysis.
              </li>

              <li>
                Implemented timestamped input tracking mechanisms reducing
                manual audit effort.
              </li>

              <li>
                Researched ethical implications and detection techniques related
                to keylogging systems.
              </li>
            </ul>
          </div>

          <div className="border border-white/10 rounded-3xl p-8 bg-white/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-semibold">Front-End Intern</h3>

                <p className="text-gray-400 mt-2">
                  Kistechno Software • Jaipur
                </p>
              </div>

              <div className="text-gray-400">Jul 2024 – Aug 2024</div>
            </div>

            <ul className="space-y-4 text-gray-300 text-lg leading-relaxed list-disc pl-6">
              <li>
                Developed responsive web interfaces with dynamic filtering and
                cross-device compatibility.
              </li>

              <li>
                Improved UI consistency through responsive layout refinements
                and Bootstrap-based design.
              </li>

              <li>
                Worked on frontend interaction systems and real-time order
                workflow functionality.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="border border-white/10 rounded-[2rem] bg-white/5 p-10 backdrop-blur-xl overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Building Systems.
                <br />
                Solving Real Problems.
              </h2>

              <p className="text-gray-400 text-xl mt-8 leading-relaxed">
                Looking for Software Engineering internship opportunities where
                strong DSA foundations, systems thinking, and engineering
                curiosity can create meaningful impact.
              </p>

              <div className="flex flex-wrap gap-5 mt-12">
                <a
                  href="mailto:abhiramhosmane@gmail.com"
                  className="px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
                >
                  Contact Me
                </a>

                <a
                  href="https://github.com/abhiram395"
                  target="_blank"
                  className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition"
                >
                  View GitHub
                </a>
              </div>
            </div>

            <div className="border border-white/10 rounded-3xl bg-black/40 p-8 font-mono text-sm text-green-400 overflow-hidden">
              <div className="flex items-center gap-2 mb-6 text-white">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />

                <span className="ml-4 text-gray-400">terminal</span>
              </div>

              <div className="space-y-4">
                <div>$ whoami</div>

                <div className="text-white">Abhiram Hosmane</div>

                <div>$ current_focus</div>

                <div className="text-white">
                  systems engineering && backend development
                </div>

                <div>$ solving</div>

                <div className="text-white">500+ DSA problems</div>

                <div>$ building</div>

                <div className="text-white">
                  search engines • schedulers • security tooling
                </div>

                <div>$ status</div>

                <div className="text-green-400">open_to_internships = true</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-white text-black px-6 py-4 rounded-2xl font-semibold shadow-2xl hover:scale-105 transition z-50"
      >
        AI Assistant
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[550px] bg-black border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-50 flex flex-col">
          <div className="p-5 border-b border-white/10 bg-white/5">
            <div className="text-green-400 font-mono text-sm">
              [ AI PORTFOLIO ASSISTANT ACTIVE ]
            </div>

            <div className="text-gray-400 text-sm mt-2">
              Ask about projects, internships, skills or experience.
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-white text-black ml-10"
                    : "bg-white/5 border border-white/10 text-gray-300 mr-10"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10 flex gap-3">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about my projects..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-white"
            />

            <button
              onClick={askAI}
              className="bg-white text-black px-5 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Ask
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p>Built with React • Vite • Gemini AI</p>

        <p className="mt-2">© 2026 Abhiram Hosmane</p>
      </footer>
    </div>
  );
}
