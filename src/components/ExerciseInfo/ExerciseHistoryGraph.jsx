import React, { useEffect, useRef } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import * as d3 from 'd3';

const ExerciseHistoryGraph = ({ exerciseId }) => {
  const { exercises } = useWorkout();
  const chartRef = useRef(null);
  
  const selectedExercise = exercises.find(ex => ex.id === exerciseId);
  const exerciseHistory = selectedExercise?.history || [];
  
  useEffect(() => {
    if (exerciseHistory.length <= 1 || !chartRef.current) {
      return;
    }
    
    // Clear any previous chart
    d3.select(chartRef.current).selectAll('*').remove();
    
    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;
    
    // Create SVG element
    const svg = d3.select(chartRef.current)
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Parse dates and sort chronologically
    const data = exerciseHistory
      .map(entry => ({
        ...entry,
        date: new Date(entry.date)
      }))
      .sort((a, b) => a.date - b.date);
    
    // Set up scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);
      
    const yScaleSets = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sets) * 1.2])
      .range([height, 0]);
      
    const yScaleReps = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.reps) * 1.2])
      .range([height, 0]);
    
    // Create line generators
    const lineSets = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScaleSets(d.sets))
      .curve(d3.curveMonotoneX);
      
    const lineReps = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScaleReps(d.reps))
      .curve(d3.curveMonotoneX);
    
    // Add X axis - only show first and last date
    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(2)
          .tickFormat(d => {
            const format = d3.timeFormat('%b %d');
            return format(d);
          })
      );
      
    xAxis.select('.domain').attr('stroke', '#555');
    xAxis.selectAll('text').attr('fill', '#aaa').attr('font-size', '10px');
    
    // Add Sets line path
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#6b46c1')
      .attr('stroke-width', 2)
      .attr('d', lineSets);
      
    // Add Sets dots
    svg.selectAll('.dot-sets')
      .data(data)
      .enter()
      .append('circle')
        .attr('class', 'dot-sets')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScaleSets(d.sets))
        .attr('r', 4)
        .attr('fill', '#6b46c1')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);
        
    // Add Reps line path
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f6ad55')
      .attr('stroke-width', 2)
      .attr('d', lineReps);
      
    // Add Reps dots
    svg.selectAll('.dot-reps')
      .data(data)
      .enter()
      .append('circle')
        .attr('class', 'dot-reps')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScaleReps(d.reps))
        .attr('r', 4)
        .attr('fill', '#f6ad55')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);
        
    // Add tooltips to dots
    const dots = svg.selectAll('.dot-sets, .dot-reps');
    
    dots.append('title')
      .text(d => {
        const format = d3.timeFormat('%b %d, %Y');
        return `Date: ${format(d.date)}\nSets: ${d.sets}\nReps: ${d.reps}`;
      });
      
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 100}, 0)`);
      
    // Sets legend
    legend.append('rect')
      .attr('width', 14)
      .attr('height', 14)
      .attr('fill', '#6b46c1');
      
    legend.append('text')
      .attr('x', 20)
      .attr('y', 12)
      .attr('fill', '#aaa')
      .attr('font-size', '12px')
      .text('Sets');
      
    // Reps legend
    legend.append('rect')
      .attr('width', 14)
      .attr('height', 14)
      .attr('y', 20)
      .attr('fill', '#f6ad55');
      
    legend.append('text')
      .attr('x', 20)
      .attr('y', 32)
      .attr('fill', '#aaa')
      .attr('font-size', '12px')
      .text('Reps');
    
    // Handle window resize
    const handleResize = () => {
      // This would re-render the chart, but for simplicity, we'll just
      // let the component re-render if the window size changes dramatically
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [exerciseHistory]);
  
  if (!selectedExercise || exerciseHistory.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400">
        <p>No history data available for this exercise.</p>
        <p className="text-sm mt-2">Complete sets to track your progress.</p>
      </div>
    );
  }
  
  if (exerciseHistory.length === 1) {
    const entry = exerciseHistory[0];
    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    return (
      <div className="text-center py-4">
        <p className="text-gray-400 mb-3">First workout recorded on {formattedDate}</p>
        <div className="bg-gray-800 p-3 rounded-md inline-block">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-sm text-gray-400">Sets</p>
              <p className="text-xl font-bold text-primary">{entry.sets}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Reps</p>
              <p className="text-xl font-bold text-secondary">{entry.reps}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="exercise-history-graph">
      <div 
        ref={chartRef} 
        className="chart-container w-full overflow-hidden"
      ></div>
    </div>
  );
};

export default ExerciseHistoryGraph;