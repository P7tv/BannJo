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
    groupName: (groupData as Record<string, string>)[group] || `บ้าน ${group}`,
    qrImage: `/images/openchat/${group}.png`,
    openChatUrl: "#"
  };

  return (
    <div className={`w-full max-w-sm mx-auto my-6 p-6 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-amber-400/40 shadow-2xl text-white text-center transition-all duration-500 hover:scale-[1.02] ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-center space-x-2 mb-3">
        <span className="text-xl">💬</span>
        <h3 className="text-lg font-bold text-amber-300 drop-shadow">
          เข้าร่วม OpenChat กลุ่มบ้าน
        </h3>
      </div>

      <p className="text-sm text-slate-300 mb-4">
        สแกน QR Code หรือกดปุ่มด้านล่างเพื่อเข้ากลุ่ม LINE OpenChat <br />
        <span className="font-semibold text-amber-400">{info.groupName}</span>
      </p>

      {/* QR Code Container */}
      <div className="relative w-48 h-48 mx-auto mb-4 bg-slate-950/90 p-3 rounded-xl shadow-inner flex items-center justify-center border-2 border-amber-400/50">
        {!imgError ? (
          <Image
            src={info.qrImage}
            alt={`QR Code OpenChat ${info.groupName}`}
            width={180}
            height={180}
            className="object-contain rounded-lg"
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-amber-300 text-xs p-2 space-y-1 text-center">
            <span className="text-3xl">📱</span>
            <p className="font-bold text-sm text-white">LINE OpenChat</p>
            <p className="font-semibold text-amber-400">บ้าน {group}</p>
            <p className="text-[10px] text-slate-400 pt-0.5">
              (โปรดวางรูป QR ที่ /images/openchat/{group}.png)
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      {info.openChatUrl && info.openChatUrl !== "#" && (
        <a
          href={info.openChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 transition-all shadow-lg text-sm"
        >
          กดที่นี่เพื่อเข้ากลุ่ม OpenChat
        </a>
      )}
    </div>
  );
}
