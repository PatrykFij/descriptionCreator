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
  isPaid: boolean;
  total_products: string;
  promo_price: string | null;
}

// {
//   "product_id": "32",
//   "producer_id": "13",
//   "group_id": null,
//   "tax_id": "1",
//   "add_date": "2021-05-29 11:51:33",
//   "edit_date": "2021-10-24 11:32:48",
//   "other_price": "104.00",
//   "pkwiu": "",
//   "unit_id": "1",
//   "in_loyalty": "0",
//   "loyalty_score": null,
//   "loyalty_price": null,
//   "bestseller": "0",
//   "newproduct": "0",
//   "dimension_w": "0.0000",
//   "dimension_h": "0.0000",
//   "dimension_l": "0.0000",
//   "vol_weight": "0.0000",
//   "currency_id": null,
//   "gauge_id": null,
//   "unit_price_calculation": "0",
//   "type": "0",
//   "category_id": "50",
//   "categories": [
//       50,
//       39,
//       56,
//       32
//   ],
//   "collections": [
//       9
//   ],
//   "promo_price": null,
//   "code": "EB24-854F7",
//   "ean": "8020936056423",
//   "stock": {
//       "stock_id": "40",
//       "extended": "0",
//       "price": "116.00",
//       "price_type": "1",
//       "price_buying": "10.00",
//       "stock": "0",
//       "package": "2",
//       "warn_level": "1",
//       "sold": "37",
//       "weight": "0.5",
//       "weight_type": "1",
//       "active": "1",
//       "default": "1",
//       "product_id": "32",
//       "availability_id": null,
//       "delivery_id": "1",
//       "gfx_id": null,
//       "code": "EB24-854F7",
//       "ean": "8020936056423",
//       "comp_weight": "0.5",
//       "comp_price": "116.00",
//       "comp_promo_price": "116.00",
//       "price_wholesale": "116.00",
//       "comp_price_wholesale": "116.00",
//       "comp_promo_price_wholesale": "116.00",
//       "price_special": "116.00",
//       "comp_price_special": "116.00",
//       "comp_promo_price_special": "116.00",
//       "price_type_wholesale": "0",
//       "price_type_special": "0",
//       "calculation_unit_id": null,
//       "calculation_unit_ratio": "0"
//   },
//   "translations": {
//       "pl_PL": {
//           "translation_id": "32",
//           "product_id": "32",
//           "name": "KEMON Actyva Szampon Nuova Fibra 250ml x 2szt",
//           "short_description": "<p>KEMON Actyva Szampon Nuova Fibra 250ml x 2szt</p>",
//           "description": "<div class=\"description-container\">\r\n<div class=\"top-bar\">??</div>\r\n<div id=\"producer-logo-section\" class=\"producer-logo\"><a href=\"https://www.brillar-sklep.pl/kemon\" data-id=\"a_1\"><img src=\"/userdata/public/assets/producer-kemon.png\" alt=\"Logo producenta\" width=\"auto\" /></a></div>\r\n<div id=\"headers-section\" class=\"section\">\r\n<h2 data-id=\"h2_1\">Actyva Szampon Nuova Fibra</h2>\r\n<h3 data-id=\"h3_1\">Odbudowanie w??os??w, do w??os??w os??abionych, uszkodzonych, zniszczonych</h3>\r\n<h4 data-id=\"h4_1\">Szampon do w??os??w 250ml x 2szt</h4>\r\n</div>\r\n<div id=\"description-section\" class=\"section\">\r\n<p data-id=\"p_1\">Szampon odbudowuj??cy <strong>do w??os??w os??abionych i uszkodzonych</strong>. Wzmacnia struktur?? w??os??w, poprawia ich kondycj?? i wygl??d na ca??ej ich d??ugo??ci. Sprawia, ??e w??osy <strong>staj?? si?? lekkie, mi??kkie i puszyste u nasady</strong>. <br /><br /><strong>Sk??ad:</strong><br />Czerwona alga- tworzy wok???? w??osa ochronny filtr i daje efekt g??adkich, zdrowych i b??yszcz??cych w??os??w. Hydrolizat bia??kowy z szar??atu- nawil??a i wspomaga odbudow?? zniszczonych i uwra??liwionych w??os??w. <br /><br /><strong>Spos??b u??ycia: </strong><br />Szampon nak??adaj na w??osy etapami. W celu rozprowadzenia preparatu przeczesz w??osy, kieruj si?? od linii w??os??w ku g??rze g??owy. Masuj, wykonuj??c palcami ruchy okr????ne. Doprowad?? do powstania piany, sp??ucz i osusz r??cznikiem. Powt??rz w razie potrzeby.</p>\r\n</div>\r\n<div id=\"banner-section\" class=\"section\"><img class=\"img-frame\" src=\"/userdata/public/assets/kemon-actyva-nuova-fibra-baner.png\" alt=\"Kemon Nuova Fibra baner\" width=\"auto\" data-id=\"img_1\" /></div>\r\n<div id=\"list-section\" class=\"section\">\r\n<h4 class=\"header\" data-id=\"h4_1\">Efekty zastosowania</h4>\r\n<ul class=\"list\" data-id=\"ul_1\">\r\n<li>Odbudowuje struktur??</li>\r\n<li>Wzmacnia w????kno w??osa</li>\r\n<li>Ochrania przez szkodliwymi czynnikami zewn??trznymi</li>\r\n<li>Nadaje mi??kko??ci</li>\r\n<li>Zachowuje naturaln?? r??wnowag?? sk??ry g??owy</li>\r\n</ul>\r\n</div>\r\n<div id=\"pictures-section\" class=\"section\">\r\n<h4 class=\"header\" data-id=\"h4_1\">Nuova Fibra</h4>\r\n<div id=\"pictures-wrapper\" class=\"image-section\">\r\n<div class=\"image-container\"><img src=\"/userdata/public/assets/kemon-actyva-nuova-fibra-logo3.png\" alt=\"Nuova Fibra logo\" width=\"auto\" data-id=\"img_1\" />\r\n<h5 data-id=\"h5_1\">Odbudowa dla w??os??w os??abionych i zniszczonych</h5>\r\n<p data-id=\"p_1\">Struktura w??osa zbli??ona jest do struktury ??odygi ro??liny.</p>\r\n</div>\r\n<div class=\"image-container\"><img src=\"/userdata/public/assets/czerwone-algi.png\" alt=\"Czerwone algi\" width=\"auto\" data-id=\"img_1\" />\r\n<h5 data-id=\"h5_1\">Czerwone Algi</h5>\r\n<p data-id=\"p_1\">Czerwona alga tworzy wok???? w??osa ochronny filtr i daje efekt g??adkich, zdrowych i b??yszcz??cych w??os??w</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div id=\"video-section\" class=\"section video-section\">\r\n<h4 class=\"header\" data-id=\"h4_1\">Nuova Fibra</h4>\r\n<div class=\"video-wrapper\"><iframe title=\"YouTube video player\" src=\"https://www.youtube.com/embed/r1nU7qAOpo0\" width=\"100%\" height=\"150\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\" data-id=\"iframe_1\"></iframe></div>\r\n</div>\r\n</div>",
//           "active": "0",
//           "lang_id": "1",
//           "isdefault": "0",
//           "seo_title": "KEMON Actyva Szampon Nuova Fibra 250ml x 2szt - Brillar",
//           "seo_description": "",
//           "seo_keywords": "",
//           "order": "1",
//           "main_page": "0",
//           "main_page_order": "0",
//           "booster": "",
//           "seo_url": "kemon/actyva-szampon-nuova-fibra-2szt-250ml",
//           "permalink": "https://www.brillar-sklep.pl/kemon/actyva-szampon-nuova-fibra-2szt-250ml"
//       }
//   },
//   "options": [],
//   "attributes": [],
//   "related": [
//       124,
//       114,
//       73,
//       63
//   ],
//   "main_image": {
//       "gfx_id": "248",
//       "name": "kemon-nuova-fibra-2szt-actyva.png",
//       "unic_name": "248",
//       "order": "1",
//       "hidden": "0",
//       "translations": {
//           "pl_PL": {
//               "translation_id": "248",
//               "gfx_id": "248",
//               "name": "kemon-nuova-fibra-2szt-actyva.png",
//               "lang_id": "1"
//           }
//       },
//       "extension": "jpg"
//   },
//   "is_product_of_day": false,
//   "feeds_excludes": [
//       "2",
//       "3",
//       "5",
//       "6",
//       "7",
//       "8",
//       "9",
//       "10"
//   ],
//   "tags": []
// }
