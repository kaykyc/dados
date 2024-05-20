import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale
);

const App = () => {
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/data');
      const data = response.data;

      // Dados para os gráficos
      const generoData = data.map(item => item.genero);
      const trabalhandoData = data.map(item => item.trabalhando_atualmente);
      const graduacaoData = data.map(item => item.ano_conclusao_graduacao);
      const posGraduacaoData = data.map(item => item.ano_conclusao_pos_graduacao);
      const faixaSalarialData = data.map(item => item.faixa_salarial);
      const linhaPesquisaData = data.map(item => item.linha_pesquisa_pos_graduacao);

      // Gráficos
      setChartData({
        genero: {
          labels: ['Masculino', 'Feminino'],
          datasets: [{
            label: 'Gênero',
            data: [
              generoData.filter(g => g === 1).length,
              generoData.filter(g => g === 2).length
            ],
            backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
            borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
            borderWidth: 1,
          }]
        },
        trabalhando: {
          labels: ['Trabalhando', 'Não trabalhando'],
          datasets: [{
            label: 'Trabalhando Atualmente',
            data: [
              trabalhandoData.filter(t => t === 1).length,
              trabalhandoData.filter(t => t === 0).length
            ],
            backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)'],
            borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
            borderWidth: 1,
          }]
        },
        graduacao: {
          labels: data.map(item => item.nome_completo),
          datasets: [{
            label: 'Ano de Conclusão da Graduação',
            data: graduacaoData,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          }]
        },
        posGraduacao: {
          labels: data.map(item => item.nome_completo),
          datasets: [{
            label: 'Ano de Conclusão da Pós-Graduação',
            data: posGraduacaoData,
            backgroundColor: 'rgba(153,102,255,0.6)',
            borderColor: 'rgba(153,102,255,1)',
            borderWidth: 1,
          }]
        },
        faixaSalarial: {
          labels: data.map(item => item.nome_completo),
          datasets: [{
            label: 'Faixa Salarial',
            data: faixaSalarialData,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          }]
        },
        linhaPesquisa: {
          labels: data.map(item => item.nome_completo),
          datasets: [{
            label: 'Linha de Pesquisa na Pós-Graduação',
            data: linhaPesquisaData,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          }]
        }
      });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from PostgreSQL</h1>
      {chartData ? (
        <div>
          <div>
            <h2>Distribuição de Gênero</h2>
            <Bar data={chartData.genero} options={{ responsive: true }} />
          </div>
          <div>
            <h2>Pessoas Trabalhando Atualmente</h2>
            <Pie data={chartData.trabalhando} options={{ responsive: true }} />
          </div>
          <div>
            <h2>Anos de Conclusão de Graduação</h2>
            <Line data={chartData.graduacao} options={{ responsive: true }} />
          </div>
          <div>
            <h2>Anos de Conclusão de Pós-Graduação</h2>
            <Line data={chartData.posGraduacao} options={{ responsive: true }} />
          </div>
          <div>
            <h2>Faixa Salarial</h2>
            <Bar data={chartData.faixaSalarial} options={{ responsive: true, indexAxis: 'y' }} />
          </div>
          <div>
            <h2>Linhas de Pesquisa na Pós-Graduação</h2>
            <Radar data={chartData.linhaPesquisa} options={{ responsive: true }} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
