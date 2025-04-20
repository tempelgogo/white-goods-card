class WhiteGoodsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Static style
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

    this.card = document.createElement("ha-card");
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.card);

    // Static appliance config map
    this.applianceConfigs = {
      wama: {
        name: "Waschmaschine",
        image: "/hacsfiles/white-goods-card/assets/washing_machine.svg",
        labels: {
          state: "Zustand",
          time: "Restlaufzeit",
          mode: "Modus"
        }
      },
      diwa: {
        name: "Spülmaschine",
        image: "/hacsfiles/white-goods-card/assets/dish_washer.svg",
        labels: {
          state: "Zustand",
          time: "Spülzeit",
          mode: "Programm"
        }
      },
      dryer: {
        name: "Trockner",
        image: "/hacsfiles/white-goods-card/assets/tumbler_dryer.svg",
        labels: {
          state: "Zustand",
          time: "Trocknungszeit",
          mode: "Modus"
        }
      }
    };
  }

  setConfig(config) {
    this.config = config;

    const type = this.config.appliance_type || "wama";
    this.appliance = this.applianceConfigs[type];

    if (!this.appliance) {
      throw new Error(`Unsupported appliance_type "${type}". Use: wama, diwa, dryer.`);
    }

    // Render initial content if hass is already available
    if (this._hass) {
      this.updateCard();
    }
  }

  set hass(hass) {
    this._hass = hass;
    this.updateCard();
  }

  updateCard() {
    if (!this._hass || !this.config || !this.card || !this.appliance) return;

    const states = this._hass.states;
    const cfg = this.config;

    const state = states[cfg.entity_state]?.state ?? "-";
    const time = states[cfg.entity_time]?.state ?? "-";
    const mode = states[cfg.entity_mode]?.state ?? "-";

    const labels = this.appliance.labels;
    const imageUrl = cfg.image || this.appliance.image;

    this.card.innerHTML = `
      <div class="container">
        <div class="image" style="background-image: url('${imageUrl}');"></div>
        <div class="info">
          <div class="info-line">
            <span class="label">${labels.state}</span>
            <span class="value">${state}</span>
          </div>
          <div class="info-line">
            <span class="label">${labels.time}</span>
            <span class="value">${time}</span>
          </div>
          <div class="info-line">
            <span class="label">${labels.mode}</span>
            <span class="value">${mode}</span>
          </div>
        </div>
      </div>
    `;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("white-goods-card", WhiteGoodsCard);
