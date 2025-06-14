import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config/config";
import image from "../images/login_imag_2-removebg-preview.png";

export function Sharecontent() {
  const { sharelink } = useParams();
  const [username, setusername] = useState("");
  const [content, setcontent] = useState<any[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchshare() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${sharelink}`);
        setusername(response.data?.username);
        setcontent(response.data?.content);
      } catch (err) {
        console.log(String(err));
      } finally {
        setloading(false);
      }
    }

    fetchshare();
  }, [sharelink]);

  function extractYoutubeId(url: string) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  if (loading) return <p className="min-h-screen text-bold text-3xl flex items-center justify-center` text-white">Loading ...</p>;

  return (
  <div className="min-h-screen bg-black text-white px-6 py-10">
    <h1 className="text-4xl md:text-7xl font-bold mb-4 text-center">📤 Second Brain</h1>
    <p className="text-xl text-gray-300 mb-8">Shared by: <span className="text-blue-400">{username}</span></p>

    {content.length === 0 ? (
      <div className="text-center flex flex-col items-center justify-center text-gray-500 text-2xl mt-10">
        <p>Nothing to see here</p>
        <img src={image} alt="" />
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item: any) => {
          let imageUrl = "";

          if (item.type === "youtube") {
            const videoId = extractYoutubeId(item.link);
            imageUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }

          return (
            <div key={item._id} className="bg-shadBlack-700 p-4 rounded-lg shadow-md">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="rounded-md w-full max-h-64 object-cover mb-3"
                />
              )}
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400 capitalize mb-2">{item.type}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                Visit Link
              </a>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

}
