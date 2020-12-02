import React, { useState } from 'react';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  // Default
  // const inputForm = useState({ title: '', amount: '' });

  // Destructuring
  // const [inputForm, setInputForm] = useState({title: '', amount: ''})

  // Destructuring + Multiple State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddingIngredient({title: title, amount: amount});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              // **Default**
              // onChange={(event) => {
              //   const newTitle = event.target.value;
              //   inputForm[1]((prevInputForm) => ({
              //     title: newTitle,
              //     amount: prevInputForm.amount,
              //   }));
              // }}
              // value={inputForm[0].title}

              // **Destructuring**
              // onChange={(event) => {
              //   const newTitle = event.target.value;
              //   setInputForm((prevInputForm) => ({
              //     title: newTitle,
              //     amount: prevInputForm.amount,
              //   }));
              // }}
              // value={inputForm.title}

              // **Destructuring + Multiple State
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              // **Default**
              // onChange={(event) => {
              //   const newAmount = event.target.value;
              //   inputForm[1]((prevInputForm) => ({
              //     amount: newAmount,
              //     title: prevInputForm.title
              //   }));
              // }}
              // value={inputForm[0].amount}

              // **Destructuring**
              // onChange={(event) => {
              //   const newAmount = event.target.value;
              //   setInputForm((prevInputForm) => ({
              //     amount: newAmount,
              //     title: prevInputForm.title
              //   }));
              // }}
              // value={inputForm.amount}

              // **Destructuring + Multiple State
              onChange={(event) => {
                setAmount(event.target.value);
              }}
              value={amount}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
