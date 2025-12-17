// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { stalls } from "./data/stalls";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import MarketMap from "./components/MarketMap";
import StallDetails from "./components/StallDetails";

function App() {
  const [selectedStallId, setSelectedStallId] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [isFullscreen, setIsFullscreen] = useState(false);

  // mobile detect
  const [isMobile, setIsMobile] = useState(false);

  const [showPins, setShowPins] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const selectedStall = useMemo(
    () => stalls.find((s) => s.id === selectedStallId) || null,
    [selectedStallId]
  );

  const filteredStalls = useMemo(() => {
    return stalls.filter((stall) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        q.length === 0 ||
        stall.name.toLowerCase().includes(q) ||
        stall.products.toLowerCase().includes(q);

      const matchesCategory = category === "all" || stall.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  // 🔥 “pro”: chalet à surligner + auto-scroll (1er résultat)
  const highlightedStallId = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length === 0) return null;
    return filteredStalls[0]?.id ?? null;
  }, [search, filteredStalls]);

  const handleSelectStall = (stallId) => {
    setSelectedStallId((current) => (current === stallId ? null : stallId));
  };

  const toggleFullscreen = () => setIsFullscreen((v) => !v);

  // ✅ MOBILE UI: carte fullscreen directe + overlays
  if (isMobile) {
    return (
      <div className="app-root mobile-root">
        <MarketMap
          stalls={filteredStalls}
          selectedStallId={selectedStallId}
          highlightedStallId={highlightedStallId}
          onSelectStall={handleSelectStall}
          isFullscreen={true}
          onToggleFullscreen={() => {}}
          isMobile={true}
          showPins={true}
          onToggleShowPins={() => {}}
          hideExit={true}
        />

        <div className="mobile-overlay mobile-search">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            showCategory={false}
          />
        </div>

        <div
          className={`sheet-backdrop ${selectedStall ? "is-open" : ""}`}
          onClick={() => setSelectedStallId(null)}
        />

        <div className={`bottom-sheet ${selectedStall ? "is-open" : ""}`}>
          <div className="bottom-sheet-handle" />
          <button
            className="bottom-sheet-close"
            onClick={() => setSelectedStallId(null)}
          >
            ✕
          </button>
          <div className="bottom-sheet-content">
            <StallDetails stall={selectedStall} />
          </div>
        </div>
      </div>
    );
  }

  // ✅ DESKTOP UI: inchangé
  return (
    <div className="app-root">
      <Header />

      <main className="app-main">
        <section className="app-left">
          {!isFullscreen && (
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
            />
          )}

          <MarketMap
            stalls={filteredStalls}
            selectedStallId={selectedStallId}
            highlightedStallId={highlightedStallId}
            onSelectStall={handleSelectStall}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            isMobile={isMobile}
            showPins={showPins}
            onToggleShowPins={() => setShowPins((v) => !v)}
          />
        </section>

        {!isFullscreen && (
          <section className="app-right">
            <StallDetails stall={selectedStall} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
