import {BarChart,Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts'

const BarChartComp = ({data})=>{
    
    return (
    <BarChart width={600} height={300} data={data} >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" stroke='white'/>
        <YAxis color='white' stroke='white'/>
        <Tooltip/>
        <Legend/>
        <Bar barSize={50} dataKey="count" fill="#b3aff7ff"/>
    </BarChart>
    )
};
export default BarChartComp;