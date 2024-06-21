import React, { useState } from 'react';

const SubwaySearch = ({subwayData, selectedLine ,setSelectedLine}) => {
  const [stationQuery, setStationQuery] = useState(''); // 사용자가 입력한 역 이름
  const [foundLine, setFoundLine] = useState(null); // 검색된 노선 정보
  const [stationName, setStationName] = useState(); // 검색된 역 정보
  // 지하철 역 정보
  const [data, setData] = useState(subwayData);
  
  // 역 검색
  const searchStation = () => {
    const found = data.find(line => line.stations.find(e => 
      e.name === stationQuery
    ))
    if (found) {
      setStationName(stationQuery);
      setFoundLine(found);
      setSelectedLine(found.name);
    } else {
      setFoundLine(null);
      setStationName(null);
    }
  };

  return (
    <div className='SubwaySearch'>
      <h2>지하철 역 검색</h2>
      <input
        type="text"
        value={stationQuery}
        onChange={(e) => setStationQuery(e.target.value)}
        placeholder="지하철 역을 입력하세요"
      />
      <button onClick={searchStation}>검색</button>

      {foundLine ? (
        <div>
          <h3>{stationName}</h3>
          <p><strong>노선:</strong> {foundLine.name}</p>
        </div>
      ) : (
        <><h3><br/></h3><p>검색된 역이 없습니다.</p></>
      )}
    </div>
  );
};

export default SubwaySearch;