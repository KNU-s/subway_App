import React, { useState, useEffect } from 'react';

const SubwayMap = () => {
  const [trainPosition, setTrainPosition] = useState({
    line: '2호선',
    startStation: '강남',
    endStation: '잠실',
    percentComplete: 0
  });

  const subwayStations = [
    // dummy data
    { name: '강남', lines: ['2호선', '신분당선'], x: 50, y: 100 },
    { name: '역삼', lines: ['2호선', '8호선'], x: 200, y: 100 },
    { name: '선릉', lines: ['2호선', '8호선'], x: 350, y: 100 },
    { name: '종합운동장', lines: ['2호선', '8호선'], x: 500, y: 100 },
    { name: '선천', lines: ['2호선', '8호선'], x: 650, y: 100 },
    { name: '잠실', lines: ['2호선', '8호선'], x: 800, y: 100 },

    { name: '홍대입구', lines: ['2호선', '공항철도'], x: 50, y: 200 },
    // Add more stations
  ];

  useEffect(() => {
    const animationDuration = 5000; // 5 seconds for example
    let startTime = Date.now();

    const animateTrain = () => {
      const elapsedTime = Date.now() - startTime;
      const percentComplete = (elapsedTime / animationDuration) * 100;

      if (percentComplete <= 100) {
        setTrainPosition(prevPosition => ({
          ...prevPosition,
          percentComplete
        }));
        requestAnimationFrame(animateTrain);
      } else {
        // Animation complete
        setTrainPosition(prevPosition => ({
          ...prevPosition,
          percentComplete: 0,
          startStation: prevPosition.endStation,
          endStation: '', // Reset end station or set new destination
        }));
      }
    };

    animateTrain();

    return () => {
      // Cleanup if needed
    };
  }, [trainPosition.endStation]); // Trigger animation on endStation change

  const renderTrain = () => {
    const startStation = subwayStations.find(station => station.name === trainPosition.startStation);
    const endStation = subwayStations.find(station => station.name === trainPosition.endStation);

    if (!startStation || !endStation) return null;

    const x = startStation.x + (endStation.x - startStation.x) * (trainPosition.percentComplete / 100);
    const y = startStation.y + (endStation.y - startStation.y) * (trainPosition.percentComplete / 100);

    return (
      <text x={x} y={y} fontSize={40}>🚟</text>
    );
  };

  return (
    <div className='SubwayMap'>
      <h1>지하철 노선도</h1>
      <svg width="85vw" height="600">
        {/* Render subway lines */}
        {subwayStations.map(station => (
          <g key={station.name}>
            {station.lines.includes('2호선') && <line x1={station.x} y1={station.y} x2={station.x + 600} y2={station.y} stroke="#009D3E" strokeWidth="8" />}
            {station.lines.includes('신분당선') && <line x1={station.x} y1={station.y} x2={station.x + 600} y2={station.y} stroke="#009D3E" strokeWidth="8" />}
            {station.lines.includes('8호선') && <line x1={station.x} y1={station.y} x2={station.x + 600} y2={station.y} stroke="#009D3E" strokeWidth="8" />}
            {station.lines.includes('공항철도') && <line x1={station.x} y1={station.y} x2={station.x + 600} y2={station.y} stroke="#009D3E" strokeWidth="8" />}
            <circle cx={station.x} cy={station.y} r="10" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
            <text x={station.x - 5} y={station.y + 25} fontSize="12" fill="#000000">{station.name}</text>
          </g>
        ))}
        {/* Render the train */}
        {renderTrain()}
      </svg>
    </div>
  );
};

export default SubwayMap;