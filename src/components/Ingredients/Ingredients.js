import React, { useCallback, useReducer } from 'react'; // { useState }
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import ErrorModal from '../../components/UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient];
    case 'DELETE':
      return state.filter((ingredient) => ingredient.id !== action.id);
    default:
      return state;
  }
};

const httpRequestReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return { ...state, loading: true };
    case 'RESPONSE':
      return { ...state, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...state, error: null };
    default:
      throw new Error('Should not be reached');
  }
};

function Ingredients() {
  // const [ingredients, setIngredients] = useState([]);
  // const [loading, setLoading] = useState(null);
  // const [error, setError] = useState('');
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpRequest, httpDispatch] = useReducer(httpRequestReducer, {
    loading: null,
    error: '',
  });

  // use filter = '' fetch data instead of this
  // useEffect(() => {
  //   fetch('https://ingredients-b1a86.firebaseio.com/ingredients.json')
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadIngredients = Object.entries(responseData).map(
  //         ([key, value]) => {
  //           return { id: key, title: value.title, amount: value.amount };
  //         }
  //       );
  //       setIngredients(loadIngredients);
  //     });
  // }, []);

  const filterUpdatedIngredients = useCallback((filterIngredients) => {
    // setIngredients(filterIngredients)
    dispatch({ type: 'SET', ingredients: filterIngredients });
  }, []);

  const AddIngredientHandler = (ingredient) => {
    // setLoading(true);
    httpDispatch({ type: 'SEND' });
    fetch('https://ingredients-b1a86.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((responseData) => {
        // setIngredients((prevIngredients) => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient },
        // ]);
        // setLoading(null);
        dispatch({
          type: 'ADD',
          ingredient: { id: responseData.name, ...ingredient },
        });
        httpDispatch({ type: 'RESPONSE' });
      })
      .catch((error) => {
        // setError(error.message);
        // setLoading(null);
        httpDispatch({ type: 'ERROR', errorMessage: error.message });
      });
  };

  const deleteIngredientHandler = (id) => {
    // setLoading(true);
    httpDispatch({ type: 'SEND' });
    fetch(
      'https://ingredients-b1a86.firebaseio.com/ingredients/' + id + '.json',
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        // setIngredients((prevIngredients) => {
        //   return prevIngredients.filter((ingredient) => ingredient.id !== id);
        // });
        // setLoading(null);
        dispatch({ type: 'DELETE', id: id });
        httpDispatch({ type: 'RESPONSE' });
      })
      .catch((error) => {
        // setError(error.message);
        // setLoading(null);
        httpDispatch({ type: 'ERROR', errorMessage: error.message });
      });
  };

  const clearError = () => {
    // setError(null);
    httpDispatch({ type: 'CLEAR' });
  };

  return (
    <div className="App">
      <IngredientForm
        onAddingIngredient={AddIngredientHandler}
        loading={httpRequest.loading}
      />
      {httpRequest.error && (
        <ErrorModal onClose={clearError}>{httpRequest.error}</ErrorModal>
      )}
      <section>
        <Search filterUpdatedIngredients={filterUpdatedIngredients} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={deleteIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
