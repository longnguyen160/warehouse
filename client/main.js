import { createApp } from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import accountModule from './modules/account';
import adminModule from './modules/admin';
import checkItemsModule from './modules/checkItems';
import stockInModule from './modules/stockIn';
import staffModule from './modules/staffs';
import reportModule from './modules/reports';
// init context
const context = initContext();

// create app
const app = createApp(context);

app.loadModule(coreModule);
app.loadModule(accountModule);
app.loadModule(adminModule);
app.loadModule(checkItemsModule);
app.loadModule(stockInModule);
app.loadModule(staffModule);
app.loadModule(reportModule);
app.init();
