// src/components/StallDetails.jsx
function StallDetails({ stall }) {
  if (!stall) {
    return (
      <div className="stall-details-card stall-details-empty">
        <h2>Informations commerçant</h2>
        <p>
          Sélectionnez un chalet sur le plan pour afficher les informations du
          commerçant.
        </p>
        <ul className="stall-tips">
          <li>Utilisez la barre de recherche pour trouver un produit.</li>
          {/*<li>
            Filtrez par catégorie pour repérer rapidement les stands qui vous
            intéressent.
          </li>*/}
        </ul>
      </div>
    );
  }

  return (
    <div className="stall-details-card stall-details-filled">
      <div className="stall-details-header">
        <span className="stall-tag">Chalet {stall.boxNumber}</span>
        <h2 className="stall-name">{stall.name}</h2>
      </div>

      <p className="stall-products">
        <strong>Propose :</strong> {stall.products}
      </p>

      {stall.category && (
        <p className="stall-category">
          <strong>Catégorie :</strong>{" "}
          <span className={`pill pill-${stall.category}`}>
            {stall.category}
          </span>
        </p>
      )}
      {/*
      <div className="stall-extra">
        <p>
          Astuce : notez le numéro du chalet pour le retrouver facilement sur le
          plan.
        </p>
      </div>
      */}
    </div>
  );
}

export default StallDetails;
