"use client";

import { Share } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string>("");
  const [ isExistingUser, setIsExistingUser ] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie("auth");
    if (token) {
      setIsExistingUser(true);
    }
    if (token) {
      fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to fetch user info!");
        })
        .then((data) => {
          setProfileImage(data.picture);
        })
        .catch((error) => {
          // deleteCookie("auth");
        });
    }
  }, []);

  const onClick = async () => {
    const response = await fetch('/api/auth', {
      method: 'POST',
    });
    if (!response.ok) {
      return;
    }
    const { url } = await response.json();
    router.replace(url);
    return;
  }

  if (isExistingUser || profileImage.length > 0) {
    return (
      <div>
        <Avatar className="w-[24px] h-[24px]">
          <AvatarImage src={profileImage} />
          <AvatarFallback>
            <Skeleton className="w-[24px] rounded-full" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm" onClick={onClick}>
      Sign in
    </Button>
  );
}
