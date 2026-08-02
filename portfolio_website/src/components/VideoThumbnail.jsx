import { useEffect, useState } from "react";
import { getThumbnail } from "../services/thumbnailAPI";

export default function VideoThumbnail({ url }) {
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const imageUrl = getThumbnail();
    setThumbnail(imageUrl)
  }, [url]);

  if (!thumbnail) return <p>Loading...</p>;

  return <img src={thumbnail} alt="Video thumbnail" style={{objectFit: "cover"}} />;
}