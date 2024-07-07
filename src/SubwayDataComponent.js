import React, { useState, useEffect } from 'react';

const SubwayDataComponent = () => {
  const [subwayData, setSubwayData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.37.98.203:8090/api/v1/subway/station/구리', {

        });
        if (!response.ok) {
          throw new Error('서버에서 데이터를 가져오지 못했습니다.');
        }
        const data = await response.json();
        setSubwayData(data);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    !subwayData ? <div>테스트 데이터를 불러오는 중...</div> :
      <div>
        <h3>지하철 실시간 구리역 도착 정보</h3>
        <ul>
          <li>지하철 1</li>
          <li>목적지 메시지 1: {subwayData[0].dstMessage1}</li>
          <li>목적지 메시지 2: {subwayData[0].dstMessage2}</li>
          <li>목적지 메시지 3: {subwayData[0].dstMessage3 || '없음'}</li>
          <li>도착역: {subwayData[0].dstStation}</li>
          <li>도착시간: {subwayData[0].dstTime} 분</li>
          <li>이전 ID: {subwayData[0].prevId}</li>
          <li>역 ID: {subwayData[0].statnId}</li>
          <li>지하철 노선: {subwayData[0].subwayLine}</li>
          <li>열차 상태: {subwayData[0].trainStatus}</li>
          <li>상하행: {subwayData[0].updnLine}</li>
        </ul>
        <ul>
          <li>지하철 2</li>
          <li>목적지 메시지 1: {subwayData[1].dstMessage1}</li>
          <li>목적지 메시지 2: {subwayData[1].dstMessage2}</li>
          <li>목적지 메시지 3: {subwayData[1].dstMessage3 || '없음'}</li>
          <li>도착역: {subwayData[1].dstStation}</li>
          <li>도착시간: {subwayData[1].dstTime} 분</li>
          <li>이전 ID: {subwayData[1].prevId}</li>
          <li>역 ID: {subwayData[1].statnId}</li>
          <li>지하철 노선: {subwayData[1].subwayLine}</li>
          <li>열차 상태: {subwayData[1].trainStatus}</li>
          <li>상하행: {subwayData[1].updnLine}</li>
        </ul>
        <ul>
          <li>지하철 3</li>
          <li>목적지 메시지 1: {subwayData[2].dstMessage1}</li>
          <li>목적지 메시지 2: {subwayData[2].dstMessage2}</li>
          <li>목적지 메시지 3: {subwayData[2].dstMessage3 || '없음'}</li>
          <li>도착역: {subwayData[2].dstStation}</li>
          <li>도착시간: {subwayData[2].dstTime} 분</li>
          <li>이전 ID: {subwayData[2].prevId}</li>
          <li>역 ID: {subwayData[2].statnId}</li>
          <li>지하철 노선: {subwayData[2].subwayLine}</li>
          <li>열차 상태: {subwayData[2].trainStatus}</li>
          <li>상하행: {subwayData[2].updnLine}</li>
        </ul>
      </div>
  );
};

export default SubwayDataComponent;