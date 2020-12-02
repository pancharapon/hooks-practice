import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const { filterUpdatedIngredients } = props;
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const order =
          enteredFilter && `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch(
          'https://ingredients-b1a86.firebaseio.com/ingredients.json' + order
        )
          .then((response) => response.json())
          .then((responseData) => {
            const filterLoadIngredients = Object.entries(responseData).map(
              ([key, value]) => {
                return { id: key, title: value.title, amount: value.amount };
              }
            );
            filterUpdatedIngredients(filterLoadIngredients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer)
    }
  }, [enteredFilter, filterUpdatedIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
