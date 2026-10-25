import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, CartItem, PromotionSettings, ViewMode, UserRole, QuizAnswer, ScentNote, FlyingProductAnimationState } from '../types';
import { SCENT_NOTES_DATABASE } from '../data/scentNotesDatabase';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  view: ViewMode;
  setView: (view: ViewMode) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  
  // Products
  products: Product[];
  updateProductPrice: (id: string, newPrice: number) => void;
  adjustProductPriceDelta: (id: string, delta: number) => void;
  toggleProductStock: (id: string) => void;
  updateProductNotes: (id: string, recipe: string) => void;
  
  // Cart & Royal Box Animation
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  flyingProduct: FlyingProductAnimationState | null;
  setFlyingProduct: (val: FlyingProductAnimationState | null) => void;
  royalBoxBurstTimestamp: number;
  triggerRoyalBoxBurst: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    selectedSize?: string,
    sourceEventOrRect?: any
  ) => void;
  addDiscoveryBoxToCart: (selectedProducts: Product[]) => void;
  updateCartItemQty: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Totals
  cartSubtotal: number;
  cartDiscount: number;
  cartBuy2Get1Discount: number;
  cartShipping: number;
  cartTotal: number;
  
  // Orders
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  assignCourier: (orderId: string, courier: Order['courier'], trackingNum?: string) => void;
  submitNewOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingNumber'>) => Order;
  selectedOrderForWaybill: Order | null;
  setSelectedOrderForWaybill: (order: Order | null) => void;
  isWaybillModalOpen: boolean;
  setIsWaybillModalOpen: (open: boolean) => void;
  
  // Promotions
  promotions: PromotionSettings;
  updatePromotions: (partial: Partial<PromotionSettings>) => void;
  
  // Discovery Kit
  discoverySlots: (Product | null)[];
  setDiscoverySlot: (slotIndex: number, product: Product) => void;
  clearDiscoverySlot: (slotIndex: number) => void;
  autoFillDiscoveryBox: () => void;
  
  // Quiz
  quizAnswers: QuizAnswer;
  setQuizAnswer: (key: keyof QuizAnswer, value: any) => void;
  resetQuiz: () => void;
  quizResultProduct: Product | null;
  setQuizResultProduct: (product: Product | null) => void;
  
  // Scent Notes Encyclopedia Database
  selectedScentNote: ScentNote | null;
  setSelectedScentNote: (note: ScentNote | null) => void;
  isNoteExplainerOpen: boolean;
  setIsNoteExplainerOpen: (open: boolean) => void;
  openNoteExplainer: (noteNameOrId: string) => void;

  // Helpers
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'tiba-royal-oud',
    nameAr: 'طيبة عود ملكي معتق',
    nameEn: 'Tiba Royal Aged Oud',
    subtitle: 'دهن عود كمبودي كهرماني معتق 25 عاماً ممتزج بالورد الطائفي النادر',
    price: 940,
    originalPrice: 1250,
    size: '100ml',
    stock: 48,
    category: 'oud',
    categoryLabel: 'العود الملكي',
    topNotes: ['زعفران كشميري ملكي', 'برغموت صقلي منعش', 'هيل أخضر'],
    heartNotes: ['ورد طائفي نخب أول', 'خشب الصندل الميسوري', 'خزامى جبلية'],
    baseNotes: ['عود كمبودي ملكي معتق 25 عاماً', 'عنبر الحوت الأشهب', 'مسك غزال أسود'],
    longevityHours: 18,
    sillageRating: 9.6,
    sillageRadiusMeters: 3.8,
    concentration: 'Extrait de Parfum - 32%',
    season: 'winter',
    gender: 'unisex',
    image: '/assets/perfumes/royal_oud.jpg',
    packagingImage: '/assets/perfumes/royal_gift_box.jpg',
    description: 'أيقونة دار طيبة التاريخية. توليفة ملكية نادرة تفتتح بنفحات الزعفران الكشميري المتبل، وتغوص في قلب مخملي من الورد الطائفي، لترتكز على قاعدة مهيبة من دهن العود الكمبودي المعتق ربع قرن. ثبات أسطوري وفوحان يملأ المجالس.',
    isBestSeller: true,
    isNew: false,
    rating: 4.96,
    reviewsCount: 342,
    customNoteRecipe: 'مستخلص دهن عود ترات + روح الورد الطائفي 12% + صمغ اللبان الظفاري',
    weightGrams: 420
  },
  {
    id: 'tiba-amber-sultani',
    nameAr: 'عنبر سلطاني مبخر',
    nameEn: 'Sultani Incense Amber',
    subtitle: 'عنبر ملكي دافئ مدخن بعبير لبان الحوجري العماني وفانيليا البوربون',
    price: 880,
    originalPrice: 1100,
    size: '100ml',
    stock: 36,
    category: 'oriental',
    categoryLabel: 'شرقي عنبري',
    topNotes: ['لبان الحوجري الملكي', 'قرفة سيلانية', 'فلفل وردي مدغشقري'],
    heartNotes: ['راتنج البنزوين', 'تونكا برازيلية', 'أخشاب الأرز الأطلسي'],
    baseNotes: ['عنبر رمادي أصيل', 'فانيليا بوربون سوداء', 'مسك حريري'],
    longevityHours: 16,
    sillageRating: 9.3,
    sillageRadiusMeters: 3.4,
    concentration: 'Extrait de Parfum - 30%',
    season: 'autumn',
    gender: 'unisex',
    image: '/assets/perfumes/sultani_amber.jpg',
    packagingImage: '/assets/perfumes/royal_gift_box.jpg',
    description: 'تحفة شرقية تبعث على الدفء والسكينة والهيبة. نفحات بخورية فخمة تدوم طويلاً، تجمع بين اللبان العماني المعتق وعنبر الحوت المخملي مع لمسة فانيليا البوربون الكثيفة.',
    isBestSeller: true,
    isNew: false,
    rating: 4.91,
    reviewsCount: 218,
    customNoteRecipe: 'أوليبانوم عماني حوجري + رزين العنبر الكهرماني + بلسم التولو',
    weightGrams: 410
  },
  {
    id: 'tiba-night-musk',
    nameAr: 'مسك الليل الأسيوطي',
    nameEn: 'Asyut Night Musk',
    subtitle: 'مسك نقي بارد مع نفحات زهرية ليلية ولمسات السوسن الفلورنسي النبيل',
    price: 790,
    originalPrice: 950,
    size: '100ml',
    stock: 62,
    category: 'floral',
    categoryLabel: 'زهري أرستقراطي',
    topNotes: ['زهر البرتقال النبيل', 'سوسن إيطالي فاخر', 'كمثرى بيضاء'],
    heartNotes: ['مسك الطهارة الأبيض', 'ياسمين ليلي صعيدي', 'زنبق الوادي'],
    baseNotes: ['مسك الكشمير الحريري', 'خشب الأرز الأبيض', 'عنبر كريستالي'],
    longevityHours: 14,
    sillageRating: 8.8,
    sillageRadiusMeters: 2.8,
    concentration: 'Eau de Parfum Intense - 26%',
    season: 'all',
    gender: 'unisex',
    image: '/assets/perfumes/night_musk.jpg',
    packagingImage: '/assets/perfumes/royal_gift_box.jpg',
    description: 'عطر النقاء والهدوء الأرستقراطي المستوحى من نسائم أمسيات أسيوط الرقيقة على ضفاف النيل. مزيج استثنائي من المسك الأبيض البارد مع زهور الياسمين والسوسن.',
    isBestSeller: false,
    isNew: true,
    rating: 4.88,
    reviewsCount: 174,
    customNoteRecipe: 'مسك الماكروسيكليك الصافي + خلاصة السوسن الباليدا + هيديون زيتي',
    weightGrams: 395
  },
  {
    id: 'tiba-leather-prestige',
    nameAr: 'جلد فاخر معتق',
    nameEn: 'Tuscan Royal Leather',
    subtitle: 'جلود إيطالية ناعمة مع الهيل الأسود وتوت العليق وأخشاب البتولا',
    price: 920,
    originalPrice: 1200,
    size: '100ml',
    stock: 24,
    category: 'leather',
    categoryLabel: 'جلود نادرة',
    topNotes: ['توت العليق الأسود', 'زعفران زعتر بري', 'هيل أسود'],
    heartNotes: ['جلد كوردوفان فخم', 'ياسمين بري مدخن', 'أوليبانوم'],
    baseNotes: ['جلد الغزال السويدي', 'خشب البتولا المدخن', 'عنبر أسود'],
    longevityHours: 17,
    sillageRating: 9.4,
    sillageRadiusMeters: 3.6,
    concentration: 'Extrait de Parfum - 30%',
    season: 'winter',
    gender: 'masculine',
    image: '/assets/perfumes/leather_prestige.jpg',
    packagingImage: '/assets/perfumes/oud_box_design.jpg',
    description: 'تجسيد حقيقي للقوة والفخامة الرجالية الرفيعة. نفحات الجلد المعتق الفاخر المصحوبة بتوت العليق البري والزعتر الجبلي، مصممة لأصحاب الشخصيات القيادية.',
    isBestSeller: false,
    isNew: false,
    rating: 4.93,
    reviewsCount: 160,
    customNoteRecipe: 'ايسوبوتيل كينولين ملكي + زيت قطران البتولا المقطر + كاشميران',
    weightGrams: 425
  },
  {
    id: 'tiba-patchouli-noir',
    nameAr: 'باتشولي ملكي نوير',
    nameEn: 'Patchouli Royal Noir',
    subtitle: 'أوراق الباتشولي الإندونيسي الداكن ممزوجة بمسحوق الكاكاو الداكن والبخور',
    price: 850,
    originalPrice: 1050,
    size: '100ml',
    stock: 31,
    category: 'oriental',
    categoryLabel: 'شرقي خشبي ترابي',
    topNotes: ['كاكاو هولندي داكن', 'أوراق الباتشولي الخضراء', 'يوسفي إيطالي'],
    heartNotes: ['باتشولي سومطري معتق', 'خشب الجاياك المدخن', 'سوسن أسود'],
    baseNotes: ['جلود داكنة', 'فيتيفر بوربون ترابي', 'عنبر بني'],
    longevityHours: 15,
    sillageRating: 9.0,
    sillageRadiusMeters: 3.1,
    concentration: 'Eau de Parfum Intense - 28%',
    season: 'winter',
    gender: 'unisex',
    image: '/assets/perfumes/patchouli_noir.jpg',
    packagingImage: '/assets/perfumes/oud_box_design.jpg',
    description: 'عطر ترابي عميق وآسر يفيض بالجاذبية الغامضة. يعتمد على أنقى قطفات الباتشولي الإندونيسي المعتق في براميل خشبية عتيقة لثلاث سنوات كاملة.',
    isBestSeller: false,
    isNew: true,
    rating: 4.87,
    reviewsCount: 95,
    customNoteRecipe: 'مستخلص باتشولول المنقى + خلاصة كاكاو استوائي + نجيل الهند الهايتي',
    weightGrams: 410
  },
  {
    id: 'tiba-florian-zahra',
    nameAr: 'زهرة النيل الملكية',
    nameEn: 'Royal Nile Neroli',
    subtitle: 'نيرولي فرنسي نضر مع شاي الياسمين الأخضر ونفحات خشب الأرز المنعش',
    price: 760,
    originalPrice: 900,
    size: '100ml',
    stock: 54,
    category: 'fresh',
    categoryLabel: 'حمضي منعش راقي',
    topNotes: ['زهر الليمون الصعيدي', 'نيرولي كابوا', 'برغموت كالابريا'],
    heartNotes: ['شاي ياسمين أبيض', 'براعم البرتقال', 'خشب السرو'],
    baseNotes: ['أخشاب الأرز المنعشة', 'مسك أبيض نظيف', 'عنبر الحجر الجيري'],
    longevityHours: 12,
    sillageRating: 8.5,
    sillageRadiusMeters: 2.5,
    concentration: 'Eau de Parfum - 22%',
    season: 'spring',
    gender: 'unisex',
    image: '/assets/perfumes/florian_zahra.jpg',
    packagingImage: '/assets/perfumes/royal_gift_box.jpg',
    description: 'انتعاش أرستقراطي مفعم بالحيوية والانتعاش الفاخر. توازن متقن بين حمضيات حوض البحر المتوسط وأزهار وادي النيل الرقيقة مع قاعدة نظيفة ومشرقة.',
    isBestSeller: false,
    isNew: false,
    rating: 4.82,
    reviewsCount: 110,
    customNoteRecipe: 'زيت النيرولي البور + أسيتات الليناليل + أمبروكسان سوبر',
    weightGrams: 390
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8492',
    orderNumber: 'TIBA-8492',
    customerName: 'محمود عبد الرحيم القاضي',
    phone: '01023062507',
    altPhone: '01145892314',
    governorate: 'أسيوط',
    city: 'أسيوط (حي شرق)',
    address: 'شارع الجمهورية - برج الصفا والمروة - الدور الخامس شقة 9',
    antiRtoLandmark: 'أمام بنك مصر الفرع الرئيسي ومقابل صيدلية العزبي مباشرة',
    paymentMethod: 'cod',
    items: [
      {
        id: 'cart-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 2,
        selectedSize: '100ml',
        unitPrice: 940
      }
    ],
    subtotal: 1880,
    discount: 0,
    shipping: 0,
    total: 1880,
    status: 'processing',
    courier: 'Asyut Local Express',
    trackingNumber: 'ASY-EXP-849201',
    createdAt: '2026-10-24 10:15',
    estimatedDelivery: 'اليوم خلال 4 ساعات (تسليم أسيوط الفوري)',
    notes: 'العميل يفضل المعاينة قبل الاستلام - تسليم باليد'
  },
  {
    id: 'ord-8491',
    orderNumber: 'TIBA-8491',
    customerName: 'د. سارة مصطفى الهواري',
    phone: '01289456123',
    altPhone: '01011223344',
    governorate: 'سوهاج',
    city: 'سوهاج (الزهراء)',
    address: 'شارع 15 - عمارة الأطباء - الدور الثالث',
    antiRtoLandmark: 'بجوار نقابة الأطباء وخلف مستشفى الهلال',
    paymentMethod: 'instapay',
    items: [
      {
        id: 'cart-2',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedSize: '100ml',
        unitPrice: 880
      },
      {
        id: 'cart-3',
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        selectedSize: '100ml',
        unitPrice: 790
      }
    ],
    subtotal: 1670,
    discount: 83.5, // 5% instapay
    shipping: 0,
    total: 1586.5,
    status: 'shipped',
    courier: 'Bosta',
    trackingNumber: 'BST-EGY-994120',
    createdAt: '2026-10-24 08:30',
    estimatedDelivery: 'غداً الأحد قبل الساعة 4 عصراً',
    notes: 'تم التحقق من تحويل إنستاباي بنجاح'
  },
  {
    id: 'ord-8489',
    orderNumber: 'TIBA-8489',
    customerName: 'م. كريم النجار',
    phone: '01004567890',
    governorate: 'القاهرة',
    city: 'القاهرة الجديدة (التجمع الخامس)',
    address: 'كمبوند الدبلوماسيين - فيلا 42 - شارع التسعين الجنوبي',
    antiRtoLandmark: 'بجوار بوابة 4 للجامعة الأمريكية وخلف كونكورد بلازا',
    paymentMethod: 'paymob',
    items: [
      {
        id: 'cart-4',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedSize: '100ml',
        unitPrice: 940
      },
      {
        id: 'cart-5',
        product: INITIAL_PRODUCTS[3],
        quantity: 1,
        selectedSize: '100ml',
        unitPrice: 920
      },
      {
        id: 'cart-6',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedSize: '100ml',
        unitPrice: 880,
        isFreeGift: true
      }
    ],
    subtotal: 2740,
    discount: 880, // Buy 2 Get 1 Free
    shipping: 0,
    total: 1860,
    status: 'pending_confirmation',
    courier: 'Aramex',
    trackingNumber: 'ARX-CAI-774102',
    createdAt: '2026-10-23 22:45',
    estimatedDelivery: 'خلال 48 ساعة',
    notes: 'عرض اشتر 2 واحصل على الثالث مجاناً مفعل'
  },
  {
    id: 'ord-8485',
    orderNumber: 'TIBA-8485',
    customerName: 'المستشار طارق الزيات',
    phone: '01123456789',
    governorate: 'الإسكندرية',
    city: 'سموحة',
    address: 'شارع فوزي معاذ - عمارة رويال بلازا - مدخل ب',
    antiRtoLandmark: 'أمام نادي سموحة الرياضي بجوار مطعم روستري',
    paymentMethod: 'cod',
    items: [
      {
        id: 'cart-7',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedSize: '100ml',
        unitPrice: 940
      }
    ],
    subtotal: 940,
    discount: 0,
    shipping: 60,
    total: 1000,
    status: 'delivered',
    courier: 'Mylerz',
    trackingNumber: 'MYL-ALX-551240',
    createdAt: '2026-10-22 14:10',
    estimatedDelivery: 'تم التسليم بنجاح',
    notes: 'تم التحصيل نقداً بنجاح وإيداع المبلغ في الحساب'
  }
];

const INITIAL_PROMOTIONS: PromotionSettings = {
  buy2Get1FreeActive: true,
  freeShippingThreshold: 1500,
  standardShippingFee: 60,
  asyutShippingFee: 35,
  announcementText: '✨ شحن مجاني وفوري داخل أسيوط ولكل محافظات مصر عند الطلب بقيمة 1,500 ج.م فما فوق | عرض اشتر 2 واحصل على الثالث مجاناً لفترة محدودة ✨',
  discoveryCashbackAmount: 190,
  discoveryBoxPrice: 190,
  instaPayDiscountPercent: 5
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [view, setView] = useState<ViewMode>('main');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('tiba-royal-oud');
  
  // Persistent or In-Memory State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [promotions, setPromotions] = useState<PromotionSettings>(INITIAL_PROMOTIONS);
  
  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  
  // Royal Box Flying Animation State
  const [flyingProduct, setFlyingProduct] = useState<FlyingProductAnimationState | null>(null);
  const [royalBoxBurstTimestamp, setRoyalBoxBurstTimestamp] = useState<number>(0);

  const triggerRoyalBoxBurst = () => {
    setRoyalBoxBurstTimestamp(Date.now());
  };
  
  // Waybill Modal
  const [selectedOrderForWaybill, setSelectedOrderForWaybill] = useState<Order | null>(null);
  const [isWaybillModalOpen, setIsWaybillModalOpen] = useState<boolean>(false);
  
  // Discovery Box Selection (3 slots)
  const [discoverySlots, setDiscoverySlots] = useState<(Product | null)[]>([
    INITIAL_PRODUCTS[0],
    INITIAL_PRODUCTS[1],
    INITIAL_PRODUCTS[2]
  ]);
  
  // Scent Quiz
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer>({ moodSliderValue: 70 });
  const [quizResultProduct, setQuizResultProduct] = useState<Product | null>(null);

  // Scent Notes Encyclopedia Database State
  const [selectedScentNote, setSelectedScentNote] = useState<ScentNote | null>(SCENT_NOTES_DATABASE[0]);
  const [isNoteExplainerOpen, setIsNoteExplainerOpen] = useState<boolean>(false);

  const openNoteExplainer = (noteNameOrId: string) => {
    const clean = noteNameOrId.toLowerCase().trim();
    const found = SCENT_NOTES_DATABASE.find(n => 
      n.id === clean || 
      clean.includes(n.id) ||
      clean.includes(n.nameAr.toLowerCase()) || 
      n.nameAr.toLowerCase().includes(clean) ||
      (clean.includes('عود') && n.category === 'oud') ||
      (clean.includes('عنبر') && n.category === 'amber') ||
      (clean.includes('مسك') && n.category === 'musk') ||
      (clean.includes('ورد') && n.id === 'rose-taif') ||
      (clean.includes('لبان') && n.id === 'frankincense-hojari') ||
      (clean.includes('جلد') && n.category === 'leather') ||
      (clean.includes('نيرولي') && n.id === 'neroli-nile') ||
      (clean.includes('باتشولي') && n.id === 'patchouli-sumatra') ||
      (clean.includes('زعفران') && n.id === 'saffron-kashmir') ||
      (clean.includes('صندل') && n.id === 'sandalwood-mysore') ||
      (clean.includes('سوسن') && n.id === 'iris-florence') ||
      (clean.includes('فانيليا') && n.id === 'vanilla-bourbon')
    ) || SCENT_NOTES_DATABASE[0];

    setSelectedScentNote(found);
    setIsNoteExplainerOpen(true);
  };
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Synchronize dynamic calculations: "Buy 2 Get 1 Free" and discovery box coupons
  // When buy2Get1FreeActive is enabled: for every 3 standard 100ml items in cart, the lowest priced is free.
  const eligibleBottles: CartItem[] = [];
  cart.forEach(item => {
    if (!item.isDiscoveryKit) {
      for (let i = 0; i < item.quantity; i++) {
        eligibleBottles.push(item);
      }
    }
  });

  // Sort bottles by unit price ascending to discount the cheapest ones in groups of 3
  eligibleBottles.sort((a, b) => a.unitPrice - b.unitPrice);
  const freeCount = promotions.buy2Get1FreeActive ? Math.floor(eligibleBottles.length / 3) : 0;
  let cartBuy2Get1Discount = 0;
  for (let i = 0; i < freeCount; i++) {
    cartBuy2Get1Discount += eligibleBottles[i].unitPrice;
  }

  // Calculate Subtotal
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  
  // Coupon discount: e.g. "TIBA190" grants 190 EGP off full bottle purchase
  let appliedCouponDiscount = 0;
  if (appliedCoupon === 'TIBA190') {
    appliedCouponDiscount = promotions.discoveryCashbackAmount;
  } else if (appliedCoupon === 'VIP10') {
    appliedCouponDiscount = Math.round((cartSubtotal - cartBuy2Get1Discount) * 0.1);
  }

  const cartDiscount = cartBuy2Get1Discount + appliedCouponDiscount;
  
  // Shipping calculation (free if >= freeShippingThreshold)
  const isFreeShipping = cartSubtotal >= promotions.freeShippingThreshold && cartSubtotal > 0;
  const cartShipping = cart.length === 0 ? 0 : (isFreeShipping ? 0 : promotions.standardShippingFee);
  
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Cart operations
  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedSize: string = '100ml',
    sourceEventOrRect?: any
  ) => {
    // 1. Calculate source coordinates for the royal flight animation
    let startRect: { x: number; y: number; width: number; height: number } | null = null;
    try {
      if (sourceEventOrRect) {
        if ('currentTarget' in sourceEventOrRect && sourceEventOrRect.currentTarget?.getBoundingClientRect) {
          const r = sourceEventOrRect.currentTarget.getBoundingClientRect();
          startRect = { x: r.left, y: r.top, width: r.width, height: r.height };
        } else if ('clientX' in sourceEventOrRect && typeof sourceEventOrRect.clientX === 'number') {
          startRect = { x: sourceEventOrRect.clientX - 35, y: sourceEventOrRect.clientY - 35, width: 70, height: 70 };
        } else if (typeof sourceEventOrRect.getBoundingClientRect === 'function') {
          const r = sourceEventOrRect.getBoundingClientRect();
          startRect = { x: r.left, y: r.top, width: r.width, height: r.height };
        } else if (typeof sourceEventOrRect.x === 'number' && typeof sourceEventOrRect.y === 'number') {
          startRect = {
            x: sourceEventOrRect.x,
            y: sourceEventOrRect.y,
            width: sourceEventOrRect.width || 60,
            height: sourceEventOrRect.height || 60
          };
        }
      }

      // Auto-fallback: search for active product card or button in DOM
      if (!startRect && typeof document !== 'undefined') {
        const candidate = document.querySelector(`[data-product-card="${product.id}"]`) ||
                          document.querySelector(`[data-product-id="${product.id}"]`);
        if (candidate) {
          const r = candidate.getBoundingClientRect();
          startRect = { x: r.left + r.width / 4, y: r.top + r.height / 4, width: r.width / 2, height: r.height / 2 };
        }
      }

      // Final viewport fallback
      if (!startRect && typeof window !== 'undefined') {
        startRect = {
          x: Math.max(20, window.innerWidth / 2 - 40),
          y: Math.max(20, window.innerHeight / 2 - 40),
          width: 80,
          height: 80
        };
      }
    } catch {
      // safe fallback
      startRect = { x: 100, y: 100, width: 60, height: 60 };
    }

    // 2. Launch flying animation into the royal box
    if (startRect) {
      setFlyingProduct({
        product,
        startRect,
        timestamp: Date.now()
      });
    }

    // 3. Immediately update cart items
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === selectedSize && !item.isDiscoveryKit);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, {
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product,
          quantity,
          selectedSize,
          unitPrice: product.price
        }];
      }
    });

    // 4. Open the cart drawer to reveal the Royal Box destination
    setIsCartOpen(true);
    showToast(`العطر استقر جوه العلبة الملكية بنجاح وبأعلى فخامة! ✨`);
  };

  const addDiscoveryBoxToCart = (selectedProducts: Product[]) => {
    if (selectedProducts.length !== 3) {
      showToast('يرجى اختيار 3 عينات لتعبئة صندوق الاستكشاف الملكي');
      return;
    }
    const boxProduct: Product = {
      id: `discovery-kit-${Date.now()}`,
      nameAr: 'صندوق الاستكشاف الملكي (3 عينات × 10مل)',
      nameEn: 'Royal Discovery Coffret (3x10ml)',
      subtitle: `العينات: ${selectedProducts.map(p => p.nameAr).join(' + ')}`,
      price: promotions.discoveryBoxPrice,
      originalPrice: 350,
      size: '3x10ml',
      stock: 99,
      category: 'oriental',
      categoryLabel: 'مجموعة استكشافية',
      topNotes: ['مزيج مخصص مختار بدقة'],
      heartNotes: ['عينات فاخرة بتركيز مستخلص عطر'],
      baseNotes: ['كوبون استرداد 190 ج.م مرفق مجاناً'],
      longevityHours: 14,
      sillageRating: 9.0,
      sillageRadiusMeters: 3.0,
      concentration: 'Extrait de Parfum Samples',
      season: 'all',
      gender: 'unisex',
      image: '/assets/perfumes/discovery_coffret.jpg',
      description: 'ثلاثية ملكية مختارة تمكنك من تجربة أروع إبداعات دار طيبة في منزلك مع كود استرداد فوري بقيمة 190 ج.م يخصم بالكامل عند طلب أي زجاجة 100مل.',
      rating: 5.0,
      reviewsCount: 88
    };

    setCart(prev => [
      ...prev,
      {
        id: `discovery-${Date.now()}`,
        product: boxProduct,
        quantity: 1,
        selectedSize: '3x10ml',
        unitPrice: promotions.discoveryBoxPrice,
        isDiscoveryKit: true,
        discoverySelection: selectedProducts
      }
    ]);
    
    // Launch flight animation into royal box
    setFlyingProduct({
      product: boxProduct,
      startRect: {
        x: Math.max(20, (typeof window !== 'undefined' ? window.innerWidth / 2 : 200) - 40),
        y: Math.max(20, (typeof window !== 'undefined' ? window.innerHeight / 2 : 300) - 40),
        width: 80,
        height: 80
      },
      timestamp: Date.now()
    });

    showToast('صندوق الاستكشاف استقر جوه العلبة الملكية بنجاح! ✨');
    setIsCartOpen(true);
  };

  const updateCartItemQty = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('تم إزالة العطر من حقيبة الشراء');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'TIBA190') {
      setAppliedCoupon('TIBA190');
      showToast('تم تطبيق كود استرداد صندوق الاستكشاف بنجاح (-190 ج.م)');
      return { success: true, message: 'تم تطبيق كود الاسترداد بنجاح (-190 ج.م)' };
    } else if (formatted === 'VIP10') {
      setAppliedCoupon('VIP10');
      showToast('تم تطبيق خصم عملاء كبار الشخصيات VIP (-10%)');
      return { success: true, message: 'تم تطبيق كود كبار الشخصيات VIP (-10%)' };
    }
    showToast('كود الخصم غير صالح أو منتهي الصلاحية');
    return { success: false, message: 'الكود غير صالح' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('تم إلغاء كود الخصم');
  };

  // Product updates (reactive price steppers & stock)
  const updateProductPrice = (id: string, newPrice: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: Math.max(100, newPrice) } : p));
    showToast(`تم تعديل السعر المباشر للعطر بنجاح`);
  };

  const adjustProductPriceDelta = (id: string, delta: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextPrice = Math.max(100, p.price + delta);
        return { ...p, price: nextPrice };
      }
      return p;
    }));
    showToast(`تم تعديل السعر بقيمة ${delta > 0 ? `+${delta}` : delta} ج.م`);
  };

  const toggleProductStock = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newStock = p.stock > 0 ? 0 : 50;
        return { ...p, stock: newStock };
      }
      return p;
    }));
    showToast(`تم تحديث حالة المخزون للمنتج`);
  };

  const updateProductNotes = (id: string, recipe: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, customNoteRecipe: recipe } : p));
    showToast(`تم حفظ التركيبة العطرية في السجل الملكي`);
  };

  // Orders updates
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`تم تحديث حالة الطلب إلى "${status}"`);
  };

  const assignCourier = (orderId: string, courier: Order['courier'], trackingNum?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const codePrefix = courier === 'Asyut Local Express' ? 'ASY-EXP' : courier === 'Bosta' ? 'BST-EGY' : courier === 'Aramex' ? 'ARX-CAI' : 'MYL-EXP';
        const finalTracking = trackingNum || `${codePrefix}-${Math.floor(100000 + Math.random() * 900000)}`;
        return { ...o, courier, trackingNumber: finalTracking, status: 'shipped' };
      }
      return o;
    }));
    showToast(`تم إسناد الشحنة إلى شركة ${courier} وتوليد بوليصة الشحن بنجاح`);
  };

  const submitNewOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingNumber'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `TIBA-${randomSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      trackingNumber: `TIBA-EXP-${randomSuffix}`,
      estimatedDelivery: orderData.governorate === 'أسيوط' ? 'اليوم خلال 4 ساعات (تسليم أسيوط الفوري)' : 'خلال 24-48 ساعة'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Discovery slots management
  const setDiscoverySlot = (slotIndex: number, product: Product) => {
    setDiscoverySlots(prev => {
      const next = [...prev];
      next[slotIndex] = product;
      return next;
    });
    showToast(`تم وضع "${product.nameAr}" في الخانة رقم ${slotIndex + 1}`);
  };

  const clearDiscoverySlot = (slotIndex: number) => {
    setDiscoverySlots(prev => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  };

  const autoFillDiscoveryBox = () => {
    // Fill with the 3 top rated perfumes
    const picks = [...products].sort((a, b) => b.rating - a.rating).slice(0, 3);
    setDiscoverySlots(picks);
    showToast('تمت التعبئة التلقائية بأعلى 3 عطور تقييماً في الدار');
  };

  // Promotions management
  const updatePromotions = (partial: Partial<PromotionSettings>) => {
    setPromotions(prev => ({ ...prev, ...partial }));
    showToast('تم حفظ إعدادات العروض والشحن اللحظي');
  };

  // Quiz
  const setQuizAnswer = (key: keyof QuizAnswer, value: any) => {
    setQuizAnswers(prev => ({ ...prev, [key]: value }));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizResultProduct(null);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        view,
        setView,
        selectedProductId,
        setSelectedProductId,
        products,
        updateProductPrice,
        adjustProductPriceDelta,
        toggleProductStock,
        updateProductNotes,
        cart,
        isCartOpen,
        setIsCartOpen,
        flyingProduct,
        setFlyingProduct,
        royalBoxBurstTimestamp,
        triggerRoyalBoxBurst,
        addToCart,
        addDiscoveryBoxToCart,
        updateCartItemQty,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartBuy2Get1Discount,
        cartShipping,
        cartTotal,
        orders,
        updateOrderStatus,
        assignCourier,
        submitNewOrder,
        selectedOrderForWaybill,
        setSelectedOrderForWaybill,
        isWaybillModalOpen,
        setIsWaybillModalOpen,
        promotions,
        updatePromotions,
        discoverySlots,
        setDiscoverySlot,
        clearDiscoverySlot,
        autoFillDiscoveryBox,
        quizAnswers,
        setQuizAnswer,
        resetQuiz,
        quizResultProduct,
        setQuizResultProduct,
        selectedScentNote,
        setSelectedScentNote,
        isNoteExplainerOpen,
        setIsNoteExplainerOpen,
        openNoteExplainer,
        toastMessage,
        showToast
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#141312]/95 border border-[#f2ca50]/50 text-[#fff7d6] px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md text-sm font-medium flex items-center gap-3 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#f2ca50] shadow-[0_0_8px_#f2ca50]"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
