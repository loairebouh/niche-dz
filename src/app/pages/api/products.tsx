import { client } from "../../../../lib/sanity";
// @ts-expect-error asd asd asd
export async function handler(req, res) {
  try {
    const query = `*[_type == "product"]{_id, name, slug, mainImage, volume, priceBottle, category}`;
    const products = await client.fetch(query, {}, { cache: "no-store" });
    if (products.length === 0) {
      console.log("No products found in Sanity.");
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
}

export default handler;
