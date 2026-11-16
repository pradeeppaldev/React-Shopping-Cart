export interface IReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface IProductVariantColor {
  name: string;
  hex: string;
  image?: string;
}

export type MoodType =
  | 'Casual'
  | 'Party Mode'
  | 'Streetwear'
  | 'Minimal'
  | 'Aesthetic'
  | 'Sporty'
  | 'Bold'
  | 'Chill';

export type OccasionType =
  | 'Birthday Parties'
  | 'Weddings'
  | 'College Fests'
  | 'Farewell'
  | 'Date Nights'
  | 'Vacations'
  | 'Festivals'
  | 'Casual Outings';

export type DealType =
  | "Today's Deals"
  | 'Exclusive Offers'
  | 'Combo Offers'
  | 'Limited-Time Deals'
  | 'First-Time Buyer Discounts';

export interface IProduct {
  id: number;
  sku: number;
  title: string;
  description: string;
  longDescription?: string;
  availableSizes: string[];
  style: string;
  price: number;
  originalPrice?: number;
  installments: number;
  currencyId: string;
  currencyFormat: string;
  isFreeShipping: boolean;

  // Categories & metadata
  category?: 'Men\'s Fashion' | 'Women\'s Fashion' | 'Accessories' | 'Footwear' | 'Streetwear' | string;
  colors?: IProductVariantColor[];
  rating?: number;
  reviewsCount?: number;
  reviews?: IReview[];
  images?: string[];
  tags?: string[];
  stockCount?: number;

  // Smart Discovery & Personalization
  moods?: MoodType[];
  occasions?: OccasionType[];
  dealTypes?: DealType[];
  isPriceDrop?: boolean;
  purchaseCountThisWeek?: number;
  isTrendingAmongCustomers?: boolean;
  isCommunityFavorite?: boolean;

  // Badges & flags
  isTrending?: boolean;
  isViral?: boolean;
  isStylishLook?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isMostLoved?: boolean;
  isMostPurchased?: boolean;
}

export interface ICartProduct extends IProduct {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface ICartTotal {
  productQuantity: number;
  installments: number;
  totalPrice: number;
  currencyId: string;
  currencyFormat: string;
  discountPrice?: number;
  appliedPromo?: string;
}

export interface IGetProductsResponse {
  data: {
    products: IProduct[];
  };
}

export interface IShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface IUserProfile {
  name: string;
  username: string;
  email: string;
  phone: string;
  birthday: string;
  bio: string;
  avatar: string;
  preferredSizes: string[];
  preferredMood: string;
  preferredBudget: string;
  shippingAddress: IShippingAddress;
}

export type OrderStatus = 'Delivered' | 'Out for Delivery' | 'Processing' | 'Confirmed';

export interface IOrder {
  id: string;
  date: string;
  items: ICartProduct[];
  totalPrice: number;
  currencyFormat: string;
  currencyId: string;
  status: OrderStatus;
  paymentMethod: string;
  trackingNumber: string;
  coinsEarned: number;
  discountPrice?: number;
  appliedPromo?: string;
}

export type NotificationType =
  | 'offer'
  | 'birthday'
  | 'price_drop'
  | 'referral'
  | 'streak'
  | 'announcement';

export interface INotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  badge?: string;
  icon: string;
  linkTab?: string;
}

export interface IToast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'reward';
  icon?: string;
}
