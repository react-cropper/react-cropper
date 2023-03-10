import {createRoot} from 'react-dom/client';
import React from 'react';
import Demo from './Demo';

const container = document.getElementById('main');
const root = createRoot(container!);

root.render(<Demo />);
