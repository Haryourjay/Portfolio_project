import { useEffect, useState } from "react";

export default function VideoThumbnail({ url }) {
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    async function getThumbnail() {
      // YouTube
      const ytMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^?&/]+)/
      );

      if (ytMatch) {
        setThumbnail(
          `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`
        );
        return;
      }

      // Vimeo
      const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);

      if (vimeoMatch) {
        const id = vimeoMatch[1];

        const res = await fetch(
          `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`
        );

        const data = await res.json();

        setThumbnail(data.thumbnail_url);
      }
    }

    getThumbnail();
  }, [url]);

  if (!thumbnail) return <p>Loading...</p>;

  return <img src={thumbnail} alt="Video thumbnail" style={{objectFit: "cover"}} />;
}