import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './../../ui/Popup';

const root = document.getElementById('root');
const rootElement = createRoot(root);
rootElement.render(<Popup />);