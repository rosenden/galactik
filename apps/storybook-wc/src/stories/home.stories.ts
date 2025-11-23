import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Home',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="
      padding: var(--space-4xl);
      background-color: var(--color-background-surface);
      min-height: 100vh;
      font-family: var(--font-family-base);
    ">
      <header style="
        margin-bottom: var(--space-6xl);
        text-align: center;
      ">
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='249.126' height='165.191' viewBox='0 0 249.126 165.191' overflow='visible'%3E%3Cpath fill='%23E44D26' d='M85.003 164.563l-47.391-129.659 130.145-34.813 23.674 135.994-49.344 29.016z'/%3E%3Cpath fill='%23F16529' d='M139.144 153.796l39.867-23.457-20.236-116.216-53.189 14.229z'/%3E%3Cpath fill='%23EFEFEF' d='M229.654 67.17l6.064 20.864-46.424 13.117s0 27.922-22.529 39.022c-22.527 11.101-40.027 1.688-40.027 1.688l-2.802-8.074 33.417-9.086 7.396-28.6-21.529-21.176-30.948 9.36-2.687-7.345s14.46-31.959 57.186-13.782c0 0 13.463 8.401 16.482 15.81l46.401-11.798zM235.718 65.603l7.397-2.131 5.951 21.306-7.742 2.348z'/%3E%3Cpath fill='%23BCBCBC' d='M238.324 64.662l4.791-1.19 5.951 21.306-7.742 2.348-2.028-7.134 3.09-1.209zM224.535 68.475l5.119-1.305 6.064 20.864-46.424 13.117s-.5 24.363-16.656 35.395c-16.129 11.023-34.307 10.691-45.906 5.316l-1.293-3.723s31.568 7.422 47.199-16.297c9.426-15.637 9.26-26.911 9.26-26.911l46.584-12.611-3.947-13.845zM109.579 76.927l27.249-7.908 6.38 5.893-30.942 9.36z'/%3E%3Cpath fill='%23EFEFEF' d='M13.516 91.714l5.47 21.024 46.586-12.477s14.294 23.98 39.336 21.983c25.049-1.996 35.254-19.034 35.254-19.034l-1.727-8.368-33.354 9.296-20.993-20.774 7.658-29.228 31.384-7.793-1.453-7.69s-28.772-20.059-56.188 17.416c0 0-7.256 14.102-6.072 22.01l-45.901 13.635zM7.508 93.474l-7.448 1.951 5.791 21.344 7.857-1.939z'/%3E%3Cpath fill='%23BCBCBC' d='M4.789 93.991l-4.729 1.434 5.791 21.344 7.857-1.939-1.901-7.173-3.288.545zM18.596 90.216l-5.08 1.498 5.47 21.024 46.586-12.477s12.905 20.666 32.426 21.882c19.502 1.203 34.941-8.369 42.164-18.933l-.787-3.858s-23.334 22.535-48.907 10.154c-16.098-8.611-21.716-18.395-21.716-18.395l-46.483 13.014-3.673-13.909zM121.677 38.66l-27.448 7.14-2.476 8.337 31.383-7.793z'/%3E%3C/svg%3E" 
          alt="Web Components Logo" 
          style="
            height: 50px;
            margin-bottom: var(--space-lg);
          " 
        />
        <h1 style="
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-font-primary-base);
          margin-bottom: var(--space-md);
          line-height: var(--line-height-6);
        ">
          Galactik Design System
        </h1>
        <p style="
          font-size: var(--font-size-lg);
          color: var(--color-font-neutral-muted);
          line-height: var(--line-height-4);
        ">
          Web Components library
        </p>
      </header>

      <section style="margin-bottom: var(--space-5xl);">
        <h2 style="
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          color: var(--color-font-primary-base);
          margin-bottom: var(--space-3xl);
          padding-bottom: var(--space-md);
          border-bottom: var(--stroke-xs) solid var(--color-border-base);
          line-height: var(--line-height-5);
        ">
          Electrons
        </h2>
        
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--space-3xl);
        ">
          <!-- Avatar Card -->
          <a
            href="?path=/docs/electrons-avatar--docs"
            onclick="event.preventDefault(); var url = new URL('?path=/docs/electrons-avatar--docs', window.location.href).toString(); if (window.top) { window.top.location.href = url; } else { window.location.href = url; }"
            style="
              text-decoration: none;
              background-color: var(--color-background-alt);
              border-radius: var(--radius-lg);
              box-shadow: 0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08);
              transition: all 0.2s ease;
              cursor: pointer;
              border: var(--stroke-xs) solid var(--color-border-base);
              overflow: hidden;
              display: flex;
              flex-direction: column;
            "
            onmouseenter="this.style.boxShadow='0 var(--space-xs) var(--space-2xl) rgba(0, 0, 0, 0.12)'; this.style.transform='translateY(calc(-1 * var(--space-3xs)))';"
            onmouseleave="this.style.boxShadow='0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)'; this.style.transform='translateY(0)';"
          >
            <div style="
              padding: var(--space-4xl);
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 120px;
              border-bottom: var(--stroke-xs) solid var(--color-border-base);
              background: linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%);
            ">
              <gal-avatar name="Alice Smith" size="medium" avatar-color="sage"></gal-avatar>
            </div>
            <div style="padding: var(--space-3xl);">
              <h3 style="
                font-size: var(--font-size-lg);
                font-weight: var(--font-weight-semibold);
                color: var(--color-font-primary-base);
                margin-bottom: var(--space-sm);
                line-height: var(--line-height-4);
              ">Avatar</h3>
              <p style="
                font-size: var(--font-size-sm);
                color: var(--color-font-neutral-muted);
                line-height: var(--line-height-3);
                margin-bottom: var(--space-lg);
              ">Affiche un avatar avec initiales ou image</p>
              <div style="
                font-size: var(--font-size-sm);
                color: var(--color-font-secondary-base);
                font-weight: var(--font-weight-semibold);
              ">Voir la documentation →</div>
            </div>
          </a>

          <!-- Badge Card -->
          <a
            href="?path=/docs/electrons-badge--docs"
            onclick="event.preventDefault(); var url = new URL('?path=/docs/electrons-badge--docs', window.location.href).toString(); if (window.top) { window.top.location.href = url; } else { window.location.href = url; }"
            style="
              text-decoration: none;
              background-color: var(--color-background-alt);
              border-radius: var(--radius-lg);
              box-shadow: 0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08);
              transition: all 0.2s ease;
              cursor: pointer;
              border: var(--stroke-xs) solid var(--color-border-base);
              overflow: hidden;
              display: flex;
              flex-direction: column;
            "
            onmouseenter="this.style.boxShadow='0 var(--space-xs) var(--space-2xl) rgba(0, 0, 0, 0.12)'; this.style.transform='translateY(calc(-1 * var(--space-3xs)))';"
            onmouseleave="this.style.boxShadow='0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)'; this.style.transform='translateY(0)';"
          >
            <div style="
              padding: var(--space-4xl);
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 120px;
              border-bottom: var(--stroke-xs) solid var(--color-border-base);
              background: linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%);
            ">
              <gal-badge number="5" color="success" variant="primary" size="sm"></gal-badge>
            </div>
            <div style="padding: var(--space-3xl);">
              <h3 style="
                font-size: var(--font-size-lg);
                font-weight: var(--font-weight-semibold);
                color: var(--color-font-primary-base);
                margin-bottom: var(--space-sm);
                line-height: var(--line-height-4);
              ">Badge</h3>
              <p style="
                font-size: var(--font-size-sm);
                color: var(--color-font-neutral-muted);
                line-height: var(--line-height-3);
                margin-bottom: var(--space-lg);
              ">Color-coded badge for statuses or labels</p>
              <div style="
                font-size: var(--font-size-sm);
                color: var(--color-font-secondary-base);
                font-weight: var(--font-weight-semibold);
              ">Voir la documentation →</div>
            </div>
          </a>

          <!-- Bullet Card -->
          <a
            href="?path=/docs/electrons-bullet--docs"
            onclick="event.preventDefault(); var url = new URL('?path=/docs/electrons-bullet--docs', window.location.href).toString(); if (window.top) { window.top.location.href = url; } else { window.location.href = url; }"
            style="
              text-decoration: none;
              background-color: var(--color-background-alt);
              border-radius: var(--radius-lg);
              box-shadow: 0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08);
              transition: all 0.2s ease;
              cursor: pointer;
              border: var(--stroke-xs) solid var(--color-border-base);
              overflow: hidden;
              display: flex;
              flex-direction: column;
            "
            onmouseenter="this.style.boxShadow='0 var(--space-xs) var(--space-2xl) rgba(0, 0, 0, 0.12)'; this.style.transform='translateY(calc(-1 * var(--space-3xs)))';"
            onmouseleave="this.style.boxShadow='0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)'; this.style.transform='translateY(0)';"
          >
            <div style="
              padding: var(--space-4xl);
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 120px;
              border-bottom: var(--stroke-xs) solid var(--color-border-base);
              background: linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%);
            ">
              <gal-bullet color="info" size="medium"></gal-bullet>
            </div>
            <div style="padding: var(--space-3xl);">
              <h3 style="
                font-size: var(--font-size-lg);
                font-weight: var(--font-weight-semibold);
                color: var(--color-font-primary-base);
                margin-bottom: var(--space-sm);
                line-height: var(--line-height-4);
              ">Bullet</h3>
              <p style="
                font-size: var(--font-size-sm);
                color: var(--color-font-neutral-muted);
                line-height: var(--line-height-3);
                margin-bottom: var(--space-lg);
              ">Colored dot for state indicators</p>
              <div style="
                font-size: var(--font-size-sm);
                color: var(--color-font-secondary-base);
                font-weight: var(--font-weight-semibold);
              ">Voir la documentation →</div>
            </div>
          </a>

          <!-- Button Card -->
          <a
            href="?path=/docs/electrons-button--docs"
            onclick="event.preventDefault(); var url = new URL('?path=/docs/electrons-button--docs', window.location.href).toString(); if (window.top) { window.top.location.href = url; } else { window.location.href = url; }"
            style="
              text-decoration: none;
              background-color: var(--color-background-alt);
              border-radius: var(--radius-lg);
              box-shadow: 0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08);
              transition: all 0.2s ease;
              cursor: pointer;
              border: var(--stroke-xs) solid var(--color-border-base);
              overflow: hidden;
              display: flex;
              flex-direction: column;
            "
            onmouseenter="this.style.boxShadow='0 var(--space-xs) var(--space-2xl) rgba(0, 0, 0, 0.12)'; this.style.transform='translateY(calc(-1 * var(--space-3xs)))';"
            onmouseleave="this.style.boxShadow='0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)'; this.style.transform='translateY(0)';"
          >
            <div style="
              padding: var(--space-4xl);
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 120px;
              border-bottom: var(--stroke-xs) solid var(--color-border-base);
              background: linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%);
            ">
              <gal-button variant="filled" color-variant="primary" size="small">
                <i class="fa-regular fa-plus" slot="icon-left"></i>
                Button
              </gal-button>
            </div>
            <div style="padding: var(--space-3xl);">
              <h3 style="
                font-size: var(--font-size-lg);
                font-weight: var(--font-weight-semibold);
                color: var(--color-font-primary-base);
                margin-bottom: var(--space-sm);
                line-height: var(--line-height-4);
              ">Button</h3>
              <p style="
                font-size: var(--font-size-sm);
                color: var(--color-font-neutral-muted);
                line-height: var(--line-height-3);
                margin-bottom: var(--space-lg);
              ">Button with several variants and states</p>
              <div style="
                font-size: var(--font-size-sm);
                color: var(--color-font-secondary-base);
                font-weight: var(--font-weight-semibold);
              ">Voir la documentation →</div>
            </div>
          </a>

          <!-- Label Card -->
          <a
            href="?path=/docs/electrons-label--docs"
            onclick="event.preventDefault(); var url = new URL('?path=/docs/electrons-label--docs', window.location.href).toString(); if (window.top) { window.top.location.href = url; } else { window.location.href = url; }"
            style="
              text-decoration: none;
              background-color: var(--color-background-alt);
              border-radius: var(--radius-lg);
              box-shadow: 0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08);
              transition: all 0.2s ease;
              cursor: pointer;
              border: var(--stroke-xs) solid var(--color-border-base);
              overflow: hidden;
              display: flex;
              flex-direction: column;
            "
            onmouseenter="this.style.boxShadow='0 var(--space-xs) var(--space-2xl) rgba(0, 0, 0, 0.12)'; this.style.transform='translateY(calc(-1 * var(--space-3xs)))';"
            onmouseleave="this.style.boxShadow='0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)'; this.style.transform='translateY(0)';"
          >
            <div style="
              padding: var(--space-4xl);
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 120px;
              border-bottom: var(--stroke-xs) solid var(--color-border-base);
              background: linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%);
            ">
              <gal-label text="Label" color="success" size="medium" icon="fa-regular fa-circle-check"></gal-label>
            </div>
            <div style="padding: var(--space-3xl);">
              <h3 style="
                font-size: var(--font-size-lg);
                font-weight: var(--font-weight-semibold);
                color: var(--color-font-primary-base);
                margin-bottom: var(--space-sm);
                line-height: var(--line-height-4);
              ">Label</h3>
              <p style="
                font-size: var(--font-size-sm);
                color: var(--color-font-neutral-muted);
                line-height: var(--line-height-3);
                margin-bottom: var(--space-lg);
              ">Text/icon label aligned with the React version</p>
              <div style="
                font-size: var(--font-size-sm);
                color: var(--color-font-secondary-base);
                font-weight: var(--font-weight-semibold);
              ">Voir la documentation →</div>
            </div>
          </a>

          <!-- Checkbox Card -->
          <a
            href="?path=/docs/electrons-checkbox--docs"
            onclick="event.preventDefault(); var url = new URL('?path=/docs/electrons-checkbox--docs', window.location.href).toString(); if (window.top) { window.top.location.href = url; } else { window.location.href = url; }"
            style="
              text-decoration: none;
              background-color: var(--color-background-alt);
              border-radius: var(--radius-lg);
              box-shadow: 0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08);
              transition: all 0.2s ease;
              cursor: pointer;
              border: var(--stroke-xs) solid var(--color-border-base);
              overflow: hidden;
              display: flex;
              flex-direction: column;
            "
            onmouseenter="this.style.boxShadow='0 var(--space-xs) var(--space-2xl) rgba(0, 0, 0, 0.12)'; this.style.transform='translateY(calc(-1 * var(--space-3xs)))';"
            onmouseleave="this.style.boxShadow='0 var(--space-3xs) var(--space-xs) rgba(0, 0, 0, 0.08)'; this.style.transform='translateY(0)';"
          >
            <div style="
              padding: var(--space-4xl);
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 120px;
              border-bottom: var(--stroke-xs) solid var(--color-border-base);
              background: linear-gradient(135deg, var(--color-bg-primary-lightest) 0%, var(--color-background-alt) 100%);
            ">
              <gal-checkbox checked label="Checkbox"></gal-checkbox>
            </div>
            <div style="padding: var(--space-3xl);">
              <h3 style="
                font-size: var(--font-size-lg);
                font-weight: var(--font-weight-semibold);
                color: var(--color-font-primary-base);
                margin-bottom: var(--space-sm);
                line-height: var(--line-height-4);
              ">Checkbox</h3>
              <p style="
                font-size: var(--font-size-sm);
                color: var(--color-font-neutral-muted);
                line-height: var(--line-height-3);
                margin-bottom: var(--space-lg);
              ">Checkbox with selected and indeterminate states</p>
              <div style="
                font-size: var(--font-size-sm);
                color: var(--color-font-secondary-base);
                font-weight: var(--font-weight-semibold);
              ">Voir la documentation →</div>
            </div>
          </a>
        </div>
      </section>

      <footer style="
        margin-top: var(--space-6xl);
        padding-top: var(--space-3xl);
        text-align: center;
        color: var(--color-font-neutral-muted);
        font-size: var(--font-size-sm);
        border-top: var(--stroke-xs) solid var(--color-border-base);
      ">
        <p>Total : 6 composants</p>
      </footer>
    </div>
  `
};
