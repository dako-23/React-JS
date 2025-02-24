import React from "react";

const Description = () => {
  return (
    <>
      <div className="bg-page-pattern flex items-center justify-center my-8">
        <div className="h-[2px] w-80 bg-gray-800"></div>
        <img
          src="/logo.png"
          alt="Logo"
          className="mx-4 h-20"
        />
        <div className="h-[2px] w-80 bg-gray-800"></div>
      </div>
      <div className="bg-page-pattern w-full flex justify-between items-center px-6 py-4 bg-home-blur bg-opacity-40 backdrop-blur-md z-10">
        <div className="grid md:grid-cols-2 mx-auto max-h-[1240px]">
          <img src="/momma's-gang-descr.webp" alt="/" className="my-4 mx-auto w-[500px]" />
          <div className="justify-center flex flex-col">
            <h1 className="font-bold text-gray-800 md:text-4xl sm:text-3xl text-2xl py-2">
            A Community That Understands You
            </h1>
            <p className="text-gray-800">
              Momma's Gang is a vibrant social networking platform designed exclusively for mothers.
              It offers a safe and engaging space where moms can connect, share their experiences, and support one another throughout their journey of motherhood.
              With personalized profiles, community groups, event management tools, and photo-sharing features,
              Momma's Gang empowers mothers to build lasting friendships and find encouragement during both the joyful and challenging moments of parenting.
              The platform's modern, intuitive design ensures that users can easily navigate through features such as expert advice, interactive challenges, and local meet-ups.
              Whether you're looking to join a group of like-minded moms, organize a playdate, or simply share your everyday moments, 
              Momma's Gang is here to bring mothers together in a warm, supportive community.
            </p>
            <button className="bg-gray-800 text-white md:mx-0 mx-auto p-2 mt-4 font-medium  w-[150px] rounded-md active:opacity-[0.7]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
