interface Stock {
  price_buying: string;
  price: string;
  stock: string;
}

interface Translation {
  pl_PL: PLTranslation;
}

interface PLTranslation {
  product_id: string;
  name: string;
  short_description: string;
  description: string;
  active: string;
  seo_url: string;
  permalink: string;
}

export interface Product {
  product_id: string;
  stock: Stock;
  translations: Translation;
}
