import React, { useState, useEffect } from 'react';

const SubwayDataComponent = () => {
  const [subwayData, setSubwayData] = useState(null);
  const [searchStationName, setStationName] = useState('');
  const [targetStationName, setTargetStationName] = useState()
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const encodedStationName = encodeURIComponent(targetStationName);
      const response = await fetch(`http://3.37.98.203:8090/api/v1/subway/station/${encodedStationName}`);
      if (!response.ok) {
        throw new Error('서버에서 데이터를 가져오지 못했습니다.');
      }
      const data = await response.json();
      setSubwayData(data);
      setLoading(false);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (targetStationName) {
        fetchData();
      }
    }, 5000);
    fetchData();
    return () => clearInterval(interval);
  }, [targetStationName]);

  const handleSearch = (searchStationName) => {
    setTargetStationName(searchStationName);
    fetchData();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchStationName}
          onChange={(e) => setStationName(e.target.value)}
          placeholder="역 이름 입력"
        />
        <button onClick={(e) => {
          handleSearch(searchStationName)
        }}>검색</button>
      </div>
      {loading ? (
        <div>데이터를 불러오는 중...</div>
      ) : (
        <div>
          {subwayData ? (
            <div>
              <h3>{targetStationName}역 실시간 도착 정보</h3>
              {subwayData.map((data, index) => (
                <ul key={index}>
                  <li>지하철 {index + 1}</li>
                  <li>목적지 메시지 1: {data.dstMessage1}</li>
                  <li>목적지 메시지 2: {data.dstMessage2}</li>
                  <li>목적지 메시지 3: {data.dstMessage3 || '없음'}</li>
                  <li>도착역: {data.dstStation}</li>
                  <li>도착시간: {data.dstTime} 분</li>
                  <li>이전 ID: {data.prevId}</li>
                  <li>역 ID: {data.statnId}</li>
                  <li>지하철 노선: {data.subwayLine}</li>
                  <li>열차 상태: {data.trainStatus}</li>
                  <li>상하행: {data.updnLine}</li>
                </ul>
              ))}
            </div>
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubwayDataComponent;
