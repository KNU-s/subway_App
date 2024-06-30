import React, { useEffect, useState, useMemo, useContext } from 'react';
import { AppContext } from './App';

const SubwayMap = ({ subwayData }) => {
  const { selectedLine, setSelectedLine } = useContext(AppContext);
  const [selectedLineData, setSelectedLineData] = useState({ stations: [] });
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  const [trainPosition, setTrainPosition] = useState({ x: 0, y: 0 }); // 지하철 위치

  useEffect(() => {
    const line = subwayData.find(line => line.name === selectedLine);
    // 노선 변경 시 초기화
    setSelectedLineData(line || { stations: [] });
    setStartStation(null);
    setEndStation(null);
    setTrainPosition({ x: 0, y: 0 }); 
  }, [selectedLine, subwayData]);

  const positionX = 175;
  const positionY = 50;
  const diffY = 75;

  const handleLineClick = (lineId) => {
    setSelectedLine(lineId);
  };

  const handleStartStationSelect = (station) => {
    setStartStation(station);
  };

  const handleEndStationSelect = (station) => {
    setEndStation(station);
  };

  // 노선의 총 길이 계산
  // const totalLineLength = useMemo(() => {
  //   return selectedLineData.stations.length > 1 ? (selectedLineData.stations.length - 1) * diffY : 0;
  // }, [selectedLineData.stations.length, diffY]);

  // 출발역과 도착역 선택에 따라 지하철 위치 계산
  useEffect(() => {
    if (startStation && endStation) {
      const startIdx = selectedLineData.stations.findIndex(station => station.name === startStation);
      const endIdx = selectedLineData.stations.findIndex(station => station.name === endStation);

      const startX = positionX;
      const startY = positionY + startIdx * diffY;
      const endY = positionY + endIdx * diffY;

      const animateTrain = () => {
        let progress = 0;
        const animationInterval = setInterval(() => {
          progress += 0.001; // 지하철 속도 조절

          const currentX = startX;
          const currentY = startY + (endY - startY) * progress;

          setTrainPosition({ x: currentX, y: currentY });

          if (progress >= 1) {
            clearInterval(animationInterval);
          }
        }, 10); // 애니메이션 간격 (ms)

        return () => clearInterval(animationInterval);
      };

      animateTrain();
    }
  }, [startStation, endStation, selectedLineData.stations, positionX, positionY, diffY]);

  const svgAttrs = useMemo(() => ({
    width: 350,
    height: selectedLineData.stations.length * diffY,
    style: { border: selectedLine !== null ? '1px solid #ccc' : {} }
  }), [selectedLine, selectedLineData.stations.length, diffY]);

  const renderSubwayMap = () => {
    if (!selectedLineData) return null;

    return (
      <svg {...svgAttrs}>
        <g key={selectedLineData.name}>
          {selectedLineData.stations.map((station, index) => (
            index < selectedLineData.stations.length - 1 && (
              // 노선
              <line
                key={`${station.id}-${selectedLineData.stations[index + 1].id}`}
                x1={positionX}
                y1={positionY + index * diffY}
                x2={positionX}
                y2={positionY + (index + 1) * diffY}
                stroke={selectedLineData.color}
                strokeWidth="5"
                strokeLinecap="round"
              />
            )
          ))}
        </g>
        <g key={`${selectedLineData.name}-station`}>
          {selectedLineData.stations.map((station, index) => (
            <g key={station.id}>
              {/* 역 */}
              <circle
                cx={positionX}
                cy={positionY + index * diffY}
                r="6"
                fill="#fff"
                stroke={selectedLineData.color}
                strokeWidth="2"
              />
              <text x={positionX + 10} y={positionY + index * diffY - 10} fill="#333" fontSize="15" textAnchor="left">
                {station.name}
              </text>
            </g>
          ))}
        </g>
        {/* 지하철 */}
        {startStation && endStation && (
          <circle
            cx={trainPosition.x}
            cy={trainPosition.y}
            r="6"
            fill={selectedLineData.color}
            stroke="#333"
            strokeWidth="2"
          />
        )}
      </svg>
    );
  };

  return (
    <div className='SubwayMap'>
      <h2>지하철 노선 선택</h2>
      <div className='select-button-navigate' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {subwayData.map(line => (
          <button
            key={line.name}
            style={{
              backgroundColor: selectedLine === line.name ? line.color : '#f0f0f0',
              color: selectedLine === line.name ? 'white' : '#333',
              border: 'none',
              padding: '8px 16px',
              margin: '4px',
              cursor: 'pointer'
            }}
            onClick={() => handleLineClick(line.name)}
          >
            {line.name}
          </button>
        ))}
      </div>
      <div className='subway-map' style={{ marginLeft: '10rem' }}>
        <h3>선택된 노선: {selectedLineData.name || '없음'}</h3>

        {/* 출발역과 도착역 선택 */}
        {selectedLineData.stations.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <label htmlFor="startStation">출발역 선택:</label>
            <select id="startStation" value={startStation} onChange={(e) => handleStartStationSelect(e.target.value)}>
              <option value="">역을 선택하세요</option>
              {selectedLineData.stations.map(station => (
                <option key={station.id} value={station.name}>{station.name}</option>
              ))}
            </select>

            <label htmlFor="endStation" style={{ marginLeft: '1rem' }}>도착역 선택:</label>
            <select id="endStation" value={endStation} onChange={(e) => handleEndStationSelect(e.target.value)}>
              <option value="">역을 선택하세요</option>
              {selectedLineData.stations.map(station => (
                <option key={station.id} value={station.name}>{station.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* 지하철 노선도 SVG 렌더링 */}
        {renderSubwayMap()}
      </div>
    </div>
  );
};

export default SubwayMap;
