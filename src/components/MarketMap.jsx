// src/components/MarketMap.jsx
import planImage from "../assets/plan-marche-noel.png";

function MarketMap({
  stalls,
  selectedStallId,
  onSelectStall,
  isFullscreen,
  onToggleFullscreen,
  isMobile,
  showPins,
  onToggleShowPins,
}) {
  const isMobileFullscreen = isMobile && isFullscreen;

  return (
    <div className={`market-map-card ${isFullscreen ? "fullscreen" : ""}`}>
      {!isFullscreen && (
        <div className="market-map-header">
          <div className="market-map-title-row">
            <div>
              <h2>Plan interactif</h2>
              <p className="market-map-help">
                Cliquez un chalet pour le sélectionner.
              </p>
            </div>

            {isMobile && (
              <div className="market-map-actions">
                <button
                  type="button"
                  className="map-action-btn"
                  onClick={onToggleShowPins}
                >
                  {showPins ? "Masquer" : "Afficher"} les chalets
                </button>
                
                <button
                  type="button"
                  className="map-action-btn"
                  onClick={onToggleFullscreen}
                >
                  Plein écran
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`map-container ${isMobileFullscreen ? "scroll-x" : ""}`}>
        {isFullscreen && (
          <button className="exit-fullscreen" onClick={onToggleFullscreen}>
            ✕ Quitter
          </button>
        )}

        <div className={`map-content ${isMobileFullscreen ? "scroll-x" : ""}`}>
          <img
            src={planImage}
            alt="Plan du marché de Noël"
            className={`map-image ${isMobileFullscreen ? "scroll-x" : ""}`}
            draggable={false}
            
          />

          {showPins &&
            stalls.map((stall) => {
              const isSelected = stall.id === selectedStallId;

              return (
                <button
                  key={stall.id}
                  type="button"
                  className={`stall-box ${
                    stall.category === "Association"
                      ? "stall-association"
                      : stall.category === "L'Amicale"
                      ? "stall-amicale"
                      : stall.category === "Commerçant"
                      ? "stall-commercant"
                      : ""
                  } ${isSelected ? "is-selected" : ""}`}
                  style={{
                    top: stall.position.top,
                    left: stall.position.left,
                  }}
                  onClick={() => onSelectStall(stall.id)}
                >

                  <span className="stall-box-label">{stall.boxNumber}</span>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MarketMap;
