import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../styles/tailwind.css';


Template.expenseForm.onCreated(function() {
if (!localStorage.getItem('expenses')) {
localStorage.setItem('expenses', JSON.stringify([]));
}
});


Template.expenseForm.events({
'submit #expenseForm'(event) {
event.preventDefault();
const date = event.target.expenseDate.value;
const amount = parseFloat(event.target.expenseAmount.value);
const category = event.target.expenseCategory.value;
const description = event.target.expenseDescription.value;


if (!amount || isNaN(amount)) {
alert('Please enter a valid amount');
return;
}


const expenses = JSON.parse(localStorage.getItem('expenses'));
expenses.unshift({
id: Date.now(),
date,
amount,
category,
description
});
localStorage.setItem('expenses', JSON.stringify(expenses));


event.target.reset();
Template.instance().view.parentView.lookupTemplate('expenseList').instance().render();
Template.instance().view.parentView.lookupTemplate('dashboard').instance().render();
}
});