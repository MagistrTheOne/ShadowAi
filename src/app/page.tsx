"use client"
import { authClient } from "@/lib/auth-client"; //import the auth client
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [email,setEmail] = useState("")
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const onSubmit = () =>{
    authClient.signUp.email({
      email,
      name,
      password,
    },
    {
      onError: () => { 
        window.alert("Something went wrong")
      },
      onSuccess: () => {
        window.alert("Succes!")
      }


    })
  } 


  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="name" 
      value={name} 
      onChange={(e) => 
      setName(e.target.value)}/>
      <Input placeholder="email"
      value={email} onChange={(e) => 
      setEmail(e.target.value)}/>
      <Input placeholder="password" 
      type ="password"
      value={password} 
      onChange={(e) => 
      setPassword(e.target.value)}/>
      <Button onClick={onSubmit}>
        Create Account
      </Button>
    </div>
  );
}
