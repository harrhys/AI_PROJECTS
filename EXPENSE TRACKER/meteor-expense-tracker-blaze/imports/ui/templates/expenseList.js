import { Template } from 'meteor/templating';
import '../styles/tailwind.css';


Template.expenseList.onRendered(function() {
renderTable();


document.getElementById('searchInput').addEventListener('input', renderTable);


function renderTable() {
const expenses = JSON.parse(localStorage.getItem('expenses'));
const search = document.getElementById('searchInput').value.toLowerCase();
const tbody = document.getElementById('expenseTableBody');
tbody.innerHTML = '';


expenses.filter(e => e.description.toLowerCase().includes(search) || e.amount.toString().includes(search))
.forEach(exp => {
const tr = document.createElement('tr');
tr.className = 'border-b';
tr.innerHTML = `
<td class="py-2">${new Date(exp.date).toLocaleDateString()}</td>
<td class="py-2">$${exp.amount.toFixed(2)}</td>
<td class="py-2">${exp.category}</td>
<td class="py-2">${exp.description}</td>
<td class="py-2"><button class='text-red-500 hover:underline' data-id='${exp.id}'>Delete</button></td>
`;
tbody.appendChild(tr);
});


tbody.querySelectorAll('button').forEach(btn => {
btn.addEventListener('click', () => {
const id = parseInt(btn.getAttribute('data-id'));
const updated = JSON.parse(localStorage.getItem('expenses')).filter(e => e.id !== id);
localStorage.setItem('expenses', JSON.stringify(updated));
renderTable();
Template.instance().view.parentView.lookupTemplate('dashboard').instance().render();
});
});
}
});