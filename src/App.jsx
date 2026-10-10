import { useState } from "react";
import { BookOpen, Users, Sparkles, Plus, ExternalLink } from "lucide-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center" className="py-12 px-4">
        <div className="flex justify-center mb-6">
          <img src="/favicon.svg" width="96" height="96" alt="Lost and Found logo" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Lost &amp; Found
          </h1>
          <p className="max-w-md mx-auto text-base md:text-lg opacity-90 mt-2">
            Headings use <strong className="font-heading font-semibold">Bricolage Grotesque</strong> and body text uses <strong className="font-sans font-medium">Plus Jakarta Sans</strong>.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="counter inline-flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:opacity-80 transition"
            onClick={() => setCount((count) => count + 1)}
          >
            <Plus className="w-4 h-4" />
            <span>Count is {count}</span>
          </button>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <div className="flex justify-center mb-2">
            <BookOpen className="w-6 h-6 text-purple-500" />
          </div>
          <h2>Typography &amp; Icons</h2>
          <p>
            Configured with <code>lucide-react</code>, Google Fonts, and Tailwind CSS v4.
          </p>
          <ul className="mt-4 space-y-2 text-left max-w-sm mx-auto">
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
              <span><strong>Headings:</strong> <span className="font-heading">Bricolage Grotesque</span></span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
              <span><strong>Body:</strong> <span className="font-sans">Plus Jakarta Sans</span></span>
            </li>
          </ul>
        </div>
        <div id="social">
          <div className="flex justify-center mb-2">
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <h2>Connect with us</h2>
          <p>Community and source</p>
          <ul>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
            </li>
            <li>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Discord
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
