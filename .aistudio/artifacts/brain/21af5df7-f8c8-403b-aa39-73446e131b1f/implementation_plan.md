# طيبة للعطور والعود الملكي (Tiba Royal Perfumes & Oud) — Comprehensive Architectural & Development Implementation Plan

A complete, production-grade luxury e-commerce and regional boutique operations platform for **دار طيبة للعطور والعود الملكي** (Asyut Regional Flagship & Nationwide Egypt). The platform merges sensorial Upper Egyptian perfumery with real-time merchant operations, algorithmic scent matchmaking, customizable discovery kits, and zero-risk anti-RTO checkout logistics.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Core Decisions & Revised Architectural Principles**:
> - **Typography & Fonts**: **Tajawal** (sleek, high-legibility geometric Arabic & English body) paired with **Noto Kufi Arabic** (regal, modern architectural display and hero titles), with **JetBrains Mono** for tabular numbers, prices (`ج.م`), lot IDs, and discount codes. This replaces the flat/generic fonts with vibrant, high-contrast Arabic luxury calligraphy.
> - **Motion & Sensory Animations**: **Rich cinematic motion with fluid bottle 3D physics and mist**. We will engineer:
>   - Interactive 3D mouse/touch tilt physics on perfume bottles with dynamic specular gold light sheens.
>   - Canvas & SVG animated rising incense smoke and golden amber mist particles.
>   - Fluid liquid mechanics in the Alchemist Crucible with bezier wave ripples that rise and settle upon selecting scent families.
>   - Concentric glowing sillage sonar radar (3.5m beam) and circular +28h longevity telemetry gauges.
>   - Smooth velvet tray snap-in physics for the 3x10ml discovery box customizer.
> - **Navigation & Role Architecture**: **Unified navigation bar with instant role switch and preview mode**. Users can toggle between customer-facing storefront views and the Asyut management deck with a single click, featuring a floating mode badge and live connection indicators.
> - **Unified Reactive Core State**: All pricing, stock levels, commercial promotion toggles (Buy 2 Get 1 Free), announcements, and submitted orders are fully synchronized in a reactive client store so admin modifications reflect instantly across the customer storefront and checkout without reload lag.

---

## 1. Overview & Core Concept

### Platform Identity & Scope
**دار طيبة للعطور والعود الملكي** operates as both a direct-to-consumer luxury perfumery and the operations command deck for its regional headquarters and flagship boutique at City Square, Asyut.

### The 12 Interconnected Platform Modules
1. **المسرح الرئيسي (Main Stage Storefront)**: 3D spatial basalt hero podium with Tuwaiq Parfum, golden incense aura, 3 core value pillars, asymmetric bento catalog, Asyut City Square showroom preview, and verified Egyptian connoisseur testimonials.
2. **بوتقة الخيميائي العطري (Alchemist Scent Advisor Quiz)**: 4-stage sensory diagnosis with real-time liquid crucible visualization, olfactory frequency display (432.8 Hz), tactile fragrance family cards, and preliminary match indicators.
3. **كشف البصمة الملكية (96% Scent Match Result)**: Holographic 96% match reveal for Tuwaiq Royal Parfum, 3-tier olfactory note decomposition, AI justification card, sillage/formality meters, sample guarantee claim, and runner-up alternative recommendations (Kashgar Imperial 89%, Cambodi Oud 84%).
4. **الخزانة الملكية (Royal Vault Catalog)**: Filterable catalog (Extrait de Parfum, Aged Cambodi Oud, Discovery & Gifts, Personal DNA match filter), featuring spotlight bento cards, technical specs, and 1-tap cart additions.
5. **صندوق الاستكشاف الملكي (Velvet Discovery Box Customizer 3x10ml)**: Interactive 3-slot tactile velvet box with smart auto-fill (`طويق + كاشغر + دهن العود`), slot clearing/selection, cushion progress bar, and instant 190 EGP cashback voucher (`TIBA190`).
6. **صفحة تفاصيل العطر (3D Product Detail Page — Tuwaiq Parfum)**: Interactive flacon vs. velvet gift coffer visualizer, 3-tier volume selector (100ml / 50ml / Bundle 2+1 free), 3D deconstructed note pyramid, concentric sillage sonar, longevity gauge, WhatsApp concierge link, and free sample return guarantee.
7. **بوابة الإتمام الملكي الآمن (Anti-RTO Checkout & Payment)**: Egyptian address verification with **mandatory Anti-RTO courier landmark field**, 3 payment pathways (InstaPay/Vodafone Cash 5% instant discount, Paymob Visa/Meeza, Cash on Delivery with pre-inspection), applied `TIBA190` discount, and WhatsApp alternative order bridge.
8. **مركز العمليات والمبيعات (Asyut Operations Dashboard)**: Field management dashboard displaying confirmed daily sales, WhatsApp confirmation queue, live stock alerts (Musk critical alert), urgent orders stream, and quick-adjust price controls.
9. **خزانة العطور وإدارة الأسعار والمخزون (Inventory & Pricing Controller)**: Real-time price steppers (+/- 25, 50, 100 EGP), 1-click stock availability toggles, Olfactory Pyramid note tag editor (add/remove custom notes), AI recommendation weight adjusters (0-10 sliders), and bulk +/- 10% seasonal campaign shifts.
10. **إدارة شحنات العطور والعود (Orders Pipeline & 4x6 Thermal Waybill)**: Order progression workflow (Pending WhatsApp, Confirmed/Preparing, With Courier, Delivered), 1-tap WhatsApp message dispatcher, courier assignment (Bosta / Tiba Fleet), and official high-contrast printable 4x6 thermal courier waybills with SVG barcodes and QR codes.
11. **محرك العروض التجارية والباقات (Commercial Promotions & Shipping Rules)**: Master switch for "Buy 2 Get 1 Free" bundle rule with live revenue impact metrics, interactive free shipping threshold stepper (1,200 EGP default) with governorate SLA breakdown, prepaid incentive manager (-74% return reduction), and live announcement marquee editor.
12. **تحليلات أذواق العملاء وذكاء المستشار (Scent Intelligence & Analytics BI)**: Zero-party data visualizer showing scent family distribution (54% Oud/Amber, 22% Spices, 14% Musk, 10% Citrus), geographic order distribution across Egyptian governorates, 40°C heat endurance metrics, conversion funnel breakdown, and live respondent taste stream.

---

## 2. Technical Architecture & Unified State Management

### System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│              Tiba Perfumes & Royal Oud — Unified Application Core                │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌──────────────────────── Unified Navigation ──────────────────────────────┐   │
│   │  Royal Calligraphic Brand  │  Store Routes  │  Admin Routes  │  Mode Pill │   │
│   └──────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                           │
│   ┌──────────────────────── Central Reactive Store ──────────────────────────┐   │
│   │  • Products State (Prices, Stock Counts, Active Notes, AI Weights)       │   │
│   │  • Orders Pipeline (14 Active Orders, Statuses, Anti-RTO Landmarks)      │   │
│   │  • Commercial Rules (Bundle 2+1 Toggle, Free Shipping Threshold, Promo)  │   │
│   │  • Cart State (Items, Active Vouchers, Applied Discounts, Free Gifts)    │   │
│   │  • Discovery Box State (3 Selected 10ml Vials, Cushion Progress)         │   │
│   │  • Scent Quiz State (Step 1-4 Answers, Live Crucible Liquid Level)       │   │
│   │  • Analytics Stream (Respondent Live Feed, Geographic & Scent Percentages)│  │
│   └──────────────────────────────────────────────────────────────────────────┘   │
│                      │                                   │                       │
│         ┌────────────┴─────────────┐       ┌─────────────┴────────────┐          │
│         ▼                          ▼       ▼                          ▼          │
│  ┌─ Customer Storefront ─┐  ┌─ Alchemist ─┐ ┌─ Admin Operations ─┐ ┌─ Logistics ─┐ │
│  │ • Hero 3D Stage       │  │ • Quiz Flow │ │ • Operations Deck  │ │ • Orders    │ │
│  │ • Royal Vault Catalog │  │ • Crucible  │ │ • Price Steppers   │ │ • 4x6 Print │ │
│  │ • 3D Product Detail   │  │ • 96% Match │ │ • Promotions Engine│ │ • Waybills  │ │
│  │ • Discovery Box       │  │ • AI Advice │ │ • Taste Analytics  │ │ • Bosta EG  │ │
│  │ • Anti-RTO Checkout   │  └─────────────┘ └────────────────────┘ └─────────────┘ │
│  └───────────────────────┘                                                       │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Data Models & Schemas

```typescript
export interface Product {
  id: string;
  name: string;
  nameEn: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  volume: string;
  concentration: string; // e.g. "Extrait de Parfum 30%"
  sillage: string; // e.g. "3.5m"
  longevity: string; // e.g. "+28 hours"
  family: 'oud' | 'spices' | 'musk' | 'citrus' | 'gifts';
  pyramid: {
    top: string[];
    heart: string[];
    base: string[];
  };
  weights: {
    formality: number; // 0 - 10
    oriental: number;  // 0 - 10
    heatResist: number; // 0 - 10
  };
  stockCount: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  isFlagship?: boolean;
  image: string;
  packagingImage?: string;
  auraColor: string;
}

export interface Order {
  id: string; // e.g. "TIBA-8492"
  customerName: string;
  phone: string;
  governorate: 'cairo' | 'asyut' | 'alex' | 'upper' | 'coastal';
  address: string;
  antiRtoLandmark: string; // Mandatory landmark
  items: Array<{ productId: string; name: string; quantity: number; price: number; note?: string }>;
  subtotal: number;
  discount: number;
  shippingCost: number;
  totalCOD: number;
  paymentMethod: 'instapay' | 'paymob' | 'cod';
  status: 'pending_whatsapp' | 'confirmed_preparing' | 'with_courier' | 'delivered';
  courierName?: string;
  trackingNumber?: string;
  createdAt: string;
  giftItem?: string;
}

export interface PromotionSettings {
  buy2Get1Active: boolean;
  freeShippingThreshold: number; // 1200 EGP
  prepaidDiscountPercent: number; // 5%
  activeCashbackCode: string; // "TIBA190"
  cashbackValue: number; // 190 EGP
  announcementText: string;
}

export interface ScentQuizResponse {
  usage: string;
  family: string;
  sillage: string;
  temperature: string;
}
```

---

## 3. Step-by-Step Development Execution Process

### Step 1: Foundation, Typography & Asset Integration
- Configure Google Fonts in `index.html` loading `Tajawal` (300, 400, 500, 700) and `Noto Kufi Arabic` (400, 600, 700, 800) alongside `JetBrains Mono`.
- Set base `dir="rtl"` and `lang="ar"`.
- Configure Tailwind CSS custom font families and theme colors matching the **Nocturnal Royal Oud & Liquid Gold** design token system:
  - Deep volcanic obsidian canvas: `#090807` / `#141312`
  - Smoked glass tiers: `#1d1b1a` (low), `#211f1e` (container), `#2b2a28` (high)
  - Imperial liquid gold: `#f2ca50` / `#d4af37`
  - WhatsApp emerald: `#25d366` / `#18cd61`
  - Crimson ruby: `#b84a39` / `#93000a`
- Verify all 12 local screenshot and media assets in `/public/assets/aistudio/` are properly indexed and referenced with resilient SVG fallbacks.

### Step 2: Global State Context (`AppContext.tsx`)
- Implement a comprehensive React Context containing:
  - Seed catalog with 6 core perfumes: Tuwaiq Parfum, Cambodi Aged Oud, Kashgar Imperial, Royal White Musk, Naseem Tiba French, and Taif Rose Special.
  - Initial active orders stream (14 orders, featuring #TIBA-8492, #TIBA-8491, #TIBA-8489).
  - Commercial promotional rules (Buy 2 Get 1 Free, Free Shipping at 1,200 EGP, 5% Prepaid Discount, TIBA190 code).
  - Shopping Cart with automatic promotion application (automatically deducts 100% of the lowest-priced bottle when 3 qualifying bottles are present).
  - Discovery Box state (3 slots with add, clear, and smart auto-fill).
  - Scent quiz answer tracking and live match calculation.
  - Active view router state (`currentView`: `'main-stage' | 'advisor' | 'vault' | 'discovery' | 'product-detail' | 'match-result' | 'checkout' | 'admin-dashboard' | 'admin-products' | 'admin-orders' | 'admin-promotions' | 'admin-analytics'`).
  - Active user role toggle (`'customer' | 'admin'`).
  - Toast notification event dispatcher.

### Step 3: Global Header & Unified Navigation
- Implement the sticky top glassmorphic header with:
  - Royal calligraphic Tiba crest & "فرع أسيوط: مفتوح الآن" status badge.
  - Customer navigation links with active gold underglow: المسرح الرئيسي، مستشار العطور، الخزانة الملكية، باقة الاستكشاف، معرض أسيوط.
  - Admin quick navigation links: لوحة القيادة، خزانة العطور والأسعار، إدارة الطلبات والشحن (with badge count), العروض والباقات، تحليلات المستشار.
  - Instant Role Switcher button ("معاينة كعميل 👁️" / "لوحة الإدارة ⚙️").
  - Quick Scent DNA badge (`🧬 بصمتك: طويق 96%`).
  - Interactive Shopping Bag counter button opening the luxury cart drawer.
  - Real-time announcement marquee synced directly with the promotional engine.

### Step 4: Sensory Animation Engineering
- **3D Flacon Tilt Physics**: Interactive mouse-coordinate or touch listener calculating 3D rotation (`rotateX`, `rotateY`, `scale`) with an obsidian specular light sweep across bottle shoulders.
- **Canvas Incense Smoke & Amber Mist**: Lightweight HTML5 Canvas component rendering smooth rising mist particles that curl upwards behind the royal perfume flacon with zero GPU stutter.
- **Alchemist Crucible Fluid Simulation**: SVG dynamic fluid reservoir with an animated sine-wave meniscus that shifts height and color hue as the user toggles between scent families.
- **Sonar Sillage Radar Waves**: Concentric pulsing SVG rings broadcasting a 3.5m sillage radius with a sweeping radar beam and numeric telemetry.

### Step 5: Customer Storefront Views
- **Main Stage (`MainStageView.tsx`)**:
  - Spatial 3D Hero with Tuwaiq flacon on volcanic basalt, live mist, and 3 key metrics badges (30% pure, 14,500+ clients, 100% refund guarantee).
  - 3-pillar trust strip (100% pure oils, +28h heat endurance, Asyut showroom connection).
  - Asymmetric Bento Catalog showcasing the flagship bottle, Cambodi Oud monolith, and sub-cards.
  - Asyut City Square boutique showroom preview with directions & direct WhatsApp concierge.
  - Verified Egyptian customer reviews (Asyut, Cairo, Minya).
- **Alchemist Scent Advisor Quiz (`FragranceAdvisorView.tsx`)**:
  - Segmented 4-stage progress rail with percentage indicator.
  - 4 tactile scent family cards (Oud & Royal Palaces, Fresh Citrus & Sea, Pure White Musk, Warm Vanilla & Spices).
  - Sticky Alchemist Crucible panel with fluid simulation, 432.8 Hz frequency meter, and live DNA match card.
- **96% Scent Match Result (`MatchResultView.tsx`)**:
  - Grand reveal of Tuwaiq Royal Parfum with circular holographic 96% match SVG.
  - 3-tier olfactory note pyramid breakdown.
  - AI justification card explaining why this perfume was matched to the customer's climate and formality preferences.
  - Dual CTAs: 1-click cart addition & WhatsApp free gift claim.
  - Fallback Discovery Box card (190 EGP with 100% cashback).
  - Runner-up alternatives: Kashgar Imperial (89%) and Cambodi Oud (84%).
- **Royal Vault Catalog (`RoyalVaultView.tsx`)**:
  - Category filters: All (6), Extrait de Parfum, Aged Oud & Mabkhara, Discovery & Gifts, Personal DNA Filter.
  - 12-column asymmetric bento layout featuring Tuwaiq, Cambodi Oud tola, Kashgar Imperial, White Musk Tahara, Discovery Kit, and Ceremonial Diplomatic Gift Box (1,850 EGP).
  - In-store pickup and Asyut showroom visit prompt.
- **Discovery Kit Box Customizer (`DiscoveryKitView.tsx`)**:
  - Sticky velvet presentation tray visualizer with 3 recessed vial slots (#01, #02, #03).
  - Clear vial, replace vial, and "Auto-Fill My Best Match" buttons.
  - Base cushion progress bar dynamically filling as slots are occupied.
  - Golden cashback ticket callout (`TIBA190` - 190 EGP refunded on full bottle purchase).
  - 6 sample selections with Extrait 38% concentration badges.
  - 3-step zero-risk journey guide.
- **3D Product Detail Page (`ProductDetailView.tsx`)**:
  - Toggle between 3D glass flacon view and royal velvet presentation coffer.
  - 3-tier volume & bundle selector: 100ml Standard (950 EGP), 50ml Travel (550 EGP), and Bundle (2 + 1 Free at 1,900 EGP).
  - Deconstructed 3D note pyramid (Top notes first 15 min, Heart notes 1-6h, Base notes +28h).
  - Concentric sillage sonar radar (3.5m) and longevity gauge (+28 hours).
  - Dual purchase controls: 1-click cart addition + instant WhatsApp ordering.
  - Absolute risk-reversal guarantee notice.
- **Anti-RTO Checkout & Payment (`CheckoutView.tsx`)**:
  - Egyptian address form with **prominent, mandatory Anti-RTO courier landmark box**.
  - Dropdown with localized Egyptian governorate delivery SLAs and costs (Asyut 40 EGP, Cairo/Giza 60 EGP, Alex 75 EGP, Upper Egypt 50 EGP, Coastal 85 EGP).
  - 3 payment options: InstaPay / Vodafone Cash (5% instant discount), Paymob Credit/Debit card, Cash on Delivery with pre-inspection.
  - Cart order breakdown with automatic `TIBA190` cashback code, free musk sample gift, and Asyut showroom trust seal.
  - Direct WhatsApp 1-click checkout bridge.

### Step 6: Asyut Boutique Management & Operations Deck
- **Operations Dashboard (`AdminDashboardView.tsx`)**:
  - 4 giant operational KPI cards: Daily confirmed sales, pending WhatsApp orders, Scent advisor hero match (Tuwaiq 62%), and Asyut showroom critical stock alert.
  - Urgent incoming orders stream with 1-tap WhatsApp verification, courier dispatch, and in-store pickup handover buttons.
  - Quick-control price steppers and flash offer master switch.
- **Inventory & Pricing Controller (`AdminProductsView.tsx`)**:
  - Live showroom stock and pricing list with +/- 25, 50, 100 EGP price steppers.
  - 1-tap stock availability toggle (Available / Low Stock / Sold Out).
  - Interactive Olfactory Note Editor: Add or delete individual top, heart, and base notes.
  - Aura color spectrum selector.
  - Scent advisor AI weight tuning sliders (Formality 0-10, Oriental character 0-10, Sillage/Heat resistance 0-10).
  - Bulk +/- 10% seasonal price adjustment modal.
- **Orders Pipeline & Printable 4x6 Waybill (`AdminOrdersView.tsx`)**:
  - 5 status filter pills: All (14), Pending WhatsApp (4), Confirmed/Preparing (5), With Courier (3), Delivered (2).
  - Search filter by order number, customer name, or mobile number.
  - Detailed order cards with consignee details and Anti-RTO landmarks.
  - High-contrast official 4x6 thermal courier waybill viewer with:
    - High-contrast SVG barcode (`TIBA-xxxx-EXP`).
    - Destination zone code (e.g. `BOSTA-STD`, Zone CAI-5).
    - Bold consignee name and phone.
    - Highlighted Anti-RTO courier landmark instructions.
    - COD amount box with pre-inspection permission badge.
    - Simulated QR verification badge and perforated warehouse tear-off slip.
    - Native browser print triggers for thermal 4x6 label or A4 invoice.
- **Commercial Promotions Engine (`AdminPromotionsView.tsx`)**:
  - Giant toggle for "Buy 2 Get 1 Free" bundle rule with live store impact counter and revenue metrics.
  - Interactive shipping threshold stepper (1,200 EGP) with governorate rate breakdown.
  - Prepaid incentive manager (-74% return reduction metric).
  - `TIBA190` discovery kit cashback code usage tracker.
  - Live announcement marquee editor with store synchronization.
- **Scent Intelligence & Analytics BI (`AdminAnalyticsView.tsx`)**:
  - Funnel KPI metrics: Acquisition (1,420 visits), Sensory engagement (84.6% completion), Conversion (19.8%), Top signature (Tuwaiq 68%).
  - SVG donut chart for scent family preference (54% Oud/Amber, 22% Spices, 14% Musk, 10% Citrus).
  - Geographic distribution progress bars across Egyptian governorates.
  - 40°C heat endurance and summer sillage survey matrix (92% pure oils, 79% +18h sillage, 64% pocket flacons).
  - Post-discovery conversion paths breakdown.
  - Live stream table of recent visitor taste discoveries.
  - Spring algorithm re-weighting action bar.

### Step 7: Fast Loading & Performance Optimizations
- Use CSS hardware-accelerated transforms (`translate3d`, `will-change`) for all bottle tilt and hover actions.
- Inline SVG vectors for all radars, gauges, waveforms, barcodes, and crucibles to eliminate external network requests.
- Localized Google Fonts preconnect with `display=swap` to eliminate FOIT.
- Zero external tracking or bloated third-party dependencies.

---

## 4. Verification & Testing Checklist

1. **Compilation & Type Safety**: Run `compile_applet` and verify zero TypeScript or syntax errors.
2. **Typography Verification**: Ensure `Tajawal` is applied for body and `Noto Kufi Arabic` for headlines with no clipping or orphan text.
3. **Reactive State Sync Verification**:
   - Change a price in `AdminProductsView` -> Confirm immediate price update in `RoyalVaultView`, `ProductDetailView`, and `CheckoutView`.
   - Toggle "Buy 2 Get 1 Free" in `AdminPromotionsView` -> Add 3 items to cart -> Confirm 100% discount on the third item.
   - Complete checkout form -> Confirm new order appears immediately in `AdminOrdersView` and `AdminDashboardView`.
   - Update announcement banner in admin -> Confirm immediate update on customer storefront.
4. **Physical Printing Verification**: Trigger waybill print and confirm standard 4x6 thermal formatting.
5. **Animation & Motion Verification**: Confirm 3D bottle tilt, liquid crucible level, sillage sonar ping, and canvas mist run smoothly without layout shift.
