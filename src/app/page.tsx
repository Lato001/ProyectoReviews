import React from "react";
import {useState} from "React";

import data from "../components/mock_data_sistema_resenas.json";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface Users {
  id: string;
  name: string;
  email: string;
  img: string;
}

const usersList: Users[] = data.users;

export default function HomePage() {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleLike = () => {
    console.log("like >:=>");
    setLike(true);
  };
  const handleDislike = () => {
    console.log("Dislike >:=<");
    setDislike(false);
  };

  return (
    <div>
      <Avatar>
        <AvatarImage src="https://unavatar.io/" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span />
      <span>Hace x minutos</span>
    </div>
  );
}
