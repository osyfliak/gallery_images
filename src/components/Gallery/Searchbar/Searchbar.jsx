import { Header, Form, FormButton, FormInput } from './Searchbar.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [form, setForm] = useState('');

  const handleChangeForm = e => {
    const { value } = e.target;
    setForm(value);
  };

  const reset = () => {
    setForm('');
  };

  const resetForm = e => {
    e.preventDefault();
    onSubmit(form);
    reset();
  };
  return (
    <Header className="searchbar">
      <Form className="form" onSubmit={resetForm}>
        <FormButton type="submit" className="button">
          <span className="button-label">Search</span>
        </FormButton>

        <FormInput
          onChange={handleChangeForm}
          value={form}
          className="input"
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
