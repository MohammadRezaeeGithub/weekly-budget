//class
class Budget{
    constructor(budget){
        this.budget = budget;
        this.leftBuget = budget;
    }

    substracFromBuget(Amount){
        return this.leftBuget -= Amount;
    }
}

class HTML{

    //inserting the buget to the HTML
    insertBuget(amount){
        total.innerHTML = amount;
        left.innerHTML = amount;
    }

    //showing error message 
    showMessage(text,className){
        const div = document.createElement('div')
        div.classList.add('alert','text-center',className);
        div.appendChild(document.createTextNode(text))

        const element = document.querySelector('.card-body')
        element.insertBefore(div,document.querySelector('#insertbefore'))

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000);

        expnseForm.reset();
    }

    //adding expeses to expense's list
    insertExpense(Title,Amount){
        const expenses = document.querySelector('#expenses')
        
        let li = document.createElement('li')
        li.classList.add('list-group-item')
        
        li.innerHTML = `${Title}<span class="badge bg-primary float-end">${Amount}</span>`;

        expenses.appendChild(li);

        expnseForm.reset();
    }

    //substraction the amount of expense from total
    trackBudget(Amount){
        const letftBuget = budget.substracFromBuget(Amount);
        left.innerHTML = letftBuget;

        if ((budget.budget / 4) > letftBuget) {
            left.parentElement.classList.remove('alert-warning','alert-success')
            left.parentElement.classList.add('alert-danger');


        }else if ((budget.budget / 2) > letftBuget) {
            left.parentElement.classList.remove('alert-success')
            left.parentElement.classList.add('alert-warning');
        }
    }
}



//variable
let budgetUser;
let budget;
const total = document.querySelector('span#total');
const left = document.querySelector('span#left');
const expnseForm = document.querySelector('#expense-form');
const html = new HTML();


//eventlistener
eventlisteners();
function eventlisteners(){
    
    document.addEventListener('DOMContentLoaded',function(){

        //getting buget from user
        budgetUser = prompt("Please enter your bufget:");
        if (budgetUser === null || budgetUser === '' || budgetUser === '0') {
            window.location.reload();//this function reload the page
        }else{
            budget = new Budget(budgetUser);
            html.insertBuget(budget.budget)
        }
    });

    //adding eventlistener for the form when it is submitted
    expnseForm.addEventListener('submit',function(e){
        e.preventDefault();

        let expenseTitle = document.querySelector('#expense').value;
        let expenseAmount = document.querySelector('#amount').value;

        if (expenseTitle === '' || expenseAmount === '') {
            html.showMessage('All the feilds must be completed!',"alert-danger")
        }else{
            html.insertExpense(expenseTitle,expenseAmount);
            html.trackBudget(expenseAmount)
        }

    });
}