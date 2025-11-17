import { Host, h } from '@stencil/core';
export class GalAvatar {
  constructor() {
    this.name = 'Alex Doe';
    this.src = undefined;
    this.alt = undefined;
    this.size = 'md';
    this.variant = 'primary';
    this.status = 'none';
  }
  getInitials() {
    if (!this.name)
      return '??';
    return this.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || '??';
  }
  getAlt() {
    if (this.alt)
      return this.alt;
    if (this.name)
      return `Avatar de ${this.name}`;
    return 'Avatar';
  }
  render() {
    const classes = [
      'qa-avatar',
      `qa-avatar--${this.size}`,
      `qa-avatar--${this.variant}`
    ].join(' ');
    return (h(Host, null, h("div", { class: classes, role: "img", "aria-label": this.getAlt() }, h("div", { class: "qa-avatar__clip" }, this.src ? (h("img", { class: "qa-avatar__img", src: this.src, alt: this.getAlt() })) : (h("span", { "aria-hidden": "true" }, this.getInitials()))), this.status !== 'none' && (h("span", { class: ['qa-avatar__status', `qa-status--${this.status}`].join(' '), "aria-hidden": "true" })))));
  }
  static get is() { return "gal-avatar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gal-avatar.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gal-avatar.css"]
    };
  }
  static get properties() {
    return {
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Nom complet utilis\u00E9 pour g\u00E9n\u00E9rer les initiales"
        },
        "attribute": "name",
        "reflect": false,
        "defaultValue": "'Alex Doe'"
      },
      "src": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "URL de l\u2019image"
        },
        "attribute": "src",
        "reflect": false
      },
      "alt": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Texte alternatif personnalis\u00E9"
        },
        "attribute": "alt",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Size",
          "resolved": "\"lg\" | \"md\" | \"sm\"",
          "references": {
            "Size": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Taille du composant"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'md'"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Variant",
          "resolved": "\"accent\" | \"accentSoft\" | \"cherry\" | \"cyan\" | \"error\" | \"indigo\" | \"indigoAlt\" | \"info\" | \"neutralDark\" | \"primary\" | \"primaryLight\" | \"secondary\" | \"success\" | \"warning\" | \"yellow\"",
          "references": {
            "Variant": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Variante s\u00E9mantique"
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
      },
      "status": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Status",
          "resolved": "\"away\" | \"busy\" | \"none\" | \"offline\" | \"online\"",
          "references": {
            "Status": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Statut affich\u00E9 dans la pastille"
        },
        "attribute": "status",
        "reflect": false,
        "defaultValue": "'none'"
      }
    };
  }
}
//# sourceMappingURL=gal-avatar.js.map
