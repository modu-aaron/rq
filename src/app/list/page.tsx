"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const ListPage = () => {
  const [lyrics, setLyrics] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.lyrics.ovh/v1/Charlie Puth/Dangerously"
      );
      setLyrics(response.data.lyrics);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Lyrics</h1>
      {lyrics ? <pre>{lyrics}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ListPage;
