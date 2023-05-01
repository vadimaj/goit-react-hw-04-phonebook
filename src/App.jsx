import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

import css from 'App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  const [inputFilter, setInputFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    if (
      contacts.some(
        contact => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      return alert(name + ' is already in contacts');
    }
    setContacts(prevState => {
      return [...prevState, { id: nanoid(), name, number }];
    });
  };

  const changeFilter = e => {
    setInputFilter(e.currentTarget.value);
  };

  const deleteContact = contactID => {
    setContacts(prevState => {
      console.log(prevState);
      return prevState.filter(contact => contact.id !== contactID);
    });
  };

  const filterContacts = () => {
    const normalizedFilter = inputFilter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={inputFilter} onChange={changeFilter} />
      <ContactList
        contacts={filterContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
