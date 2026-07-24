"use client";

import React, { useState } from "react";
import Image from "next/image";
import openChatData from "../../constants/openchat.json";
import groupData from "../../constants/group.json";

interface HouseOpenChatQRProps {
  group: string; // e.g. "WQN"
  className?: string;
}

export default function HouseOpenChatQR({ group, className = "" }: HouseOpenChatQRProps) {
  const [imgError, setImgError] = useState(false);
  const info = (openChatData as Record<string, { groupName: string; qrImage: string; openChatUrl: string }>)[group] || {
    groupName: "BannJo",
    qrImage: "/images/openchat/openchat.webp",
    openChatUrl: "https://line.me/ti/g2/vHobIDWdrT6LPjo3a9cKIVhCi01BPgjDsR3Gjw?utm_source=invitation&utm_medium=QR_code&utm_campaign=default"
  };

  const qrSrc = !imgError ? info.qrImage : "/images/openchat/openchat.webp";

  return (
    <div className={`w-full max-w-xs mx-auto my-4 flex flex-col items-center text-center ${className}`}>
      {/* Polaroid Frame */}
      <div className="relative w-full bg-stone-100/95 text-stone-900 p-4 pb-5 rounded-md shadow-2xl border border-stone-300 transform -rotate-1 hover:rotate-0 transition-all duration-300">
        {/* Red Push Pin Decor */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl drop-shadow">
          📌
        </div>

        {/* Header Title inside Polaroid */}
        <div className="mt-1 mb-3">
          <h3 className="text-base font-extrabold text-stone-900 tracking-tight">
            LINE OpenChat <span className="text-red-700">BannJo</span>
          </h3>
          <p className="text-xs text-stone-600 font-medium">
            สแกนเพื่อเข้าร่วมกลุ่มหลัก BannJo
          </p>
        </div>

        {/* QR Code Frame */}
        <a 
          href={info.openChatUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-44 h-44 mx-auto mb-3 bg-white p-2 shadow-inner border border-stone-300 flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          title="กดเพื่อเปิดลิงก์ LINE OpenChat BannJo"
        >
          <Image
            src={qrSrc}
            alt="QR Code OpenChat BannJo"
            width={160}
            height={160}
            className="object-contain"
            onError={() => setImgError(true)}
            priority
          />
        </a>

        {/* Action Button */}
        {info.openChatUrl && (
          <a
            href={info.openChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-2 rounded font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all shadow text-xs border border-amber-500"
          >
            💬 กดที่นี่เพื่อเข้ากลุ่ม OpenChat BannJo
          </a>
        )}
      </div>
    </div>
  );
}
