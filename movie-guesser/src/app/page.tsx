import React, { useState } from "react";
import Game from "./components/Game/Game";

async function retrieveData() {
  try {
    const response = await fetch("http://localhost:3000/getData", {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default async function Home() {
  const newData = await retrieveData();
  const titles = [
    newData.scriptData.title,
    newData.scriptData.title.toLowerCase(),
  ];

  return (
    <main>
      {/* <LoadingScreen /> */}

      <Game
        images={newData.scriptData.images}
        genre={newData.scriptData.genre}
        synopsis={newData.scriptData.synopsis}
        year={newData.scriptData.year}
        title={titles}
      />
    </main>
  );
}
