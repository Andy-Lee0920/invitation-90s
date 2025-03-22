"use client";
import MusicPlayer from "@/public/components/MusicPlayer";
import Image from "next/image";
import Link from "next/link";
import Gallery from "./components/Gallery";
import ShareButtons from "./components/ShareButtons";
import { Toaster } from "react-hot-toast";
import NaverMap from "./components/NaverMap";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMapLoaded, setIsMapLoaded] = useState(true);

  useEffect(() => {
    // NaverMap 컴포넌트가 정상적으로 로드되었는지 확인
    const checkMapLoaded = setTimeout(() => {
      if (!window.naver || !window.naver.maps) {
        setIsMapLoaded(false); // 네이버 지도 API가 없으면 이미지 표시
      }
    }, 3000); // 3초 동안 지도 로드를 기다림

    return () => clearTimeout(checkMapLoaded);
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-white text-gray-800">
        {/* 1. 상단 메인 사진 (Hero Section) */}
        <section className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center">
          <Image
            src="/image/basic/main.png"
            alt="메인 이미지"
            fill
            className="object-cover object-center"
            priority
          />

          {/* MusicPlayer를 화면 최좌측 상단에 고정 */}
          <div className="fixed top-0 left-0 z-50 p-6">
            <MusicPlayer />
          </div>

          {/* 사진 위에 반투명 오버레이와 문구 */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-end pb-20 text-white px-4">
            <p className="text-3xl mb-2 font-semibold">정효숙님 구순 잔치에</p>
            <br />
            <p className="text-3xl mb-2 font-semibold">가족분들을 초대합니다</p>
          </div>
        </section>

        <section className="px-4 py-14 text-center">
          {" "}
          <div className="flex items-center justify-center mb-5">
            <div className="w-1/4 border-t border-deep-green opacity-30"></div>
            <span className="mx-3 text-gray-500">초대장</span>
            <div className="w-1/4 border-t border-deep-green opacity-30"></div>
          </div>
          <div className="relative w-full h-16 ">
            <Image
              src="/image/basic/name.png"
              alt="이름 가운데"
              fill
              priority
              className="object-contain object-center"
            />
          </div>
        </section>

        <section className="text-center pb-8">
          <p className="text-lg leading-relaxed">
            사랑하는 어머님의 아흔번째 생신을
            <br />
            축하드리는 자리에 귀한 분들을
            <br />
            모시고자 합니다.
            <br />
            <br />
            어머님의 삶은 저희들의 <br />큰 축복이자 자랑입니다.
            <br />
            긴 세월 동안 저희들에게 베풀어주신
            <br />
            사랑과 헌신에 깊은 감사를 드립니다.
            <br />
            <br />
            어머님의 삶의 지혜와 <br />
            따뜻한 마음을 기억하며
            <br />
            함께 축복하고 기쁨을 <br />
            나누는 자리에 함께해 주세요.
            <br />
          </p>
          <br />
          <br />
          <p className="text-lg leading-relaxed">
            <span className="text-sm">음력</span>
            <br />
            <span className="font-bold">1936년 3월 8일</span>
            <br />
            <span className="font-bold">정효숙</span>
            <br />
          </p>
        </section>

        {/* 4. 갤러리 (좌우로 스크롤 가능한 이미지 슬라이드) */}
        <section className="px-4">
          <Gallery />
        </section>

        <div className="flex items-center justify-center mb-10">
          <div className="w-1/4 border-t border-deep-green opacity-30"></div>
          <span className="mx-3 text-gray-500">MEETING DAY</span>
          <div className="w-1/4 border-t border-deep-green opacity-30"></div>
        </div>
        {/* 시간/장소 안내 */}
        <div className="text-center pb-8">
          <p className="mt-4 text-base font-semibold ">
            2025년 4월 5일 오후 12시
          </p>
          <p className="mt-4 text-sm">Saturday, April 5, 2025, 12:00 PM</p>
        </div>
        {/* 달력 컨테이너 */}
        <div className="inline-block rounded-md p-10">
          <h3 className="text-xl font-semibold mb-3 text-center">4월</h3>

          {/* 요일 */}
          <div className="grid grid-cols-7 gap-2 text-base text-center">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
              <div
                key={i}
                className={`flex items-center justify-center font-semibold h-10 w-10 ${
                  i === 0 ? "text-red-500" : "text-gray-600"
                }`}
              >
                {day}
              </div>
            ))}

            {/* 빈 칸 (월요일 시작을 맞추기 위해) */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 w-10"></div>
            ))}

            {/* 날짜 출력 */}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const isHighlighted = day === 5;
              const isSunday = (i + 2) % 7 === 0;
              return (
                <div
                  key={day}
                  className={`flex items-center justify-center h-10 w-10 rounded-full text-lg font-medium ${
                    isHighlighted
                      ? "bg-amber-500 text-white font-bold"
                      : isSunday
                      ? "text-red-500"
                      : "text-gray-800"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. 추가 정보 섹션 (INFORMATION) */}
        <section className="px-4 pt-20 pb-10 text-center">
          <div className="flex items-center justify-center mb-5">
            <div className="w-1/4 border-t border-deep-green opacity-30"></div>
            <span className="mx-3 text-gray-500">MENU</span>
            <div className="w-1/4 border-t border-deep-green opacity-30"></div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">전통구이 상차림</h1>
          <h6 className="text-sm text-gray-400">HANLIKWAN YONG COURESE</h6>
          <p className="text-gray-600 flex items-center justify-center gap-2 mt-5">
            계절죽
            <br />
            차돌박이구이와 항채무침
            <br />
            해물파전
            <br />
            양념꽃게무침
            <br />
            등심불고기 or 전통갈비구이
            <br />
            식사
            <br />
            후식
            <br />
          </p>
        </section>

        <section className="bg-white py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            {/* 위치 섹션 제목 */}
            <div className="flex items-center mb-8">
              <div className="flex-grow border-t border-deep-green opacity-30"></div>
              <span className="mx-3 text-gray-500">LOCATION</span>
              <div className="flex-grow border-t border-deep-green opacity-30"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              한일관 압구정점
            </h1>
            <p className="text-gray-600 flex items-center justify-center gap-2 mt-2">
              서울특별시 강남구 압구정로38길 14
            </p>
          </div>

          {/* 지도 이미지 (네이버 지도 캡처 또는 iframe) */}
          <div className="mt-10 mb-10 px-5">
            {isMapLoaded ? (
              <NaverMap />
            ) : (
              <Image
                src="/image/basic/map-image.png"
                alt="위치 지도"
                width={600}
                height={400}
                className="mx-auto rounded-lg"
              />
            )}
          </div>

          {/* 네이버 지도 & 카카오 지도 링크 */}
          <div className="flex justify-center gap-6 mt-7">
            <Link
              href="https://map.naver.com/v5/search/한일관 압구정점"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md"
            >
              <img
                src="/image/logo/naverMap.png"
                alt="네이버 지도 아이콘"
                className="w-6 h-6"
              />
              네이버지도
            </Link>
            <Link
              href="https://map.kakao.com/link/search/한일관 압구정점"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md"
            >
              <img
                src="/image/logo/kakaoMap.png"
                alt="카카오맵 아이콘"
                className="w-6 h-6"
              />
              카카오맵
            </Link>
          </div>
          {/* 교통 안내 */}
          <div className="max-w-2xl mx-auto mt-10 text-gray-700">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              교통 안내
            </h2>
            <p className="font-medium text-gray-800">지하철</p>
            <ul className="list-disc ml-6 text-sm mt-1">
              <li>3호선, 압구정역 2번 출구에서 도보 10분</li>
              <li>버스 이용시, 현대아파트 정류소 이용</li>
            </ul>

            <p className="font-medium text-gray-800 mt-4">자가용</p>
            <ul className="list-disc ml-6 text-sm mt-1">
              <li>동호대교 또는 성수대교 이용</li>
              <li>올림픽대로 이용</li>
            </ul>
          </div>

          {/* 주차 안내 */}
          <div className="max-w-2xl mx-auto mt-8 text-gray-700">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              주차 안내
            </h2>
            <ul className="list-disc ml-6 text-sm mt-1">
              <li>넓은 식당 건물 주차장 이용 가능</li>
              <li>발렛비 3000원</li>
            </ul>
          </div>
          <main className="mt-15">
            {/* 공유 버튼 추가 */}
            <ShareButtons />

            {/* Toast 팝업 표시 */}
            <Toaster position="top-center" reverseOrder={false} />
          </main>
        </section>
      </div>
    </>
  );
}
