/* the following are the testimonial images on this page */
import Halima from "../src/assets/Halima.webp";
import Lauracia from "../src/assets/Lauracia.webp";
import Juzman from "../src/assets/Juzman.webp";
import Yuvala from "../src/assets/Yuvala.webp";

/* An array of the testimoial cards Objects to be looped */
export const testimonialCards = [
  {
    rateName: "Halima Sahim - KE",
    rateImg: Halima,
    rateMessage:
      "Very reliable supplier with great natural products and easy, smooth service.",
    cardRating: "5",
  },

  {
    rateName: "Samuel Josh - Tanzania",
    rateImg: Juzman,
    rateMessage:
      "Their products are always fresh and delivered on time, cwe trust them completely.",
    cardRating: "4",
  },

  {
    rateName: "Lucy Tasha _ UAE",
    rateImg: Lauracia,
    rateMessage:
      "They give us exactly what we order—good quality, good packaging, no stress.",
    cardRating: "4",
  },

  {
    rateName: "David O. Rider - KE",
    rateImg: Yuvala,
    rateMessage:
      "I loved how professional and reliable TopBrands is. They listen first, then give solutions that actually work.",
    cardRating: "5",
  },
];

//ADDITIONAL PRODUCT DETAILS
export const productData = {
  /* --------------------------------------------------------------------
            ALL AVAILABLE CLOVES
-------------------------------------------------------------------- */
  "Zanzibar Cloves": {
    title: "Zanzibar Cloves",
    price: 50.0,
    caption: "Strong aroma from fertile islands",
    description:
      "Zanzibar cloves are known for their rich oil content and powerful fragrance. Handpicked at peak maturity for the best flavor. A perfect choice for spice manufacturers, tea blenders, and export buyers seeking premium quality.",
    image: "cloves1.webp",
    benefits: [
      "High essential oil content",
      "Strong aroma ideal for blending",
      "Preferred by global spice buyers",
    ],
  },

  "Madagascar Cloves": {
    title: "Madagascar Cloves",
    price: 48.0,
    caption: "Warm, sweet aroma with bold flavor",
    description:
      "Madagascar cloves offer a sweet, slightly smoky fragrance and consistent size. Sourced from well-maintained plantations known for reliable export quality.",
    image: "cloves2.webp",
    benefits: [
      "Sweet, rich fragrance profile",
      "Consistent size and color",
      "Suitable for food and beverage industries",
    ],
  },

  "Comoros Cloves": {
    title: "Comoros Cloves",
    price: 45.0,
    caption: "Naturally dried with earthy tones",
    description:
      "Comoros cloves are valued for their earthy aroma and balanced oil content. Often chosen by buyers seeking a budget-friendly but high-quality alternative.",
    image: "cloves3.webp",
    benefits: [
      "Earthy, well-balanced aroma",
      "Budget-friendly alternative",
      "Ideal for bulk spice processing",
    ],
  },

  "Tanzania Cloves": {
    title: "Tanzania Cloves",
    price: 52.0,
    caption: "Premium grade with high oil levels",
    description:
      "Tanzania produces some of Africa’s top-grade cloves with excellent oil concentration and strong global demand. Known for uniform shape and deep brown color.",
    image: "cloves4.webp",
    benefits: [
      "High global demand",
      "Uniform size and color",
      "High essential oil concentration",
    ],
  },

  "Sri Lanka Cloves": {
    title: "Sri Lanka Cloves",
    price: 55.0,
    caption: "Delicate aroma, premium appearance",
    description:
      "Sri Lankan cloves have a mild, pleasant aroma and are known for their bright coloration. Commonly used in teas, desserts, and pharmaceutical blends.",
    image: "cloves5.webp",
    benefits: [
      "Bright color ideal for display",
      "Milder refined aroma",
      "Preferred in beverage and tea blends",
    ],
  },

  "India Cloves": {
    title: "India Cloves",
    price: 47.0,
    caption: "Warm flavor used in traditional cooking",
    description:
      "India offers versatile cloves with warm, spicy notes widely used in culinary and medicinal applications. A popular choice across Asian markets.",
    image: "cloves6.webp",
    benefits: [
      "Warm spicy flavor",
      "Versatile culinary uses",
      "Strong demand in Asian markets",
    ],
  },

  "Indonesia Cloves": {
    title: "Indonesia Cloves",
    price: 46.0,
    caption: "Distinct aroma used in kretek production",
    description:
      "Indonesia is the world’s largest clove producer. These cloves are especially valued for their role in making kretek cigarettes and aromatic spice blends.",
    image: "cloves7.webp",
    benefits: [
      "Key ingredient for kretek",
      "Intense aromatic profile",
      "Reliable large-scale supply",
    ],
  },

  "Brazil Cloves": {
    title: "Brazil Cloves",
    price: 44.0,
    caption: "Rich color and mild sweetness",
    description:
      "Brazilian cloves feature a slightly sweet taste and are known for their lighter aroma. Suitable for confectionery and flavoring applications.",
    image: "cloves8.webp",
    benefits: [
      "Mild sweetness for desserts",
      "Attractive deep color",
      "Stable supply volume",
    ],
  },

  /* --------------------------------------------------------------------
            ALL AVAILABLE CASHEWS
-------------------------------------------------------------------- */
  "W240 Cashew Nuts": {
    title: "W240 Cashew Nuts",
    price: 85.0,
    caption: "Premium large kernels with rich buttery taste",
    description:
      "W240 cashews are among the highest-demand grades worldwide due to their large size, uniform shape, and smooth texture. Perfect for premium snacks, confectionery use, and export markets requiring consistent quality.",
    image: "/cashew1.jpg",
    benefits: [
      "Large whole kernels for premium presentation",
      "High demand in global snack markets",
      "Perfect for roasting and gourmet packaging",
    ],
  },

  "W320 Cashew Nuts": {
    title: "W320 Cashew Nuts",
    price: 78.0,
    caption: "Most popular grade with balanced size and value",
    description:
      "W320 cashews are the industry’s top-selling grade, offering an excellent balance between size and affordability. Ideal for bulk buyers, food processors, and brands seeking high-quality kernels at competitive prices.",
    image: "/cashew2.jpg",
    benefits: [
      "Most widely used grade worldwide",
      "Great balance between price and size",
      "Works well for snacks, baking, and mixing",
    ],
  },

  "W450 Cashew Nuts": {
    title: "W450 Cashew Nuts",
    price: 70.0,
    caption: "Smaller but flavorful kernels for bulk processing",
    description:
      "W450 cashews offer a slightly smaller kernel but maintain excellent flavor and texture. A preferred option for companies needing high volumes at cost-efficient rates.",
    image: "/cashew3.webp",
    benefits: [
      "Budget-friendly whole kernels",
      "Perfect for large-scale food processing",
      "Consistent taste for flavored snacks",
    ],
  },

  "WS Cashew Nuts": {
    title: "WS Cashew Nuts",
    price: 62.0,
    caption: "Clean, bright split kernels for confectionery",
    description:
      "White Splits (WS) cashews are broken whole kernels that retain rich flavor and creamy texture. Popular with bakers, ice cream manufacturers, and producers of cashew-based spreads.",
    image: "/cashew4.jpg",
    benefits: [
      "Ideal for baking and dessert applications",
      "Creamy flavor blends well in recipes",
      "Cost-effective alternative to whole kernels",
    ],
  },

  "LP Cashew Nuts": {
    title: "LP Cashew Nuts",
    price: 55.0,
    caption: "Large broken pieces perfect for blending and toppings",
    description:
      "Large Pieces (LP) cashews are widely used in breakfast cereals, nut mixes, energy bars, and ready-to-eat meals. They offer excellent texture and strong cashew aroma.",
    image: "link to free online image",
    benefits: [
      "Ideal for toppings and granola mixes",
      "Consistent size for industrial processing",
      "Rich aroma and natural taste",
    ],
  },

  "BB Cashew Nuts": {
    title: "BB Cashew Nuts",
    price: 48.0,
    caption: "Small nutritious fragments for spreads and sauces",
    description:
      "Baby Bits are tiny cashew fragments perfect for cashew butter, sauces, vegan cheese production, and powdered food applications. A great option for health food manufacturers.",
    image: "link to free online image",
    benefits: [
      "Perfect for cashew butter and sauces",
      "High oil content for smooth blending",
      "Cost-efficient for industrial use",
    ],
  },

  "Scorched W240": {
    title: "Scorched W240",
    price: 72.0,
    caption: "Lightly browned but still premium in taste",
    description:
      "Scorched W240 cashews undergo natural heat exposure during drying, giving them a slightly darker appearance but identical taste. Perfect for roasting companies and flavored nut brands.",
    image: "link to free online image",
    benefits: [
      "Same quality taste at a lower price",
      "Ideal for roasted and seasoned snacks",
      "Preferred by bulk exporters",
    ],
  },

  "Scorched W320": {
    title: "Scorched W320",
    price: 65.0,
    caption: "Affordable whole kernels with strong market demand",
    description:
      "Scorched W320 cashews are a cost-effective whole-kernel alternative for buyers who prioritize flavor over appearance. A popular choice in Middle East and Asian snack markets.",
    image: "link to free online image",
    benefits: [
      "Budget-friendly whole kernels",
      "Great for seasoned nut production",
      "Excellent option for high-volume buyers",
    ],
  },

  /* --------------------------------------------------------------------
            ALL AVAILABLE TYPES OF HONEY
-------------------------------------------------------------------- */
  "Wild Forest Honey": {
    title: "Wild Forest Honey",
    price: 42.0,
    caption: "Deep natural sweetness from wild hives",
    description:
      "Collected from untouched forest regions where bees feed on diverse wildflowers. Known for its rich aroma, dark color, and strong nutritional profile. A top choice for health-conscious buyers and premium organic markets.",
    image: "link to free online image",
    benefits: [
      "Rich antioxidant levels",
      "Strong natural flavor",
      "Perfect for organic markets",
    ],
  },

  "Acacia Honey": {
    title: "Acacia Honey",
    price: 48.0,
    caption: "Light, smooth, and naturally clear",
    description:
      "Acacia honey is prized for its mild taste and crystal-clear appearance. It stays liquid longer than most honeys, making it ideal for teas and gourmet use. Popular in Europe, Asia, and luxury retail shelves.",
    image: "link to free online image",
    benefits: [
      "Long shelf clarity",
      "Gentle mild sweetness",
      "Premium international demand",
    ],
  },

  "White Comb Honey": {
    title: "White Comb Honey",
    price: 55.0,
    caption: "Pure honey preserved in natural comb",
    description:
      "Harvested in its most natural form, still sealed within the beeswax comb. Offers unmatched freshness, flavor, and purity with zero processing. Ideal for gourmet stores, gift packaging, and health-focused buyers.",
    image: "link to free online image",
    benefits: [
      "100% raw purity",
      "High gourmet appeal",
      "Zero processing involved",
    ],
  },

  "Eucalyptus Honey": {
    title: "Eucalyptus Honey",
    price: 46.0,
    caption: "Rich herbal notes with smooth sweetness",
    description:
      "Known for its warm, earthy aroma and slightly herbal undertones. A favorite in natural product shops and beverage producers. Consistent flavor makes it perfect for blends and syrups.",
    image: "link to free online image",
    benefits: [
      "Warm herbal flavor",
      "Great for beverages",
      "Stable export quality",
    ],
  },

  "Sunflower Honey": {
    title: "Sunflower Honey",
    price: 40.0,
    caption: "Bright, vibrant taste from sunflower fields",
    description:
      "A golden-yellow honey with a lively, light sweetness. Popular among households and food brands due to its clean, floral taste. Works well for spreads, cereals, and large-scale processing.",
    image: "link to free online image",
    benefits: [
      "Light floral flavor",
      "Perfect for breakfast foods",
      "Attractive natural color",
    ],
  },

  "Mountain Flora Honey": {
    title: "Mountain Flora Honey",
    price: 52.0,
    caption: "Unique taste from high-altitude blossoms",
    description:
      "Collected from bees thriving in cool mountain climates. Offers rare floral notes and rich nutritional density. Highly valued in premium wellness markets and boutique stores.",
    image: "link to free online image",
    benefits: [
      "Rare floral notes",
      "High nutrition profile",
      "Ideal for premium buyers",
    ],
  },

  "Orange Blossom Honey": {
    title: "Orange Blossom Honey",
    price: 47.0,
    caption: "Sweet citrus aroma with smooth flavor",
    description:
      "Produced from nectar of orange tree blossoms, giving it a gentle fruity scent. Loved by bakeries, dessert makers, and gourmet consumers. Its mild flavor complements pastries and delicate recipes perfectly.",
    image: "link to free online image",
    benefits: [
      "Light citrus aroma",
      "Perfect for desserts",
      "Gourmet-market favorite",
    ],
  },

  "Multiflora Honey": {
    title: "Multiflora Honey",
    price: 38.0,
    caption: "Balanced sweetness from mixed flowers",
    description:
      "A harmonious blend of nectar from multiple flower species. Extremely versatile for household use, beverages, and food brands. Offers consistent taste and strong market demand globally.",
    image: "link to free online image",
    benefits: [
      "Versatile everyday use",
      "Consistent quality flavor",
      "High global demand",
    ],
  },

  /* --------------------------------------------------------------------
            ALL AVAILABLE TYPES OF GINGER
-------------------------------------------------------------------- */

  "Fresh Whole Ginger": {
    title: "Fresh Whole Ginger",
    price: 32.0,
    caption: "Bold aroma with natural warmth",
    description:
      "Handpicked fresh ginger known for its strong aroma and vibrant flavor. Ideal for cooking, beverages, and food processing. Highly demanded by wholesalers and international spice buyers.",
    image: "link to free online image",
    benefits: ["Strong aroma", "Highly versatile", "Export-ready freshness"],
  },

  "Dry Split Ginger": {
    title: "Dry Split Ginger",
    price: 28.0,
    caption: "Sun-dried halves for rich strength",
    description:
      "Carefully split and sun-dried to preserve flavor and shelf life. Perfect for spice factories, tea producers, and large exporters. Offers strong taste at a cost-effective price.",
    image: "link to free online image",
    benefits: [
      "Long shelf life",
      "Cost-effective quality",
      "High flavor strength",
    ],
  },

  "Ginger Powder": {
    title: "Ginger Powder",
    price: 36.0,
    caption: "Fine, ready-to-use spice powder",
    description:
      "Finely milled ginger powder ideal for baking, seasoning blends, and instant beverages. Saves preparation time while maintaining strong natural flavor. Popular with manufacturers and packaged-food brands.",
    image: "link to free online image",
    benefits: ["Easy to use", "Strong warm flavor", "Perfect for blends"],
  },

  "Organic Ginger": {
    title: "Organic Ginger",
    price: 40.0,
    caption: "Purely grown without chemicals",
    description:
      "Ginger cultivated on certified organic farms with zero pesticides and synthetic inputs. Offers clean taste and complete safety for health-focused markets. Highly demanded by premium exporters and natural product stores.",
    image: "link to free online image",
    benefits: [
      "Chemical-free",
      "Clean natural taste",
      "Perfect for organic buyers",
    ],
  },

  "Baby Ginger": {
    title: "Baby Ginger",
    price: 34.0,
    caption: "Mild, tender and fresh flavor",
    description:
      "Young ginger with smooth skin and a mild, delicate taste. Easy to cut and perfect for gourmet recipes and fresh beverages. A favorite for premium kitchens and specialty food brands.",
    image: "link to free online image",
    benefits: ["Soft texture", "Mild gentle taste", "Great for fresh use"],
  },

  "Ginger Flakes": {
    title: "Ginger Flakes",
    price: 30.0,
    caption: "Crisp dried slices for blends",
    description:
      "Thinly sliced ginger flakes dried to preserve aroma and color. Ideal for tea blends, spice mixes, and bulk food production. Keeps flavor strong while offering easy handling.",
    image: "link to free online image",
    benefits: ["Strong aroma", "Easy blending", "Consistent quality"],
  },

  "Ginger Oil": {
    title: "Ginger Oil",
    price: 55.0,
    caption: "Concentrated essence for industry",
    description:
      "Steam-distilled ginger oil rich in natural compounds and warm aroma. Widely used in beverages, flavoring, and fragrance industries. A powerful ingredient with high international demand.",
    image: "link to free online image",
    benefits: [
      "Highly concentrated",
      "Industrial-grade quality",
      "Strong warm essence",
    ],
  },

  "Crushed Ginger": {
    title: "Crushed Ginger",
    price: 33.0,
    caption: "Ready-use ginger for cooking",
    description:
      "Coarsely crushed ginger ideal for instant cooking, sauces, and marinades. Reduces preparation time while delivering fresh natural flavor. Great for restaurants, processors, and busy kitchens.",
    image: "link to free online image",
    benefits: ["Time-saving", "Fresh strong taste", "Great for cooking"],
  },

  /* --------------------------------------------------------------------
            ALL AVAILABLE TYPES OF MACADAMIA
-------------------------------------------------------------------- */
  "Raw Macadamia Nuts": {
    title: "Raw Macadamia Nuts",
    price: 62.0,
    caption: "Natural richness with smooth flavor",
    description:
      "Raw macadamias with naturally rich taste and creamy texture. Perfect for snacking, baking, and premium nut processing. A top choice for exporters and gourmet brands worldwide.",
    image: "link to free online image",
    benefits: [
      "Creamy natural flavor",
      "Great for snacking",
      "High global demand",
    ],
  },

  "Macadamia Kernel Halves": {
    title: "Macadamia Kernel Halves",
    price: 58.0,
    caption: "Perfect halves for food production",
    description:
      "Clean, evenly sized macadamia halves ideal for confectionery and nut mixes. Offers great value while maintaining excellent taste and freshness. Loved by manufacturers needing consistent, high-quality ingredients.",
    image: "link to free online image",
    benefits: ["Uniform sizing", "Value for processing", "Reliable quality"],
  },

  "Macadamia Kernel Pieces": {
    title: "Macadamia Kernel Pieces",
    price: 48.0,
    caption: "Cost-friendly option for producers",
    description:
      "High-quality broken macadamia pieces ideal for baking, cereals, and spreads. Delivers great flavor at a friendly price point for bulk buyers. A smart choice for high-volume food brands.",
    image: "link to free online image",
    benefits: ["Budget-friendly", "Great for baking", "Strong flavor"],
  },

  "Roasted Macadamia Nuts": {
    title: "Roasted Macadamia Nuts",
    price: 66.0,
    caption: "Crisp roast with deep aroma",
    description:
      "Perfectly roasted to bring out a rich, nutty aroma and satisfying crunch. Ideal for snack brands, gift packs, and premium retail shelves. Offers irresistible taste and consistent quality.",
    image: "link to free online image",
    benefits: ["Strong nutty aroma", "Perfect crunch", "Great retail appeal"],
  },

  "Salted Macadamia Nuts": {
    title: "Salted Macadamia Nuts",
    price: 68.0,
    caption: "Lightly salted for bold flavor",
    description:
      "Macadamias seasoned with a gentle touch of salt for a balanced, satisfying taste. A crowd-favorite snack for supermarkets and gourmet stores. Perfect for clients seeking ready-to-sell products.",
    image: "link to free online image",
    benefits: ["Ready-to-eat", "Balanced seasoning", "Strong customer demand"],
  },

  "Macadamia Oil": {
    title: "Macadamia Oil",
    price: 72.0,
    caption: "Premium cold-pressed natural oil",
    description:
      "Cold-pressed macadamia oil with a smooth, buttery flavor profile. Popular for cooking, skincare, and specialty food products. High in healthy fats and widely demanded globally.",
    image: "link to free online image",
    benefits: ["Cold-pressed purity", "Versatile usage", "Rich healthy fats"],
  },

  "Macadamia Flour": {
    title: "Macadamia Flour",
    price: 52.0,
    caption: "Fine, gluten-free nut flour",
    description:
      "Finely milled macadamia flour perfect for gluten-free baking and healthy recipes. Loved by specialty food brands and wellness markets. Provides rich flavor and smooth texture to baked goods.",
    image: "link to free online image",
    benefits: ["Gluten-free", "Smooth fine texture", "Great for baking"],
  },

  "Macadamia Nut Butter": {
    title: "Macadamia Nut Butter",
    price: 64.0,
    caption: "Creamy spread with pure taste",
    description:
      "A smooth, delicious spread made from finely ground macadamias. Perfect for health stores, bakeries, and premium retail brands. Offers natural richness and irresistible creamy texture.",
    image: "link to free online image",
    benefits: [
      "Creamy texture",
      "Natural ingredients",
      "Premium market appeal",
    ],
  },

  /* --------------------------------------------------------------------
            OUR FUTURE PRODUCTS WILL FOLLOW HERE
-------------------------------------------------------------------- */
};
