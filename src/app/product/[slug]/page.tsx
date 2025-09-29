/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { notFound } from "next/navigation";
import sanityClient from "../../../../lib/sanity";
import { urlFor } from "../../../../lib/sanity";
import { Product } from "../../../../types";
import OrderForm from "@/app/components/OrderForm";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const query = `*[_type == "product"]{slug}`;
  const products = await sanityClient.fetch(query, {}, { cache: "no-store"});

  return products.map((product: { slug: { current: string } }) => ({
    slug: product.slug.current,
  }));
}

const ProductDetails = async ({ params }: Props) => {
  const { slug } = params;
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  const product: Product = await sanityClient.fetch(query, { slug });

  if (!product) {
    notFound();
  }

  const images = product.otherImages || [];
  const getVolume = () => {
    if (product.saleOptions === "divided") {
      return product.volume ? (
        <div>
          Volume Restant: <div className="font-bold"> {product.volume} mL</div>
        </div>
      ) : (
        "N/A"
      );
    }
    if (product.saleOptions === "both" || product.saleOptions === "full") {
      return product.volume ? (
        <div>
          <span className="text-black">Volume de Bouteille:</span>{" "}
          {product.volume} mL
        </div>
      ) : (
        "N/A"
      );
    }
  };
  const getPrice = () => {
    if (product.saleOptions === "full") {
      return product.priceBottle ? (
        <span className="font-bold">{product.priceBottle} DA</span>
      ) : (
        "N/A"
      );
    }

    if (product.saleOptions === "divided") {
      return product.priceDivision ? (
        <span className={`text-3xl font-bold`}>{product.priceDivision} DA</span>
      ) : (
        "N/A"
      );
    }

    if (product.saleOptions === "both") {
      const prices = [];
      if (product.priceBottle) {
        prices.push(
          <span key="full" className="text-3xl font-bold">
            {product.priceBottle} DA
          </span>,
        );
      }
      if (product.priceDivision) {
        prices.push(
          <span key="divided" className="text-sm text-gray-800">
            {product.priceDivision} DA / 10mL{" "}
            <span className="text-red-400">(Prix De Division)</span>
          </span>,
        );
      }
      return prices.length > 0 ? (
        <div className="flex flex-col gap-2">{prices}</div>
      ) : (
        "N/A"
      );
    }
    return "N/A";
  };
  const getPriceDescription = () => {
    if (product.saleOptions === "full" || product.saleOptions === "both") {
      return "Prix De Bouteille";
    }
    if (product.saleOptions === "divided" || product.saleOptions === "both") {
      return "Prix Pour 10mL";
    }
    if (product.saleOptions === "both") {
      const prices = [];
      if (product.priceBottle)
        prices.push(
          <span key="full" className="text-3xl font-bold">
            {product.priceBottle} DA
          </span>,
        );
      if (product.priceDivision)
        prices.push(
          <span key="divided" className="text-sm text-gray-600">
            {product.priceDivision} DA
          </span>,
        );
      return prices.length > 0 ? prices : "N/A";
    }
    return "N/A";
    return "Price not available";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-0 lg:py-10">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-10">
        <div className="lg:col-span-5">
          <div className="flex flex-col">
            {product.mainImage && (
              <div className="mt-0 lg:mt-6">
                <Image
                  src={urlFor(product.mainImage).url()}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>
            )}
          </div>
          <div className="">
            <div className="mt-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-6 lg:grid-cols-3">
              {images.map((image: any, index: number) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl"
                >
                  <Image
                    src={urlFor(image).url()}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={500}
                    height={500}
                    className="h-auto w-1/3 object-cover transition-transform duration-300 hover:scale-105 lg:w-1/2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold lg:mt-10 lg:text-4xl">
              {product.name}
            </h1>
            <p className="text-md text-gray-700">{product.description}</p>
          </div>
          <div className="my-5 flex flex-col gap-2 rounded-3xl border-4 border-black bg-black p-5 lg:my-5">
            <span className="text-center text-2xl font-semibold text-white lg:text-3xl">
              Les Notes:
            </span>
            <div className="flex flex-col gap-2 text-center text-white">
              {product.notes.length > 0 ? (
                product.notes.map((note, index) => (
                  <div key={index}>
                    <div>
                      <strong>{note.noteName}: </strong>{" "}
                      <span>{note.noteInfo}</span>
                    </div>
                  </div>
                ))
              ) : (
                <span>Pas De Notes Disponible</span>
              )}
            </div>
          </div>
          <div className="mb-0 flex flex-col gap-1">
            <div className="text-lg font-medium text-black">{getVolume()}</div>
            <div className="text-lg font-medium text-gray-800">
              Category: <span className="capitalize">{product.category}</span>
            </div>
          </div>
          <div className="border-1 border-red mt-2">
            <div className="flex justify-end">
              <div className="flex flex-col justify-end">
                <div className="text-xl font-bold text-red-600">
                  {getPriceDescription()}
                </div>
                <div
                  className={`text-4xl font-bold text-gray-900 ${
                    product.saleOptions === "both" ? "flex flex-col gap-1" : ""
                  }`}
                >
                  {getPrice()}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <OrderForm product={product}></OrderForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
