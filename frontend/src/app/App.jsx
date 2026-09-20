import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const dummyUrls = [
  {
    _id: "1",
    originalUrl:
      "https://www.amazon.in/JBL-Wireless-Portable-Bluetooth-Speaker/dp/B0CX5C6WP3/ref=sr_1_11?_encoding=UTF8&content-id=amzn1.sym.708cdee1-bd47-42ef-bbd0-e6eca72d3af7&dib=eyJ2IjoiMSJ9.9rbN2OdyDJHT1hsYKkrZkrw5TzffZlPwx4HEWaeQLejuK-srSpj3Gsf_illpfBq8M76igqik5aJ6ePn08OHiY3dFMz1tO-fDqA05hCHSlpyWy0F7GiCN1HchWJ9Qv0F915u5U_LIu3JRchRDYYvspsCAE1yXpVVBtmJwA7DnVNMnMDysQukoEqMpjlH_lV3L-MExpQs08vAN7M8roEGXCV-dti-4XMZ58wveCp2B4utfhW1vE9LaB34qjFQZzJ1YWJc5eGyFfwr2sYV-8f-0eY9NzIu2eb2PEI6JXGAADoQ.BW4WpZLFjFfQTKq4ImEbImJGmxL9qoQO1a_PZ3I66Gg&dib_tag=se&pd_rd_r=fb9c579c-65e1-48ec-860e-b9458b57ac08&pd_rd_w=WYAQw&pd_rd_wg=7Bhr1&qid=1789929406&refinements=p_72%3A1318476031%2Cp_123%3A214020%7C233043%7C237204%7C336393%7C396324%7C415162&s=electronics&sr=1-11",
    shortCode: "ABC123",
    clicks: 3,
  },
  {
    _id: "2",
    originalUrl:
      "https://www.amazon.in/JBL-Wireless-Portable-Bluetooth-Speaker/dp/B0CX5C6WP3/ref=sr_1_11?_encoding=UTF8&content-id=amzn1.sym.708cdee1-bd47-42ef-bbd0-e6eca72d3af7&dib=eyJ2IjoiMSJ9.9rbN2OdyDJHT1hsYKkrZkrw5TzffZlPwx4HEWaeQLejuK-srSpj3Gsf_illpfBq8M76igqik5aJ6ePn08OHiY3dFMz1tO-fDqA05hCHSlpyWy0F7GiCN1HchWJ9Qv0F915u5U_LIu3JRchRDYYvspsCAE1yXpVVBtmJwA7DnVNMnMDysQukoEqMpjlH_lV3L-MExpQs08vAN7M8roEGXCV-dti-4XMZ58wveCp2B4utfhW1vE9LaB34qjFQZzJ1YWJc5eGyFfwr2sYV-8f-0eY9NzIu2eb2PEI6JXGAADoQ.BW4WpZLFjFfQTKq4ImEbImJGmxL9qoQO1a_PZ3I66Gg&dib_tag=se&pd_rd_r=fb9c579c-65e1-48ec-860e-b9458b57ac08&pd_rd_w=WYAQw&pd_rd_wg=7Bhr1&qid=1789929406&refinements=p_72%3A1318476031%2Cp_123%3A214020%7C233043%7C237204%7C336393%7C396324%7C415162&s=electronics&sr=1-11",
    shortCode: "DEF456",
    clicks: 5,
  },
  {
    _id: "3",
    originalUrl:
      "https://www.amazon.in/JBL-Wireless-Portable-Bluetooth-Speaker/dp/B0CX5C6WP3/ref=sr_1_11?_encoding=UTF8&content-id=amzn1.sym.708cdee1-bd47-42ef-bbd0-e6eca72d3af7&dib=eyJ2IjoiMSJ9.9rbN2OdyDJHT1hsYKkrZkrw5TzffZlPwx4HEWaeQLejuK-srSpj3Gsf_illpfBq8M76igqik5aJ6ePn08OHiY3dFMz1tO-fDqA05hCHSlpyWy0F7GiCN1HchWJ9Qv0F915u5U_LIu3JRchRDYYvspsCAE1yXpVVBtmJwA7DnVNMnMDysQukoEqMpjlH_lV3L-MExpQs08vAN7M8roEGXCV-dti-4XMZ58wveCp2B4utfhW1vE9LaB34qjFQZzJ1YWJc5eGyFfwr2sYV-8f-0eY9NzIu2eb2PEI6JXGAADoQ.BW4WpZLFjFfQTKq4ImEbImJGmxL9qoQO1a_PZ3I66Gg&dib_tag=se&pd_rd_r=fb9c579c-65e1-48ec-860e-b9458b57ac08&pd_rd_w=WYAQw&pd_rd_wg=7Bhr1&qid=1789929406&refinements=p_72%3A1318476031%2Cp_123%3A214020%7C233043%7C237204%7C336393%7C396324%7C415162&s=electronics&sr=1-11",
    shortCode: "GHI789",
    clicks: 2,
  },
];

const App = () => {
  const [urls, setUrls] = useState(dummyUrls);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);

  async function fetchUrls() {
    const response = await axios.get("http://localhost:5173/api/url");
    const responseData = response.data;

    setUrls(responseData.data.urls);
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <main className="p-10 flex flex-col gap-4">
      <div className="w-full max-w-4xl p-2"></div>
      <div className="w-full max-w-4xl p-2"></div>
      <div className="w-full max-w-4xl p-2">
        {urls.map((url) => {
          return (
            <div className="border border-neutral-200 p-2 flex gap-4 justify-evenly items-center">
              <a
                href={`http://localhost:3000/${url.shortCode}`}
                target="_blank"
              >
                {url.shortCode}
              </a>
              <p className="truncate">{url.originalUrl}</p>
              <p>{url.clicks}</p>
              <div className="flex gap-2">
                <button className="p-2 rounded bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                  COPY
                </button>
                <button className="p-2 rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer">
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default App;
