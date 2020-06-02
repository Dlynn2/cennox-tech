import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { AddContactForm } from './components/Modals'
import Tab from './components/Tabs';

function App() {
  return (
    <div className="container p-2">
      <div className="row">
        <div className="col">
          <Tab />
          <AddContactForm buttonLabel="Add contact" />
        </div>
      </div>
    </div>
  );
}

export default App;
