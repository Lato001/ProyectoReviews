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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface Reviews {
  id: string;
  productId: string;
  userId: string;
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

export default function HomePage() {
  const [stateLike, setLike] = useState(false);
  const [stateDislike, setDislike] = useState(false);

  const handleLike = () => {
    setLike(!stateLike);
    stateLike ? toast("Your Like was removed") : toast("You're Liked this product!");
    stateDislike ? setDislike(false) : "";
  };

  const handleDislike = () => {
    setDislike(!stateDislike);
    stateDislike ? toast("Your dislike was removed") : toast(" You're Disliked this product");

    stateLike ? setLike(false) : "";
  };

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
              <Button
                className="ml-10 bg-white px-10 py-3 text-black"
                variant="outline"
                onClick={handleLike}
              >
                Like
              </Button>
              <Button
                className="mr-10 bg-white px-10 py-3 text-black"
                variant="outline"
                onClick={handleDislike}
              >
                Dislike
              </Button>
            </CardFooter>
            <div className=" flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white text-black" variant="outline">
                    Comments
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Send review</DialogTitle>
                    <DialogDescription>
                      <p>Write your opinion about this product.</p>
                      <p>Keep in mind that it will be public. Your opinion can make a difference</p>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 " />
                  {productos.reviews.map((rw) => {
                    const user = users.find((usr) => usr.id === rw.userId);

                    return (
                      <Card key={rw.id}>
                        <CardHeader>
                          <div className="flex ">
                            <Avatar>
                              <AvatarImage src={user?.img} />
                              <AvatarFallback>{user?.name}</AvatarFallback>
                            </Avatar>
                            <Label className="ml-4 mt-2.5" htmlFor="username">
                              {user?.name}
                            </Label>
                          </div>
                        </CardHeader>
                        <CardContent>{rw.content}</CardContent>
                      </Card>
                    );
                  })}

                  <DialogFooter>
                    <Button type="submit">Send</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
