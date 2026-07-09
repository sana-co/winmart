export const productCategories = ["Ladies", "Gents", "Accessories"] as const;

export type ProductCategory = (typeof productCategories)[number];

export const productFilters = ["All", ...productCategories] as const;
