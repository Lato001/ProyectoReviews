"use client";

import React, {useState, useRef} from "react";
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
import {Textarea} from "@/components/ui/textarea";

interface Reviews {
  id: string;
  productId: string;
  userId: string;
  content: string;
  likes: number;
  dislikes: number;
  isLiked: boolean;
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
  const [stateLike, setLike] = useState<boolean | null>(null);
  const [count, setCount] = useState(0);

  const handleLike = () => {
    !stateLike ? setLike(true) : setLike(null);
    !stateLike ? toast("You're Liked this product!") : toast("your Like was removed");
  };
  const handleDislike = () => {
    !(stateLike === false) ? setLike(false) : setLike(null);
    !(stateLike === false)
      ? toast("You disliked this product!")
      : toast("Your Dislike was removed");
  };

  const handleSend = () => {};
  /* const alertMessageSended = validar()
    ? "Your message has sent"
    : "your message is void, please try again";
    const handleSendMessage = () => {
      toast(alertMessageSended);
    };
  */

  return (
    <div className="flex justify-center">
      <div>
        {products.map((productos) => (
          <Card key={productos.id} className="mb-8 pb-8">
            <CardHeader>
              <CardTitle>{productos.name}</CardTitle>
              <CardDescription className="flex-wrap">
                <p>{productos.description}</p>
                <p className="bold mt-2 text-white">${productos.price}</p>
              </CardDescription>
            </CardHeader>
            <CardContent className=" flex justify-center">
              <img
                alt="imagen no encontrada"
                className="max-w-72 rounded-3xl"
                src={productos.img}
              />
            </CardContent>

            <div className=" flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white text-black" variant="outline">
                    Reviews ({productos.reviews.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-2 border-solid border-white sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Send review</DialogTitle>
                    <DialogDescription>
                      <p>Write your opinion about this product.</p>
                      <p>
                        Keep in mind that it will be public, your opinion can be make the
                        difference.
                      </p>
                    </DialogDescription>
                    <DialogFooter />
                  </DialogHeader>
                  <div />
                  {productos.reviews.map((rw) => {
                    const user = users.find((usr) => usr.id === rw.userId);

                    return (
                      <Card key={rw.id} className="border-2 border-solid border-white">
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
                        <CardFooter className=" flex justify-end p-0">
                          <div className="float-end flex w-full justify-between pb-4">
                            <Button
                              key={productos.id}
                              className={`ml-10  px-10 py-3 text-black ${stateLike ? " bg-green-500 duration-75" : "bg-white"} hover:bg-green-200`}
                              id=""
                              onClick={handleLike}
                            >
                              Likes ({rw.likes})
                            </Button>
                            <Button
                              key={productos.id}
                              className={`mr-10  px-10 py-3 text-black ${stateLike === false ? " bg-red-500 duration-75" : "bg-white"} hover:bg-red-200`}
                              id=""
                              onClick={handleDislike}
                            >
                              Dislike ({rw.dislikes})
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}

                  <DialogFooter className="items-center">
                    <Textarea
                      className=" no-scrollbar ml-1 max-h-24 w-full overflow-y-scroll p-4 text-base text-white "
                      id="textarea"
                      placeholder="Write a comment!"
                    />
                    <Button className="ml-4 " type="submit" onClick={handleSend}>
                      Send
                    </Button>
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
