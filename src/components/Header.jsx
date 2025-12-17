// src/components/Header.jsx
function Header() {
  return (
    <header className="header">
      <div className="header-title-block">
        <h1 className="header-title">Plan du Marché de Noël</h1>
        {/*<p className="header-subtitle">
          Cliquez sur un chalet pour afficher les informations du commerçant.
        </p>*/}
      </div>
      <div className="header-badge">
        <span>2025</span>
      </div>
    </header>
  );
}

export default Header;
