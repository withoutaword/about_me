import { useParams } from "react-router-dom";
import { moments } from "../data/moments";
import Tag from "../components/Tag";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MomentDetail() {

  const { id } = useParams();
  const moment = moments.find((m) => m.id === id);

  if (!moment) return <div className="p-10">Not found</div>;

  const date = new Date(moment.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
        <div className="min-h-screen bg-dark">
      <Navbar />

      <section className="pt-32 pb-20">
    <div className="max-w-2xl mx-auto px-6 py-12">

      <p className="text-sm text-gray-400 mb-4">{date}</p>

      <p className="text-xl leading-relaxed mb-4">
        {moment.text}
      </p>

      <div className="mb-6">
        {moment.tags?.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>

      {moment.image && (
        <img
          src={moment.image}
          className="rounded-xl shadow-md"
        />
      )}

    </div>
    </section>
    <Footer />
    </div>
  );
}