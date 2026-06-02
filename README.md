# RE Bank - Plataforma de Tokenización Inmobiliaria

## 🏢 Descripción

RE Bank es un **prototipo visual premium** de una plataforma fintech B2B para tokenización de proyectos inmobiliarios. Permite a inversores comprar tokens equivalentes a participaciones en desarrollos inmobiliarios, gestionar carteras, recibir rentabilidades y acceder a fondos diversificados.

### 🎯 Características Principales

- **Portal del Inversor:** Dashboard, marketplace de proyectos, cartera, wallet, reportes, fondos
- **Panel Administrativo:** Gestión de proyectos, tokenización, inversores, KYC, transacciones, distribuciones
- **Datos Mock Realistas:** 6 proyectos (Argentina/Chile), 5 fondos, 7 inversores, 6 tokens activos
- **Diseño Ultra Premium:** Paleta navy/emerald/cyan, componentes reutilizables, gráficos interactivos
- **100% Navegable:** Todos los botones funcionan, flujo completo desde descubrir proyecto hasta invertir

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

El servidor estará disponible en: **http://localhost:3000**

## 📁 Estructura del Proyecto

```
real-estate-tokenization/
├── app/
│   ├── page.tsx (Landing Premium)
│   ├── layout.tsx
│   ├── investor/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── wallet/
│   │   ├── portfolio/
│   │   ├── reports/
│   │   ├── funds/
│   │   └── ecosystem/
│   └── admin/
│       ├── layout.tsx
│       ├── dashboard/
│       ├── projects/
│       ├── investors/
│       ├── tokenization/
│       ├── kyc/
│       ├── documents/
│       ├── transactions/
│       ├── smart-contracts/
│       └── (+ 6 vistas más)
│
├── components/
│   ├── common/ (Button, Badge, MetricCard, ProjectCard, Table, etc)
│   ├── layout/ (InvestorLayout, AdminLayout)
│   └── charts/ (PortfolioChart, DistributionChart, ReturnsChart)
│
├── lib/
│   ├── types.ts (Tipos TypeScript)
│   ├── mockData.ts (Datos simulados realistas)
│   └── utils.ts (Funciones utilitarias)
│
└── public/ (Imágenes, iconos)
```

## 🎨 Stack Tecnológico

- **Next.js 16** - Framework React moderno
- **React 19** - Librería UI
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Diseño responsivo con tema premium
- **Recharts** - Gráficos interactivos
- **lucide-react** - Iconografía elegante
- **React Hook Form + Zod** - Formularios y validación

## 📊 Datos Mock

### 6 Proyectos Inmobiliarios (Argentina/Chile)

1. **Valle Norte Mendoza** - Loteo residencial, USD 8.5M, 12-15% rentabilidad
2. **Torre Andes Residence** - Edificio premium CABA, USD 12M, 14-18%
3. **Fondo Renta Urbana Chile** - Alquileres Santiago, USD 15M, 8-10%
4. **Distrito Real Estate Capital** - Fondo diversificado, USD 20M, 10-13%
5. **Vaca Muerta Housing** - Desarrollo habitacional Neuquén, USD 6.5M, 16-20%
6. **Santiago Prime Assets** - Residencial ultra premium Chile, USD 18M, 11-14%

### 5 Fondos Inmobiliarios

- Fondo Residencial Global
- Fondo Comercial+
- Fondo Diversificado Premium
- Fondo Emergente Neuquén
- Fondo Chile Expansion

### Otros Datos Mock

- 7 inversores variados (retail, SME, institucional)
- 6 tokens activos
- Transacciones y smart contracts
- Métricas y reportes

## 🛣️ Rutas Principales

### Portal Inversor
```
/ (Landing)
/investor/dashboard
/investor/projects
/investor/projects/[id]
/investor/invest/[id]
/investor/wallet
/investor/portfolio
/investor/portfolio/[id]
/investor/reports
/investor/funds
/investor/ecosystem
```

### Panel Administrativo
```
/admin/dashboard
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/tokenization
/admin/tokenization/[id]
/admin/smart-contracts
/admin/investors
/admin/investors/[id]
/admin/kyc
/admin/documents
/admin/transactions
/admin/distributions
/admin/funds
/admin/countries
/admin/metrics
/admin/settings
```

## 🎯 Funcionalidades Principales

### Portal Inversor
- ✅ Dashboard con métricas, gráficos, actividad reciente
- ✅ Marketplace de proyectos con filtros y búsqueda
- ✅ Detalle de proyecto con información completa
- ✅ Wizard de inversión de 5 pasos
- ✅ Wallet digital con historial de transacciones
- ✅ Cartera con detalle de inversiones
- ✅ Reportes y análisis de rentabilidad
- ✅ Fondos inmobiliarios con composición
- ✅ Ecosistema conceptual

### Panel Administrativo
- ✅ Dashboard ejecutivo con KPIs
- ✅ Gestión de proyectos (tabla CRUD)
- ✅ Gestión de tokenización
- ✅ Smart contracts visuales
- ✅ Base de datos de inversores
- ✅ Validación KYC/Compliance
- ✅ Gestión documental
- ✅ Historial de transacciones
- ✅ Distribución de rentabilidades
- ✅ Gestión de fondos
- ✅ Configuración multi-país
- ✅ Métricas ejecutivas
- ✅ Configuración general

## 🎨 Diseño Premium

- **Paleta:** Navy primary, Emerald success, Cyan accent
- **Tipografía:** Moderna, limpia, corporativa
- **Componentes:** Reutilizables y consistentes
- **Responsivo:** Mobile, tablet, desktop
- **Gráficos:** Interactivos con Recharts
- **Animaciones:** Suaves y profesionales

## 💡 Casos de Uso

Este prototipo permite demostrar:

1. **Inversión Fraccionada** - Invertir desde USD 100 en proyectos inmobiliarios
2. **Diversificación** - Acceso a múltiples proyectos y fondos
3. **Tokenización** - Participaciones digitales en activos reales
4. **Automatización** - Distribución automática de rentabilidades
5. **Cumplimiento** - KYC, compliance, documentación legal
6. **Escalabilidad** - Soporte multi-país (Argentina, Chile, Uruguay, Paraguay)

## 🔧 Personalización

Para adaptar el proyecto a tus necesidades:

1. **Colores:** Edita la paleta en `tailwind.config.ts`
2. **Datos:** Modifica los datos mock en `lib/mockData.ts`
3. **Textos:** Busca y reemplaza el nombre "RE Bank" con tu marca
4. **Proyectos:** Añade tus propios proyectos a los datos mock
5. **Fondos:** Crea fondos personalizados

## 📝 Notas

- Este es un **prototipo visual** sin backend real
- No hay conexión a blockchain, pagos reales ni APIs externas
- Todos los datos son simulados para demostración
- Ideal para pitch, demo comercial y validación de concepto

## 🤝 Contribuciones

Para contribuir:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commits: `git commit -am 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Pull Request

## 📄 Licencia

MIT

## 👤 Autor

**Federico Tubio** - tubiofederico@gmail.com

---

**🚀 Prototipo Premium Listo para Demo Comercial**

Desarrollado con Next.js, React, TypeScript y Tailwind CSS.
