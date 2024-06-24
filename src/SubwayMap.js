import React, { useEffect, useState, useMemo, useContext } from 'react';
import {AppContext} from './App';

const SubwayMap = ({ subwayData }) => {
  const { selectedLine, setSelectedLine } = useContext(AppContext);
  const [selectedLineData, setSelectedLineData] = useState({ stations: [] });


  // 선택된 노선 정보 가져오기
  //const selectedLineData = subwayData.find(line => line.name === selectedLine) || { stations: [] };
  useEffect(() => {
    const line = subwayData.find(line => line.name === selectedLine);
    setSelectedLineData(line || { stations: [] });
  }, [selectedLine, subwayData]);

  const positionX = 175;
  const positionY = 50;
  const diffY = 75;

  const handleLineClick = (lineId) => {
    setSelectedLine(lineId);
  };


  // SVG 요소 공통 속성
  const svgAttrs = useMemo(() => ({
    width: 350,
    height: selectedLineData.stations.length * diffY,
    style: { border: selectedLine !== null ? '1px solid #ccc' : {} }
  }), [selectedLine, selectedLineData.stations.length, diffY]);

  // 노선과 역 표시 함수
  const renderSubwayMap = () => {
    if (!selectedLineData) return null;

    return (
      <svg {...svgAttrs}>
        {/* 선택된 노선 경로 그리기 */}
        <g key={selectedLineData.name}>
          {selectedLineData.stations.map((station, index) => (
            index < selectedLineData.stations.length - 1 && (
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
        {/* 노선 위에 역 표시하기 */}
        <g key={`${selectedLineData.name}-station`}>
          {selectedLineData.stations.map((station, index) => (
            <g key={station.id}>
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
        {renderSubwayMap()}
      </div>
    </div>
  );
};

export default (SubwayMap);