import { getStorage, setStroage } from '../../plugins/utils';
import dayjs from 'dayjs';

/**
 * 数据结构
 * key：statistics
 * [{
 *  webName: 网站的名称,
 *  createTime: 创建时间
 * forced: 是否强制访问
 * }]
 */
export default {
    async add(url, forced = false) {
        const [source, setting] = await Promise.all([getStorage('statistics'), getStorage('setting')]);
        const match = setting.find((item) => item.url === url);
        if (!match) {
            return;
        }
        source.push({
            webName: match.name,
            createTime: dayjs().format('YYYY-MM-DD'),
            forced,
        });
        setStroage('setting', source);
    },
    /**
     * 数据结构：[
     *  {
     *      createTime: '',
     *      list: [
     *          {
     *              name: '',
     *              times: 0,
     *              forcedTimes: 0,
     *          }
     *      ]
     *  }
     * ]
     */
    async getAll() {
        const source = await getStorage('statistics');
        source.reduce((acc, item) => {
            if (!acc.length) {
                return acc.concat({
                    createTime: item.createTime,
                    list: [],
                });
            }
            return [];
        }, []);
    },
};
