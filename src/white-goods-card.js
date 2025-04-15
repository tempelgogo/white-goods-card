class WhiteGoodsCard extends HTMLElement {
  setConfig(config) {
    this.config = config;
    const root = this.attachShadow({ mode: "open" });
    const card = document.createElement("ha-card");

    const style = document.createElement("style");
    style.textContent = `
      .container {
        display: flex;
        align-items: center;
        padding: 16px;
      }
      .image {
        width: 100px;
        height: 100px;
        background-size: cover;
        background-position: center;
        margin-right: 16px;
        border-radius: 8px;
        flex-shrink: 0;
      }
      .info {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .info-line {
        display: flex;
        flex-direction: column;
      }
      .label {
        font-weight: bold;
        font-size: 14px;
      }
      .value {
        font-size: 16px;
      }
    `;

    const imageUrl = this.config.image || "/local/waschmaschine.png";
    const machineState = this._hass?.states[this.config.entity_state]?.state || "-";
    const timeLeft = this._hass?.states[this.config.entity_time]?.state || "-";
    const machineMode = this._hass?.states[this.config.entity_mode]?.state || "-";

    card.innerHTML = `
      <div class="container">
        <div class="image" style="background-image: url('${imageUrl}');"></div>
        <div class="info">
          <div class="info-line">
            <span class="label">Zustand</span>
            <span class="value">${machineState}</span>
          </div>
          <div class="info-line">
            <span class="label">Restlaufzeit</span>
            <span class="value">${timeLeft}</span>
          </div>
          <div class="info-line">
            <span class="label">Modus</span>
            <span class="value">${machineMode}</span>
          </div>
        </div>
      </div>
    `;

    root.appendChild(style);
    root.appendChild(card);
  }

  set hass(hass) {
    this._hass = hass;
    this.setConfig(this.config);
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("white-goods-card", WhiteGoodsCard);

