"use client";

import {mock} from "node:test";

import React, {useState} from "react";
import {toast} from "sonner";

import Mock from "../components/mock_data_sistema_resenas.json";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const [stateLike, setLike] = useState(false);
  const [stateDislike, setDislike] = useState(false);

  const handleLike = () => {
    setLike(!stateLike);
    stateLike ? toast("You're liked this product") : "";
    stateDislike ? setDislike(false) : "";
  };
  const handleDislike = () => {
    setDislike(!stateDislike);
    stateDislike ? toast("You're disliked this product") : "";

    stateLike ? setLike(false) : "";
  };

  interface Reviews {
    id: string;
    product: string;
    userID: string;
    content: string;
    likes: number;
    dislikes: number;
  }
  interface Products {
    id: string;
    name: string;
    description: string;
    img: string;
    price: number;
    reviews: Reviews[];
  }

  interface Users {
    id: string;
    name: string;
    email: string;
    img: string;
  }

  const products: Products[] = Mock.products;
  const reviews = products.map((productos) => productos.reviews);
  const users: Users[] = Mock.users;

  return (
    <div className="flex justify-center">
      <div>
        {products.map((productos) => (
          <Card key={productos.id} className="mb-8 pb-8">
            <CardHeader>
              <CardTitle>{productos.name}</CardTitle>
              <CardDescription>{productos.description}</CardDescription>
            </CardHeader>
            <CardContent className=" flex justify-center">
              <img alt="imagen no encontrada" className="max-w-72" src={productos.img} />
            </CardContent>
            <CardFooter className="flex justify-around">
              <Button className="ml-10 bg-white px-10 py-3 text-black" onClick={handleLike}>
                Like
              </Button>
              <Button className="mr-10 bg-white px-10 py-3 text-black" onClick={handleDislike}>
                Dislike
              </Button>
            </CardFooter>
            <div className=" flex justify-center">
              <Button className=" bg-white px-10 py-3 text-black">Comments</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
