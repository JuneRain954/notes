import ApiController from './controller/index';
import { IocContainer } from '../utils/container';
import { parseApiInfo } from '../utils/tools';

export default parseApiInfo(IocContainer.get(ApiController));


