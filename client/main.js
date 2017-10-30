import { createApp } from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import accountModule from './modules/account';
import checkItemsModule from './modules/checkItems';
import chatModule from './modules/chat';
// init context
const context = initContext();

// create app
const app = createApp(context);

app.loadModule(coreModule);
app.loadModule(accountModule);
app.loadModule(checkItemsModule);
app.loadModule(chatModule);
app.init();
