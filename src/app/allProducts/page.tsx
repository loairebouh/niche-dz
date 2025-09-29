/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Product } from "../../../types/index";
import { urlFor } from "../../../lib/sanity";
import client from "../../../lib/sanity";
import { GrFormView } from "react-icons/gr";
import Link from "next/link";

export default async function AllProducts() {
  const products = (await client.fetch(`*[_type == "product"]`, {}, {cache: "no-store"})) as Product[];

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="mx-auto max-w-7xl border-b border-gray-700 px-4">
      <h1 className="mt-10 text-center text-4xl font-bold lg:text-5xl">
        Tous les produits
      </h1>
      <p className="mt-3 text-center text-gray-500">
        Explorez tous nos produits disponibles
      </p>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product._id} className="mb-10 flex flex-col items-center">
            <Link href={`/product/${product.slug.current}`}>
              <div className="relative w-full overflow-hidden rounded-3xl">
                <img
                  src={urlFor(product.mainImage).width(400).url()}
                  alt={product.name}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute left-2 top-2 rounded-lg bg-black px-2 py-1 text-xs text-white">
                  {product.volume} mL
                </div>
              </div>
              <div className="mt-4 w-full">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-md font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-lg font-bold text-gray-900">
                    {product.saleOptions === "full"
                      ? `${product.priceBottle || "N/A"} DA`
                      : product.saleOptions === "divided"
                        ? `${product.priceDivision || "N/A"} DA`
                        : product.saleOptions === "both"
                          ? `${product.priceBottle || "N/A"} DA`
                          : "N/A"}
                  </p>
                </div>
                {product.saleOptions === "divided" && (
                  <p className="mt-1 text-sm text-red-700">
                    Divisement Seulement
                  </p>
                )}
                {product.saleOptions === "full" && (
                  <p className="mt-1 text-sm font-bold text-green-700">
                    Bouteille Complete Seulement
                  </p>
                )}
                {product.saleOptions === "both" && (
                  <p className="mt-1 text-sm font-bold text-blue-700">
                    Disponible Complète Ou Divisé
                  </p>
                )}

                <div className="mt-1 text-sm font-bold text-gray-600">
                  <p>
                    <strong>Category:</strong>{" "}
                    <span className="capitalize">{product.category}</span>
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {product.description || "No description available"}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="align-center mb-5 flex justify-center">
        <button className="border-bold duration-400 flex transform flex-row items-center justify-center gap-2 rounded-2xl border bg-transparent px-6 py-2 font-bold text-black shadow-[0_0_0_3px_#000000_inset] transition hover:-translate-y-1 hover:bg-black hover:text-white dark:border-white dark:text-white">
          Voir plus
          <span>
            <GrFormView />
          </span>
        </button>
      </div>
    </div>
  );
}
