import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement, Title } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

export const options = {
    indexAxis: 'y',  // horizontal로 막대그래프를 가로로 표시하고 싶을때 설정, 세로로하려면 지우면됨.
    elements: {
        bar: {
        borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend : false,
        // legend: {
        //     position: 'right',
        // },
        title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
        },
    },
    scales: {
        x: {
          display: false, // X 축 격자 눈금 숨기기
        },
        y: {
        grid: {
        // display: false, // Y 축 격자 눈금 숨기기
        },
    },
    },
};

const ResultChart = () => {
    
    ChartJS.register(  CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend);

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };
        
  return (
    <>
        <Bar data={data} options={options}/>
    </>
  )
}

export default ResultChart

