import { useState } from "react";

type Props = {
  items: CardItem[];
  columns: number;
};

export default function PolaroidGrid({ items, columns = 4 }: Props) {
  return (
    <div
      className="p-6 min-h-[100vh] relative"
      style={{
        background: "linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)",
        overflow: "hidden",
      }}
    >
      {/* String lights effect covering the entire background */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="lights-container absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="light absolute"
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                backgroundColor: "#ffdd80", // Warm yellow color
                boxShadow: "0 0 25px 10px rgba(255, 221, 128, 0.6)",
                animation: `twinkle ${1.5 + Math.random() * 3}s infinite alternate ${Math.random() * 2}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.4 + Math.random() * 0.6,
              }}
            ></div>
          ))}
        </div>
      </div>

      <h2
        className="text-2xl font-semibold mb-8 font-caveat text-white relative"
        style={{ fontFamily: "'Caveat', cursive", zIndex: 2 }}
      >
        Polaroid Gallery
      </h2>
      <div
        className={`grid gap-6 gap-y-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-${columns} relative`}
        role="list"
        style={{ zIndex: 2 }}
      >
        {items.map((it) => (
          <PolaroidCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
}

type CardItem = {
  id: string;
  src: string;
  title?: string;
  description?: string;
};

function PolaroidCard({ item }: { item: CardItem }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((s) => !s);

  return (
    <div
      className="polaroid-wrapper w-full flex justify-center"
      role="listitem"
    >
      <button
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Hide details for ${item.title || "photo"}`
            : `Show details for ${item.title || "photo"}`
        }
        className="relative focus:outline-none rounded-lg"
        style={{
          perspective: 1200,
        }}
      >
        <div
          className={`polaroid transition-transform duration-700 ease-in-out transform-gpu relative`}
          style={{
            width: 240,
            height: 300,
            transformStyle: "preserve-3d",
            // transform: flipped ? "rotateY(180deg)" : "none",
            transform: flipped
              ? "rotateY(180deg)"
              : `rotate(${(-6 + Math.random() * 12).toFixed(2)}deg)`,
            boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
            borderRadius: 8,
            background: "transparent",
          }}
        >
          {/* Front */}
          <div
            className="polaroid-front absolute inset-0 rounded-md overflow-hidden bg-white flex flex-col items-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          >
            <div className="flex-1 w-full flex items-center justify-center p-2">
              <img
                src={item.src}
                alt={item.title || "Polaroid image"}
                className="object-cover w-full h-full max-h-[210px]"
                style={{ display: "block" }}
              />
            </div>
            <div className="w-full bg-white py-3 px-3 border-t border-gray-100 text-center">
              {item.title ? (
                <div
                  className="text-xl font-bold truncate"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {item.title}
                </div>
              ) : (
                <div className="text-sm text-gray-400">&nbsp;</div>
              )}
            </div>
          </div>

          {/* Back */}
          <div
            className="polaroid-back absolute inset-0 rounded-md overflow-hidden bg-white p-4 flex flex-col"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div
              className="flex-1 overflow-auto text-sm text-gray-800"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "1.4rem" }}
            >
              {item.description || ""}
            </div>
            <div className="mt-3 text-xs text-gray-500 text-right">
              Click to flip back
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

/*
Notes & tips:
- This component uses Tailwind classes for layout. The small 3D flip is implemented inline so it works without additional CSS files.
- To get a more "polaroid" randomness effect, you can add a small rotate style per-card, e.g. style={{ transform: flipped ? 'rotateY(180deg)' : `rotate(${(-6 + Math.random()*12).toFixed(2)}deg)` }}. For stable rotations, precompute a rotation value on the item instead of Math.random() in render.
- Accessibility: cards are buttons, they respond to Enter/Space and expose aria-pressed.
- Performance: if you have many cards, consider virtualization or reducing image sizes.
- Variations: add a hover lift (translateY(-6px)), add stamps, timestamps, or a small caption under the grid.
*/
