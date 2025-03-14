const STORE_ID = "108362264";
const API_TOKEN = "public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs";

const BASE_URL = `https://app.ecwid.com/api/v3/${STORE_ID}`;

export interface Category {
  id: number;
  name: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  defaultDisplayedLowestPriceFormatted: any;
  imageUrl: string;
  description?: string;
  quantity?: number;
  picked?: {type: string; value: string }[];
  options?: { type: string; choices: { text: string }[] }[];
  tax: { defaultLocationIncludedTaxRate: number };
  media?: { images?: { image160pxUrl: string; image1500pxUrl: string }[] };
}


export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${BASE_URL}/categories?token=${API_TOKEN}`);
    const data = await response.json();
    console.log(data)
    return data.items.map((category: any) => ({
      id: category.id,
      name: category.name,
      imageUrl: category.imageUrl || "",
      
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`https://app.ecwid.com/api/v3/108362264/products/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs',
    },
  });
  const data = await response.json();
  return data;
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products?token=${API_TOKEN}`);
    const data = await response.json();
    console.log(data)
    return data.items.map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      price_show: product.defaultDisplayedPriceFormatted,
      imageUrl: product.imageUrl || "",
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  const response = await fetch(
    `https://app.ecwid.com/api/v3/108362264/products?category=${categoryId}&token=public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs`
  );
  const data = await response.json();

  return data.items.map((item: any) => ({
    id: String(item.id),
    name: item.name,
    price: item.price,
    descriptions: item.description || "",
    defaultDisplayedPriceFormatted: item.defaultDisplayedPriceFormatted,
    imageUrl: item.imageUrl,
    description: item.description || "",
    quantity: item.quantity,
    picked: item.picked,
    options: item.options || [],
    tax: item.tax,
    media: item.media,
  }));
}
