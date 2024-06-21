
import { useEffect, useRef, useState } from 'react';
import './App.css';
import SubwayMap from './SubwayMap';
import SubwaySearch from './SubwaySearch';

function App() {
  // const mapElement = useRef(null);
  // const { naver } = window;

  // useEffect(() => {
  //   if (!mapElement.current || !naver) return;

  //   // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣기
  //   const location = new naver.maps.LatLng(37.5656, 126.9769);
  //   const mapOptions = {
  //     center: location,
  //     zoom: 15,
  //     zoomControl: true,
  //   };

  //   const map = new naver.maps.Map(mapElement.current, mapOptions);
  //   new naver.maps.Marker({
  //     position: location,
  //     map,
  //   });
  // }, []);
  const [data, setData] = useState();
  const dummyData = [
    {
      id: 'line1',
      name: '1호선',
      color: '#003da5',
      stations: [
        { id: 'station1', name: '소요산' },
        { id: 'station2', name: '동두천' },
        { id: 'station3', name: '보산' },
        { id: 'station4', name: '도봉산' },
        { id: 'station5', name: '도봉' },
        { id: 'station6', name: '방학' },
        { id: 'station7', name: '창동' },
        { id: 'station8', name: '녹천' },
        { id: 'station9', name: '월계' },
        { id: 'station10', name: '광운대' },
      ]
    },
    {
      id: 'line2',
      name: '2호선',
      color: '#64b046',
      stations: [
        { id: 'station11', name: '시청' },
        { id: 'station12', name: '을지로입구' },
        { id: 'station13', name: '을지로3가' },
        { id: 'station14', name: '을지로4가' },
        { id: 'station15', name: '동대문역사문화공원' },
        { id: 'station16', name: '신당' },
        { id: 'station17', name: '상왕십리' },
        { id: 'station18', name: '왕십리' },
        { id: 'station19', name: '한양대' },
        { id: 'station20', name: '뚝섬' },
        { id: 'station21', name: '성수' },
        { id: 'station22', name: '건대입구' },
        { id: 'station23', name: '구의' },
        { id: 'station24', name: '강변' },
      ]
    },
    {
      id: 'line3',
      name: '3호선',
      color: '#f26522',
      stations: [
        { id: 'station25', name: '대화' },
        { id: 'station26', name: '주엽' },
        { id: 'station27', name: '정발산' },
        { id: 'station28', name: '마두' },
        { id: 'station29', name: '백석' },
        { id: 'station30', name: '대곡' },
        { id: 'station31', name: '화정' },
        { id: 'station32', name: '원당' },
        { id: 'station33', name: '원흥' },
        { id: 'station34', name: '삼송' },
        { id: 'station35', name: '지축' },
        { id: 'station36', name: '구파발' },
        { id: 'station37', name: '연신내' },
        { id: 'station38', name: '불광' },
      ]
    },
    {
      id: 'line4',
      name: '4호선',
      color: '#8b50a4',
      stations: [
        { id: 'station39', name: '오이도' },
        { id: 'station40', name: '영종' },
        { id: 'station41', name: '인천공항' },
        { id: 'station42', name: '공항화물청사' },
        { id: 'station43', name: '운서' },
        { id: 'station44', name: '청라국제도시' },
        { id: 'station45', name: '검암' },
      ]
    },
    {
      id: 'line5',
      name: '5호선',
      color: '#a3c729',
      stations: [
        { id: 'station46', name: '방화' },
        { id: 'station47', name: '개화산' },
        { id: 'station48', name: '김포공항' },
        { id: 'station49', name: '송정' },
        { id: 'station50', name: '마곡' },
        { id: 'station51', name: '발산' },
        { id: 'station52', name: '우장산' },
        { id: 'station53', name: '화곡' },
        { id: 'station54', name: '까치산' },
      ]
    },
    {
      id: 'gyeongui',
      name: '경의중앙선',
      color: '#6cadce',
      stations: [
        { id: 'station55', name: '서울역' },
        { id: 'station56', name: '신촌' },
        { id: 'station57', name: '홍대입구' },
        { id: 'station58', name: '가좌' },
        { id: 'station59', name: '디지털미디어시티' },
        { id: 'station60', name: '수색' },
        { id: 'station61', name: '화전' },
        { id: 'station62', name: '강매' },
        { id: 'station63', name: '행신' },
        { id: 'station64', name: '무악재' },
        { id: 'station65', name: '연서울' },
        { id: 'station66', name: '응봉' },
      ]
    },
    {
      id: 'gyeongchun',
      name: '경춘선',
      color: '#1db7b5',
      stations: [
        { id: 'station67', name: '광운대' },
        { id: 'station68', name: '상봉' },
        { id: 'station69', name: '망우' },
        { id: 'station70', name: '신내' },
        { id: 'station71', name: '갈매' },
        { id: 'station72', name: '별내' },
        { id: 'station73', name: '퇴계원' },
        { id: 'station74', name: '사릉' },
        { id: 'station75', name: '금곡' },
        { id: 'station76', name: '평내호평' },
        { id: 'station77', name: '천마산' },
        { id: 'station78', name: '마석' },
        { id: 'station79', name: '대성리' },
        { id: 'station80', name: '청평' },
        { id: 'station81', name: '상천' },
        { id: 'station82', name: '가평' },
        { id: 'station83', name: '굴봉산' },
        { id: 'station84', name: '백양리' },
        { id: 'station85', name: '강촌' },
        { id: 'station86', name: '김유정' },
        { id: 'station87', name: '남춘천' },
      ]
    },
    {
      id: 'airport',
      name: '공항철도',
      color: '#009c9c',
      stations: [
        { id: 'station88', name: '서울역' },
        { id: 'station89', name: '공덕' },
        { id: 'station90', name: '홍대입구' },
        { id: 'station91', name: '디지털미디어시티' },
        { id: 'station92', name: '김포공항' },
        { id: 'station93', name: '계양' },
        { id: 'station94', name: '검암' },
        { id: 'station95', name: '청라국제도시' },
        { id: 'station96', name: '운서' },
        { id: 'station97', name: '철산' },
        { id: 'station98', name: '강서구청' },
        { id: 'station99', name: '마곡나루' },
        { id: 'station100', name: '김포한강신도시' },
        { id: 'station101', name: '장기주차장' },
        { id: 'station102', name: '양촌' },
        { id: 'station103', name: '구래' },
        { id: 'station104', name: '마산' },
        { id: 'station105', name: '대야미' },
        { id: 'station106', name: '발산' },
        { id: 'station107', name: '우장산' },
      ]
    },
    {
      id: 'sinbundang',
      name: '신분당선',
      color: '#d6006e',
      stations: [
        { id: 'station108', name: '강남' },
        { id: 'station109', name: '양재' },
        { id: 'station110', name: '양재시민의숲' },
        { id: 'station111', name: '청계산입구' },
        { id: 'station112', name: '판교' },
        { id: 'station113', name: '정자' },
        { id: 'station114', name: '동천' },
        { id: 'station115', name: '수지구청' },
        { id: 'station116', name: '성복' },
        { id: 'station117', name: '상현' },
        { id: 'station118', name: '광교중앙' },
        { id: 'station119', name: '광교' },
      ]
    }
    // 필요에 따라 추가 노선 및 역 정보를 계속해서 추가할 수 있습니다.
  ];
  const [selectedLine, setSelectedLine] = useState(null);

  return (
    <>
      <h1>Subway - Default</h1>
      <SubwaySearch subwayData={dummyData} selectedLine={selectedLine} setSelectedLine={setSelectedLine}/>
      <SubwayMap subwayData={dummyData} selectedLine={selectedLine} setSelectedLine={setSelectedLine}/>
      {/* <div ref={mapElement} style={{ minHeight: '85vh' }} /> */}
    </>
  );

}

export default App;
