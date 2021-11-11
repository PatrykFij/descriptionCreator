import { useEffect, useMemo, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import Card from 'components/Card';
import { handleException } from 'utils/handleException';
import { mapOrdersRange } from 'utils/mappers/mapOrdersRange';
import { mapOrdersWithBuyingPrice } from 'utils/mappers/mapOrdersWithPriceBuying';
import { Data, MappedOrder } from 'utils/mappers/types';
import OrdersTable from './components/OrdersTable.tsx';
import Summary from './components/Summary';
import * as api from './api';
import * as S from './styles';

const Accountancy = () => {
  const [orders, setOrders] = useState<MappedOrder[]>();
  const [ordersRange, setOrdersRange] = useState<number[]>();

  const { isLoadingShippings, getShippingMethods } = api.useGetShippingMethod();
  const { isLoading: isLoadingProducts, getAllProducts } = api.useGetProducts();
  const { isLoading: isLoadingOrders, getAllOrders } = api.useGetOrders();
  const { isLoading: isLoadingOrderedProducts, getAllOrderedProducts } =
    api.useGetOrderedProducts();

  useEffect(() => {
    handleMapData();
  }, []);

  const handleMapData = () => {
    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      const mappedData = mapOrdersWithBuyingPrice(data);
      const orderRange = mapOrdersRange(mappedData);
      setOrders(mappedData);
      setOrdersRange(orderRange);
    }
  };

  const handleDownloadData = async () => {
    try {
      const shippingMethods = await getShippingMethods();
      const allProducts = await getAllProducts();
      const allOrders = await getAllOrders();
      const allOrderedProducts = await getAllOrderedProducts();

      if (allProducts && allOrders && allOrderedProducts && shippingMethods) {
        const data: Data = {
          shippingMethods: shippingMethods,
          allProducts: allProducts,
          allOrders: allOrders,
          allOrderedProducts: allOrderedProducts,
        };
        localStorage.setItem('data', JSON.stringify(data));
        const mappedData = mapOrdersWithBuyingPrice(data);
        const orderRange = mapOrdersRange(mappedData);
        setOrders(mappedData);
        setOrdersRange(orderRange);
      }
    } catch (e) {
      handleException(e);
    }
  };

  const isLoading = useMemo(
    () =>
      isLoadingProducts ||
      isLoadingOrders ||
      isLoadingOrderedProducts ||
      isLoadingShippings,
    [
      isLoadingOrderedProducts,
      isLoadingOrders,
      isLoadingProducts,
      isLoadingShippings,
    ],
  );

  const ordersByRange = useMemo(() => {
    if (orders && ordersRange) {
      return orders.filter(
        (el) =>
          Number(el.order_id) >= ordersRange[0] &&
          Number(el.order_id) <= ordersRange[1],
      );
    }
  }, [orders, ordersRange]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <S.Summary item>
          <Card title="Stan magazynowy"></Card>
        </S.Summary>
        <S.Summary item>
          <Summary ordersByRange={ordersByRange} />
        </S.Summary>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <OrdersTable
            ordersByRange={ordersByRange}
            isLoading={isLoading}
            orders={orders}
            ordersRange={ordersRange}
            setOrdersRange={setOrdersRange}
            handleGetData={handleDownloadData}
            handleMapData={handleMapData}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Accountancy;

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
//           "description": "<div class=\"description-container\">\r\n<div class=\"top-bar\"> </div>\r\n<div id=\"producer-logo-section\" class=\"producer-logo\"><a href=\"https://www.brillar-sklep.pl/kemon\" data-id=\"a_1\"><img src=\"/userdata/public/assets/producer-kemon.png\" alt=\"Logo producenta\" width=\"auto\" /></a></div>\r\n<div id=\"headers-section\" class=\"section\">\r\n<h2 data-id=\"h2_1\">Actyva Szampon Nuova Fibra</h2>\r\n<h3 data-id=\"h3_1\">Odbudowanie włosów, do włosów osłabionych, uszkodzonych, zniszczonych</h3>\r\n<h4 data-id=\"h4_1\">Szampon do włosów 250ml x 2szt</h4>\r\n</div>\r\n<div id=\"description-section\" class=\"section\">\r\n<p data-id=\"p_1\">Szampon odbudowujący <strong>do włosów osłabionych i uszkodzonych</strong>. Wzmacnia strukturę włosów, poprawia ich kondycję i wygląd na całej ich długości. Sprawia, że włosy <strong>stają się lekkie, miękkie i puszyste u nasady</strong>. <br /><br /><strong>Skład:</strong><br />Czerwona alga- tworzy wokół włosa ochronny filtr i daje efekt gładkich, zdrowych i błyszczących włosów. Hydrolizat białkowy z szarłatu- nawilża i wspomaga odbudowę zniszczonych i uwrażliwionych włosów. <br /><br /><strong>Sposób użycia: </strong><br />Szampon nakładaj na włosy etapami. W celu rozprowadzenia preparatu przeczesz włosy, kieruj się od linii włosów ku górze głowy. Masuj, wykonując palcami ruchy okrężne. Doprowadź do powstania piany, spłucz i osusz ręcznikiem. Powtórz w razie potrzeby.</p>\r\n</div>\r\n<div id=\"banner-section\" class=\"section\"><img class=\"img-frame\" src=\"/userdata/public/assets/kemon-actyva-nuova-fibra-baner.png\" alt=\"Kemon Nuova Fibra baner\" width=\"auto\" data-id=\"img_1\" /></div>\r\n<div id=\"list-section\" class=\"section\">\r\n<h4 class=\"header\" data-id=\"h4_1\">Efekty zastosowania</h4>\r\n<ul class=\"list\" data-id=\"ul_1\">\r\n<li>Odbudowuje strukturę</li>\r\n<li>Wzmacnia włókno włosa</li>\r\n<li>Ochrania przez szkodliwymi czynnikami zewnętrznymi</li>\r\n<li>Nadaje miękkości</li>\r\n<li>Zachowuje naturalną równowagę skóry głowy</li>\r\n</ul>\r\n</div>\r\n<div id=\"pictures-section\" class=\"section\">\r\n<h4 class=\"header\" data-id=\"h4_1\">Nuova Fibra</h4>\r\n<div id=\"pictures-wrapper\" class=\"image-section\">\r\n<div class=\"image-container\"><img src=\"/userdata/public/assets/kemon-actyva-nuova-fibra-logo3.png\" alt=\"Nuova Fibra logo\" width=\"auto\" data-id=\"img_1\" />\r\n<h5 data-id=\"h5_1\">Odbudowa dla włosów osłabionych i zniszczonych</h5>\r\n<p data-id=\"p_1\">Struktura włosa zbliżona jest do struktury łodygi rośliny.</p>\r\n</div>\r\n<div class=\"image-container\"><img src=\"/userdata/public/assets/czerwone-algi.png\" alt=\"Czerwone algi\" width=\"auto\" data-id=\"img_1\" />\r\n<h5 data-id=\"h5_1\">Czerwone Algi</h5>\r\n<p data-id=\"p_1\">Czerwona alga tworzy wokół włosa ochronny filtr i daje efekt gładkich, zdrowych i błyszczących włosów</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div id=\"video-section\" class=\"section video-section\">\r\n<h4 class=\"header\" data-id=\"h4_1\">Nuova Fibra</h4>\r\n<div class=\"video-wrapper\"><iframe title=\"YouTube video player\" src=\"https://www.youtube.com/embed/r1nU7qAOpo0\" width=\"100%\" height=\"150\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\" data-id=\"iframe_1\"></iframe></div>\r\n</div>\r\n</div>",
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
