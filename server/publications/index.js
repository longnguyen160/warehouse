import users from './users';
import position from './position';
import item from './item';
import series from './series';
import stockIn from './stockIn';
import warehouese from './warehouse';

export default function() {
  users(),
  position(),
  item(),
  series(),
  stockIn(),
  warehouese()
}