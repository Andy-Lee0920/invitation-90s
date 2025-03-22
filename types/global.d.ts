export {};

declare global {
  interface Window {
    naver: Naver;
  }

  interface Naver {
    maps: NaverMaps;
  }

  interface NaverMaps {
    Map: new (element: HTMLElement, options: NaverMapOptions) => NaverMap;
    LatLng: new (lat: number, lng: number) => NaverLatLng;
    Marker: new (options: NaverMarkerOptions) => NaverMarker;
  }

  interface NaverMapOptions {
    center: NaverLatLng;
    zoom?: number;
  }

  interface NaverLatLng {
    lat: () => number;
    lng: () => number;
  }

  interface NaverMap {
    setCenter: (latLng: NaverLatLng) => void;
    setZoom: (zoomLevel: number) => void;
  }

  interface NaverMarkerOptions {
    position: NaverLatLng;
    map: NaverMap;
    title?: string;
  }

  interface NaverMarker {
    setMap: (map: NaverMap | null) => void;
  }
}

export {};

declare global {
  interface Window {
    Kakao: Kakao;
  }

  interface Kakao {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Link: {
      sendDefault: (options: KakaoLinkOptions) => void;
    };
  }

  interface KakaoLinkOptions {
    objectType: "feed" | "list" | "commerce" | "location" | "text";
    content: {
      title: string;
      description?: string;
      imageUrl?: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    };
    buttonTitle?: string;
  }
}
