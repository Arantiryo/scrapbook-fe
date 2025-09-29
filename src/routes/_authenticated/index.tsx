import PolaroidGrid from "@/components/photo-grid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: AuthenticatedRoute,
});

// ------- Sample data for demonstration -------
const sampleItems = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&auto=format&fit=crop&q=60",
    title: "Sunset",
    description:
      "A warm photo from a summer evening. You can put any short description here — location, date, or a tiny note.",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60",
    title: "Portrait",
    description:
      "A portrait-style image. Great for people profiles or artists.",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=60",
    title: "Mountains",
    description:
      "Notes about this photo. Use markdown or small HTML if you want richer content.",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60",
    title: "City",
    description: "City vibes.",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&auto=format&fit=crop&q=60",
    title: "",
    description:
      "This one has no title so the polaroid shows an empty label area.",
  },
];

function AuthenticatedRoute() {
  return (
    <div className="App">
      <PolaroidGrid items={sampleItems} columns={3} />
    </div>
  );
}
