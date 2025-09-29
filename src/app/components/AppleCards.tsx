import React from "react";
import { Carousel, Card } from "./ui/Carousel";
import yalidinPic from "../../../public/assets/cards/yalidine.jpg";
import collectionPic from "../../../public/assets/cards/collection.jpg";
import pricingPic from "../../../public/assets/cards/pricing.jpg";
import exclusivePic from "../../../public/assets/cards/exclusive.webp";
import divisionPic from "../../../public/assets/cards/division.webp";

const DummyContent = () => (
  <div>
    <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl">
      Pour Vous
    </p>
  </div>
);

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    // @ts-expect-error aaa aaa aaa
    <Card key={index} card={card} index={index} />
  ));

  return (
    <div id="about" className="h-full w-full py-20">
      <h2 className="mx-auto max-w-7xl pl-4 text-center font-sans text-4xl font-bold text-neutral-800 dark:text-neutral-200 md:text-5xl lg:text-5xl">
        Plus De Nous
      </h2>
      <p className="mx-3 mt-3 text-center text-gray-500">
        Découvrez notre histoire et notre passion pour offrir les meilleurs
        produits
      </p>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "Livraison",
    title: "Livraison Rapide 48 heures",
    src: yalidinPic,
    content: <DummyContent />,
  },
  {
    category: "Nos Produits",
    title: "Une Large Collection Des Parfum Originaux",
    src: collectionPic,
    content: <DummyContent />,
  },
  {
    category: "Exclusive",
    title: "Toute Notre Collection de Produits Exclusifs",
    src: exclusivePic,
    content: <DummyContent />,
  },
  {
    category: "Prix",
    title: "Meilleur Prix au Marchet Algérien",
    src: pricingPic,
    content: <DummyContent />,
  },
  {
    category: "Division",
    title: "Diviser Les Parfums Originaux à Partir de 10 ml",
    src: divisionPic,
    content: <DummyContent />,
  },
];
