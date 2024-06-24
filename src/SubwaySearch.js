import React, { useContext, useState } from 'react';
import {AppContext} from './App';

const SubwaySearch = ({ subwayData }) => {

  const { setSelectedLine } = useContext(AppContext);

  const [stationQuery, setStationQuery] = useState(''); // 사용자가 입력한 역 이름
  const [foundLine, setFoundLine] = useState(null); // 검색된 노선 정보
  const [stationName, setStationName] = useState(); // 검색된 역 정보

  // 지하철 역 정보
  const [data, setData] = useState(subwayData);



  // 역 이름을 통한 노선 검색
  const searchStation = () => {
    const found = data.filter(line =>
      line.stations.find(e => e.name.includes(stationQuery))
    )
    if (found) {
      setStationName(stationQuery);
      setFoundLine(found);
      setSelectedLine(found[0].name);
      
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
        <div className='station-data'>
          <h4>{`"${stationName}"를(을) 포함하는 역 정보`}</h4>
          {foundLine.map(line => {
            let d = `${line.name}: `
            line.stations.map(station => {
              if (station.name.includes(stationName)) {
                d+=(`${station.name} `)
              }
            })
          return <p>{d}</p>;})}
        </div>
      ) : (
        <><h3><br /></h3><p>검색된 역이 없습니다.</p></>
      )}
    </div>
  );
};

export default SubwaySearch;