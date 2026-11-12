import { useState } from 'react';
import BasicTodo from './exercises/BasicTodo';
import StepCounter from './exercises/StepCounter';
import ThemeSwitcher from './exercises/ThemeSwitcher';
import LoginForm from './exercises/LoginForm';
import ShoppingList from './exercises/ShoppingList';
import AdvancedTodo from './exercises/AdvancedTodo';

const TABS = [
  { key: 'basic', label: 'Todo (ч. 3)', component: BasicTodo },
  { key: 'counter', label: 'Счётчик', component: StepCounter },
  { key: 'theme', label: 'Тема', component: ThemeSwitcher },
  { key: 'login', label: 'Логин', component: LoginForm },
  { key: 'shopping', label: 'Покупки', component: ShoppingList },
  { key: 'advanced', label: 'Todo (ч. 4)', component: AdvancedTodo },
];

function App() {
  const [active, setActive] = useState('basic');
  const Current = TABS.find((t) => t.key === active).component;

  return (
    <div className="app">
      <h1 style={{ fontSize: 22 }}>useState, события, списки и условия</h1>
      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`tab ${active === tab.key ? 'tab--active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <Current />
    </div>
  );
}

export default App;
