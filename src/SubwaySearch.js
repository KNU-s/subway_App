import React, { useState } from 'react';

const SubwaySearch = () => {
  const [stationQuery, setStationQuery] = useState(''); // 사용자가 입력한 역 이름
  const [foundStation, setFoundStation] = useState(null); // 검색된 역 정보

  // 정적으로 설정한 지하철 역 정보
  const subwayStations = [
    { name: '강남', lines: ['2호선', '신분당선'] },
    { name: '잠실', lines: ['2호선', '8호선'] },
    { name: '홍대입구', lines: ['2호선', '공항철도'] },
    // 추가 역 정보 필요시 여기에 추가
  ];

  // 역 검색 함수
  const searchStation = () => {
    const found = subwayStations.find(station => station.name === stationQuery);
    if (found) {
      setFoundStation(found);
    } else {
      setFoundStation(null);
    }
  };

  return (
    <div className='SubwaySearch'>
      <h1>지하철 역 검색</h1>
      <input
        type="text"
        value={stationQuery}
        onChange={(e) => setStationQuery(e.target.value)}
        placeholder="지하철 역을 입력하세요"
      />
      <button onClick={searchStation}>검색</button>

      {foundStation ? (
        <div>
          <h2>{foundStation.name}</h2>
          <p><strong>노선:</strong> {foundStation.lines.join(', ')}</p>
        </div>
      ) : (
        <p>검색된 역이 없습니다.</p>
      )}
    </div>
  );
};

export default SubwaySearch;