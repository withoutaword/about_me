import { moments } from "../data/moments";
import { Link } from "react-router-dom";
import Tag from "../components/Tag";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Moments() {

  const sorted = [...moments].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <section className="pt-32 pb-20">
    <div className="max-w-2xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-12">Moments</h1>

      <div className="relative border-l border-gray-300 ml-3">

        {sorted.map((m) => {

          const date = new Date(m.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          });

          return (
            <Link key={m.id} to={`/moments/${m.id}`}>

              <div className="mb-10 ml-6">

                <span className="absolute w-3 h-3 bg-black rounded-full -left-1.5"></span>

                <p className="text-sm text-gray-400">{date}</p>

                <p className="text-lg leading-relaxed mb-2">
                  {m.text}
                </p>

                <div>
                  {m.tags?.map((tag) => (
                    <Tag key={tag} name={tag} />
                  ))}
                </div>

              </div>

            </Link>
          );

        })}

      </div>

    </div>
    </section>
    <Footer />

    </div>
  );
}