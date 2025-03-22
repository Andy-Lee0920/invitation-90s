"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ShareButtons() {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  // 카카오 SDK 로드
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = () => {
        if (window.Kakao) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY as string);
          setIsKakaoLoaded(true); // 카카오 SDK가 로드되었으면 상태 변경
        }
      };
      document.body.appendChild(script);
    } else if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY as string);
      setIsKakaoLoaded(true);
    }
  }, []);

  // 현재 페이지 URL 복사
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("주소가 복사되었습니다!");
    } catch (_err) {
      toast.error("주소 복사에 실패했습니다." + _err);
    }
  };

  // PC와 모바일 구분
  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  // 카카오톡 공유하기
  const shareToKakao = () => {
    if (!window.Kakao || !isKakaoLoaded) {
      toast.error("카카오톡 공유를 사용할 수 없습니다.");
      return;
    }

    if (!isMobile()) {
      // PC에서는 카카오톡 공유 웹페이지로 이동
      const kakaoWebShareUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=${
        process.env.NEXT_PUBLIC_KAKAO_API_KEY
      }&linkver=4.0&url=${encodeURIComponent(window.location.href)}`;
      window.open(kakaoWebShareUrl, "_blank");
      return;
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "정효숙님의 졸수연",
        description: "특별한 날에 가족분들을 초대합니다! 🎉",
        imageUrl: `${window.location.origin}/image/basic/main.png`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttonTitle: "초대장 보기",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 주소 복사 버튼 */}
      <button
        onClick={copyToClipboard}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 w-full flex justify-between items-center"
      >
        <span className="text-left">📄 초대장 주소 복사하기</span>
      </button>

      {/* 카카오톡 공유 버튼 */}
      <button
        onClick={shareToKakao}
        className="text-left px-4 py-2 rounded-lg w-full flex gap-2"
        style={{ backgroundColor: "#FDE601" }}
        disabled={!isKakaoLoaded}
      >
        <img
          src="/image/logo/kakaoLogo.png"
          alt="카카오톡 아이콘"
          className="w-6 h-6"
        />
        <span>카카오톡으로 공유하기</span>
      </button>
    </div>
  );
}
