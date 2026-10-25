export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  size: string;
  stock: number;
  category: 'oud' | 'oriental' | 'floral' | 'fresh' | 'leather';
  categoryLabel: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevityHours: number; // e.g. 14
  sillageRating: number; // e.g. 9.2 (out of 10)
  sillageRadiusMeters: number; // e.g. 3.5
  concentration: string; // "Extrait de Parfum - 32%"
  season: 'winter' | 'autumn' | 'spring' | 'summer' | 'all';
  gender: 'unisex' | 'masculine' | 'feminine';
  image: string;
  packagingImage?: string; // Luxury gift box with brand logo
  description: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  customNoteRecipe?: string;
  weightGrams?: number;
}

export interface FlyingProductAnimationState {
  product: Product;
  startRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  timestamp: number;
}

export interface CartItem {
  id: string; // unique item id
  product: Product;
  quantity: number;
  selectedSize: string;
  unitPrice: number;
  isFreeGift?: boolean;
  isDiscoveryKit?: boolean;
  discoverySelection?: Product[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  altPhone?: string;
  governorate: string;
  city: string;
  address: string;
  antiRtoLandmark: string; // Vital for Upper Egypt couriers
  paymentMethod: 'cod' | 'instapay' | 'paymob';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'pending_confirmation' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  courier: 'Bosta' | 'Aramex' | 'Mylerz' | 'Asyut Local Express';
  trackingNumber: string;
  createdAt: string;
  notes?: string;
  estimatedDelivery: string;
}

export interface PromotionSettings {
  buy2Get1FreeActive: boolean;
  freeShippingThreshold: number; // e.g. 1500 EGP
  standardShippingFee: number; // e.g. 60 EGP
  asyutShippingFee: number; // e.g. 35 EGP
  announcementText: string;
  discoveryCashbackAmount: number; // 190 EGP
  discoveryBoxPrice: number; // 190 EGP
  instaPayDiscountPercent: number; // 5%
}

export interface ScentNote {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'oud' | 'amber' | 'musk' | 'floral' | 'wood' | 'spice' | 'leather' | 'citrus';
  categoryLabel: string;
  origin: string;
  description: string;
  scentProfile: string; // Explains exactly what it smells like
  longevityImpact: string;
  sensoryDescriptors: string[];
  featuredInProductIds: string[];
  rarityLevel: 'نادر جداً' | 'فاخر معتق' | 'ملكي خالص' | 'طبيعي نقي';
  intensityRating: number; // 1 to 10
  longevityHours: number; // e.g. 48 hours
  sillageRating: number; // 1 to 10
  commonPairings: string[]; // e.g. ['ورد طائفي', 'زعفران', 'عنبر']
  bestSeason: string;
}

export interface QuizAnswer {
  gender?: 'men' | 'women' | 'unisex';
  occasion?: 'daily' | 'evening' | 'royal' | 'office';
  season?: 'winter' | 'summer' | 'all';
  vibe?: 'smoky_oud' | 'sweet_amber' | 'fresh_citrus' | 'spicy_floral';
  intensity?: 'moderate' | 'intense' | 'beast_mode';
  moodSliderValue?: number; // 0 (Energetic/Citrus) to 100 (Mysterious/Oud)
}

export type ViewMode = 
  | 'main' 
  | 'quiz' 
  | 'quiz-result' 
  | 'catalog' 
  | 'product-detail' 
  | 'discovery-kit' 
  | 'checkout' 
  | 'notes-encyclopedia'
  | 'admin-dashboard' 
  | 'admin-products' 
  | 'admin-orders' 
  | 'admin-promotions' 
  | 'admin-analytics';

export type UserRole = 'customer' | 'admin';

