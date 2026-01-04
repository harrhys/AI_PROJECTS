import { Template } from 'meteor/templating';
import Chart from 'chart.js/auto';
import Papa from 'papaparse';
import '../styles/tailwind.css';


const categories = ["Food", "Transportation", "Entertainment", "Shopping", "Bills", "Other"];


Template.dashboard.onRendered(function() {
renderDashboard();


document.getElementById('exportCsv').addEventListener('click', () => {
const expenses = JSON.parse(localStorage.getItem('expenses'));
const csv = Papa.unparse(expenses);
const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.setAttribute('download', 'expenses.csv');
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
});


function renderDashboard() {
const expenses = JSON.parse(localStorage.getItem('expenses'));
const total = expenses.reduce((sum, e) => sum + e.amount, 0);
const monthly = expenses.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).reduce((sum, e) => sum + e.amount, 0);
const categoryTotals = categories.map(cat => ({
category: cat,
total: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
}));


document.getElementById('totalSpending').innerText = `$${total.toFixed(2)}`;
document.getElementById('monthlySpending').innerText = `$${monthly.toFixed(2)}`;
document.getElementById('topCategory').innerText = categoryTotals.reduce((a,b) => a.total > b.total ? a : b).category;


const ctx = document.getElementById('categoryChart');
if (ctx.chart) ctx.chart.destroy();
ctx.chart = new Chart(ctx, {
type: 'bar',
data: {
labels: categoryTotals.map(c => c.category),
datasets: [{ label: 'Spending', data: categoryTotals.map(c => c.total), backgroundColor: 'rgba(59,130,246,0.7)' }]
}
});
}


Tracker.autorun(renderDashboard);
});