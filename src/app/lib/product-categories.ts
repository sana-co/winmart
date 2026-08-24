export const productCategories = ["Ladies", "Gents", "Kids", "Accessories"] as const;

export type ProductCategory = (typeof productCategories)[number];

export const productFilters = ["All", ...productCategories] as const;
