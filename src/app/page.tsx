"use client"; //
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaUpload } from "react-icons/fa";

export default function Home() {
  const [link, setLink] = useState<string>("");
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [LogoUrl, setLogoUrl] = useState<string>("./logo.png");
  const [Logosize, setLogoSize] = useState<number>(38);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setLogoUrl(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!qrCodeRef.current) return;
    const canvas = qrCodeRef.current.querySelector("canvas");
    if (!canvas) return;
    const Link = document.createElement("a");
    Link.href = canvas.toDataURL("image/png");
    Link.download = "qrcode.png";
    Link.click();
  };

  return (
    <main className="container">
      <section className="title-container">
        <h1 className="page-title">
          Customize <span>Dynamic</span> QR-Codes
        </h1>
      </section>

      <section className="qr-code-container">
        <div className="qr-code">
          <div className="link-input">
            <label htmlFor="link"></label>
            <input
              type="text"
              id="link"
              placeholder={`Type Your URL Here (example: https://yourURL.com)`}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <div className="qr-code-preview">
              <p>QR-CODE Preview</p>
              <div ref={qrCodeRef}>
                <QRCodeCanvas
                  value={link}
                  title={link}
                  size={200}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level={"M"}
                  imageSettings={{
                    src: LogoUrl,
                    x: undefined,
                    y: undefined,
                    height: Logosize,
                    width: Logosize,
                    opacity: 1,
                    excavate: true,
                    crossOrigin: "anonymous",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="customization-container">
          <h3>Customization</h3>

          <div className="input-container colors">
            <div className="input-box">
              <label htmlFor="fgColor">Main Color:</label>
              <input
                type="color"
                id="fgColor"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="bgColor">Background Color:</label>
              <input
                type="color"
                id="bgColor"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>

          <hr />

          <div className="input-container logo-upload">
            <div className="input-box">
              <label htmlFor="logo">Insert Logo</label>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleLogoChange}
                hidden
              />
              <label htmlFor="logo" className="input-file-button">
                <FaUpload />
                Pick File
              </label>
            </div>

            <div className="input-box">
              <label htmlFor="logoSize">Logo Size</label>
              <select
                name="logoSize"
                id="logoSize"
                value={Logosize}
                onChange={(e) => {
                  setLogoSize(Number(e.target.value));
                }}
              >
                <option value="24">24px</option>
                <option value="38">38px</option>
                <option value="50">50px</option>
              </select>
            </div>
          </div>

          <button className="download-button" onClick={handleDownload}>
            Download QR-Code
          </button>
        </div>
      </section>
    </main>
  );
}
