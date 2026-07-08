export interface Wilaya {
  code: number
  nameAr: string
  nameFr: string
  nameEn: string
  shippingPrice: number
}

export const wilayas: Wilaya[] = [
  { code: 1, nameAr: "أدرار", nameFr: "Adrar", nameEn: "Adrar", shippingPrice: 800 },
  { code: 2, nameAr: "الشلف", nameFr: "Chlef", nameEn: "Chlef", shippingPrice: 600 },
  { code: 3, nameAr: "الأغواط", nameFr: "Laghouat", nameEn: "Laghouat", shippingPrice: 700 },
  { code: 4, nameAr: "أم البواقي", nameFr: "Oum El Bouaghi", nameEn: "Oum El Bouaghi", shippingPrice: 600 },
  { code: 5, nameAr: "باتنة", nameFr: "Batna", nameEn: "Batna", shippingPrice: 600 },
  { code: 6, nameAr: "بجاية", nameFr: "Béjaïa", nameEn: "Béjaïa", shippingPrice: 600 },
  { code: 7, nameAr: "بسكرة", nameFr: "Biskra", nameEn: "Biskra", shippingPrice: 600 },
  { code: 8, nameAr: "بشار", nameFr: "Béchar", nameEn: "Béchar", shippingPrice: 800 },
  { code: 9, nameAr: "البليدة", nameFr: "Blida", nameEn: "Blida", shippingPrice: 500 },
  { code: 10, nameAr: "البويرة", nameFr: "Bouira", nameEn: "Bouira", shippingPrice: 600 },
  { code: 11, nameAr: "تمنراست", nameFr: "Tamanrasset", nameEn: "Tamanrasset", shippingPrice: 1200 },
  { code: 12, nameAr: "تبسة", nameFr: "Tébessa", nameEn: "Tébessa", shippingPrice: 600 },
  { code: 13, nameAr: "تلمسان", nameFr: "Tlemcen", nameEn: "Tlemcen", shippingPrice: 600 },
  { code: 14, nameAr: "تيارت", nameFr: "Tiaret", nameEn: "Tiaret", shippingPrice: 600 },
  { code: 15, nameAr: "تيزي وزو", nameFr: "Tizi Ouzou", nameEn: "Tizi Ouzou", shippingPrice: 600 },
  { code: 16, nameAr: "الجزائر", nameFr: "Alger", nameEn: "Algiers", shippingPrice: 400 },
  { code: 17, nameAr: "الجلفة", nameFr: "Djelfa", nameEn: "Djelfa", shippingPrice: 700 },
  { code: 18, nameAr: "جيجل", nameFr: "Jijel", nameEn: "Jijel", shippingPrice: 600 },
  { code: 19, nameAr: "سطيف", nameFr: "Sétif", nameEn: "Sétif", shippingPrice: 600 },
  { code: 20, nameAr: "سعيدة", nameFr: "Saïda", nameEn: "Saïda", shippingPrice: 700 },
  { code: 21, nameAr: "سكيكدة", nameFr: "Skikda", nameEn: "Skikda", shippingPrice: 600 },
  { code: 22, nameAr: "سيدي بلعباس", nameFr: "Sidi Bel Abbès", nameEn: "Sidi Bel Abbès", shippingPrice: 600 },
  { code: 23, nameAr: "عنابة", nameFr: "Annaba", nameEn: "Annaba", shippingPrice: 600 },
  { code: 24, nameAr: "قالمة", nameFr: "Guelma", nameEn: "Guelma", shippingPrice: 600 },
  { code: 25, nameAr: "قسنطينة", nameFr: "Constantine", nameEn: "Constantine", shippingPrice: 600 },
  { code: 26, nameAr: "المدية", nameFr: "Médéa", nameEn: "Médéa", shippingPrice: 500 },
  { code: 27, nameAr: "مستغانم", nameFr: "Mostaganem", nameEn: "Mostaganem", shippingPrice: 600 },
  { code: 28, nameAr: "المسيلة", nameFr: "M'Sila", nameEn: "M'Sila", shippingPrice: 600 },
  { code: 29, nameAr: "معسكر", nameFr: "Mascara", nameEn: "Mascara", shippingPrice: 600 },
  { code: 30, nameAr: "ورقلة", nameFr: "Ouargla", nameEn: "Ouargla", shippingPrice: 800 },
  { code: 31, nameAr: "وهران", nameFr: "Oran", nameEn: "Oran", shippingPrice: 500 },
  { code: 32, nameAr: "البيض", nameFr: "El Bayadh", nameEn: "El Bayadh", shippingPrice: 800 },
  { code: 33, nameAr: "إليزي", nameFr: "Illizi", nameEn: "Illizi", shippingPrice: 1200 },
  { code: 34, nameAr: "برج بوعريريج", nameFr: "Bordj Bou Arréridj", nameEn: "Bordj Bou Arréridj", shippingPrice: 600 },
  { code: 35, nameAr: "بومرداس", nameFr: "Boumerdès", nameEn: "Boumerdès", shippingPrice: 500 },
  { code: 36, nameAr: "الطارف", nameFr: "El Tarf", nameEn: "El Tarf", shippingPrice: 600 },
  { code: 37, nameAr: "تندوف", nameFr: "Tindouf", nameEn: "Tindouf", shippingPrice: 1200 },
  { code: 38, nameAr: "تيسمسيلت", nameFr: "Tissemsilt", nameEn: "Tissemsilt", shippingPrice: 600 },
  { code: 39, nameAr: "الوادي", nameFr: "El Oued", nameEn: "El Oued", shippingPrice: 700 },
  { code: 40, nameAr: "خنشلة", nameFr: "Khenchela", nameEn: "Khenchela", shippingPrice: 600 },
  { code: 41, nameAr: "سوق أهراس", nameFr: "Souk Ahras", nameEn: "Souk Ahras", shippingPrice: 600 },
  { code: 42, nameAr: "تيبازة", nameFr: "Tipaza", nameEn: "Tipaza", shippingPrice: 500 },
  { code: 43, nameAr: "ميلة", nameFr: "Mila", nameEn: "Mila", shippingPrice: 600 },
  { code: 44, nameAr: "عين الدفلى", nameFr: "Aïn Defla", nameEn: "Aïn Defla", shippingPrice: 500 },
  { code: 45, nameAr: "النعامة", nameFr: "Naâma", nameEn: "Naâma", shippingPrice: 800 },
  { code: 46, nameAr: "عين تموشنت", nameFr: "Aïn Témouchent", nameEn: "Aïn Témouchent", shippingPrice: 600 },
  { code: 47, nameAr: "غرداية", nameFr: "Ghardaïa", nameEn: "Ghardaïa", shippingPrice: 700 },
  { code: 48, nameAr: "غليزان", nameFr: "Relizane", nameEn: "Relizane", shippingPrice: 600 },
  { code: 49, nameAr: "تيميمون", nameFr: "Timimoun", nameEn: "Timimoun", shippingPrice: 1000 },
  { code: 50, nameAr: "برج باجي مختار", nameFr: "Bordj Badji Mokhtar", nameEn: "Bordj Badji Mokhtar", shippingPrice: 1400 },
  { code: 51, nameAr: "أولاد جلال", nameFr: "Ouled Djellal", nameEn: "Ouled Djellal", shippingPrice: 700 },
  { code: 52, nameAr: "بني عباس", nameFr: "Béni Abbès", nameEn: "Béni Abbès", shippingPrice: 1000 },
  { code: 53, nameAr: "عين صالح", nameFr: "In Salah", nameEn: "In Salah", shippingPrice: 1200 },
  { code: 54, nameAr: "عين قزام", nameFr: "In Guezzam", nameEn: "In Guezzam", shippingPrice: 1500 },
  { code: 55, nameAr: "تقرت", nameFr: "Touggourt", nameEn: "Touggourt", shippingPrice: 700 },
  { code: 56, nameAr: "جانت", nameFr: "Djanet", nameEn: "Djanet", shippingPrice: 1400 },
  { code: 57, nameAr: "المغير", nameFr: "El M'Ghair", nameEn: "El M'Ghair", shippingPrice: 700 },
  { code: 58, nameAr: "المنيعة", nameFr: "El Menia", nameEn: "El Menia", shippingPrice: 800 },
]

export function getWilayaByCode(code: number): Wilaya | undefined {
  return wilayas.find(w => w.code === code)
}
