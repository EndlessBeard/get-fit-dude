import React, { useEffect, useRef, useState } from 'react';
import { useWorkout } from '../../context/WorkoutContext';
import * as d3 from 'd3';

const ExerciseHistoryGraph = ({ exerciseId }) => {
  const { exercises } = useWorkout();
  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 200 });
  
  const selectedExercise = exercises.find(ex => ex.id === exerciseId);
  const exerciseHistory = selectedExercise?.history || [];
  
  // Update dimensions when the component mounts or window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        const width = chartRef.current.clientWidth;
        setDimensions({
          width: width,
          height: Math.min(200, Math.max(150, width * 0.5))
        });
      }
    };
    
    // Initial dimensions
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Draw or update the chart when data or dimensions change
  useEffect(() => {
    if (exerciseHistory.length <= 1 || !chartRef.current) {
      return;
    }
    
    // Clear any previous chart
    d3.select(chartRef.current).selectAll('*').remove();
    
    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    
    // Create SVG element with responsive attributes
    const svg = d3.select(chartRef.current)
      .append('svg')
        .attr('width', '100%')
        .attr('height', dimensions.height)
        .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Parse dates and sort chronologically
    const data = exerciseHistory
      .map(entry => ({
        ...entry,
        date: new Date(entry.date),
        // Calculate effective weight (sets * reps)
        effectiveValue: entry.sets * entry.reps
      }))
      .sort((a, b) => a.date - b.date);
    
    // Set up scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.effectiveValue) * 1.2])
      .range([height, 0]);
    
    // Create gradient for line
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(0))
      .attr('x2', 0)
      .attr('y2', yScale(d3.max(data, d => d.effectiveValue) * 1.2));
    
    // Set gradient colors
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#f6ad55');
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#6b46c1');
    
    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.effectiveValue))
      .curve(d3.curveMonotoneX);
    
    // Add subtle grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat('')
      );
    
    // Add X axis - only show first and last date
    const formatDate = d3.timeFormat('%b %d');
    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(2)
          .tickFormat(d => formatDate(d))
      );
      
    // Style the axis
    xAxis.select('.domain').attr('stroke', '#555');
    xAxis.selectAll('text')
      .attr('fill', '#aaa')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold');
    
    // Add a semi-transparent area below the line
    svg.append('path')
      .datum(data)
      .attr('fill', 'url(#line-gradient)')
      .attr('fill-opacity', 0.2)
      .attr('d', d3.area()
        .x(d => xScale(d.date))
        .y0(height)
        .y1(d => yScale(d.effectiveValue))
        .curve(d3.curveMonotoneX)
      );
    
    // Add the line path with gradient
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 3)
      .attr('d', line)
      // Add subtle glow effect
      .style('filter', 'drop-shadow(0px 0px 4px rgba(107, 70, 193, 0.5))');
      
    // Add dots
    svg.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.effectiveValue))
        .attr('r', 5)
        .attr('fill', (d, i) => {
          // First and last dots get special colors
          if (i === 0) return '#f6ad55';
          if (i === data.length - 1) return '#6b46c1';
          return '#ffffff';
        })
        .attr('stroke', '#222')
        .attr('stroke-width', 2)
        // Add pulsing animation to the latest dot
        .each(function(d, i) {
          if (i === data.length - 1) {
            d3.select(this)
              .append('animate')
              .attr('attributeName', 'r')
              .attr('values', '5;7;5')
              .attr('dur', '1.5s')
              .attr('repeatCount', 'indefinite');
          }
        });
    
    // Add tooltips to dots
    const tooltips = svg.selectAll('.dot')
      .append('title')
      .text(d => {
        const format = d3.timeFormat('%b %d, %Y');
        return `Date: ${format(d.date)}\nSets: ${d.sets}\nReps: ${d.reps}\nTotal Volume: ${d.effectiveValue}`;
      });
    
    // Add progress annotation for first and last points
    if (data.length >= 2) {
      const firstPoint = data[0];
      const lastPoint = data[data.length - 1];
      const improvement = Math.round(
        ((lastPoint.effectiveValue - firstPoint.effectiveValue) / firstPoint.effectiveValue) * 100
      );
      
      if (improvement !== 0) {
        svg.append('text')
          .attr('x', width - 5)
          .attr('y', yScale(lastPoint.effectiveValue) - 15)
          .attr('text-anchor', 'end')
          .attr('font-size', '12px')
          .attr('fill', improvement > 0 ? '#10B981' : '#EF4444')
          .attr('font-weight', 'bold')
          .text(`${improvement > 0 ? '+' : ''}${improvement}%`);
      }
    }
    
  }, [exerciseHistory, dimensions, exerciseId]);
  
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
        className="chart-container w-full h-full overflow-hidden"
      ></div>
      
      {/* Time range display below chart */}
      {exerciseHistory.length > 1 && (
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
          <div>
            {new Date(exerciseHistory[0].date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <div>
            {new Date(exerciseHistory[exerciseHistory.length - 1].date).toLocaleDateString('en-US', {
              month: 'short', 
              day: 'numeric'
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseHistoryGraph;