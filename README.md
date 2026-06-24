# Portafolio — Alejandro Insfran Cañete

Oracle Developer · Fintech · JavaScript · Python · SaaS Builder

## Estructura del proyecto

```
/
├── index.html                  # Portafolio completo
├── CV-Alejandro-Insfran.pdf    # CV ATS-friendly (blanco, Times, una columna)
├── vercel.json                 # Config para deploy en Vercel
└── README.md
```

## Deploy en Vercel (5 minutos)

1. Subí esta carpeta a un repo en GitHub (público o privado)
2. Entrá a https://vercel.com → "New Project"
3. Importá el repo desde GitHub
4. Framework Preset: **Other** (static)
5. Click "Deploy" — listo

## Activar el formulario de contacto (EmailJS)

El formulario envía emails a **aleinsfran021@gmail.com** usando EmailJS (gratis hasta 200 emails/mes).

**Pasos:**
1. Creá cuenta en https://www.emailjs.com
2. **Add Email Service** → Gmail → conectá tu cuenta → copiá el `Service ID`
3. **Email Templates** → Create Template → pegá esto como body:
   ```
   De: {{from_name}} ({{reply_to}})
   Asunto: {{subject}}
   
   {{message}}
   ```
   Copiá el `Template ID`
4. **Account** → API Keys → copiá el `Public Key`
5. En `index.html`, buscá estas 3 líneas al final y reemplazá:
   ```js
   emailjs.init({publicKey:'TU_PUBLIC_KEY'});       // ← tu Public Key
   const EJ_SERVICE  = 'TU_SERVICE_ID';             // ← tu Service ID
   const EJ_TEMPLATE = 'TU_TEMPLATE_ID';            // ← tu Template ID
   ```
6. Commit + push → Vercel redeploya automáticamente

## Links a actualizar cuando tengas URLs de proyectos

En `index.html`, los proyectos tienen `href="#"`. Reemplazá con la URL real:
- Domra: `href="https://tu-url-domra.com"`
- SalesClose: `href="https://tu-url-salesclose.com"`
- WalletIQ: `href="https://tu-url-walletiq.com"`
