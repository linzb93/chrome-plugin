import { getStorage } from '../../plugins/utils';

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
    async getAll() {
        const source = await getStorage('statistics');
        return source.reduce((acc, item) => {
            if (!acc.length) {
                return acc.concat({
                    createTime: item.createTime,
                    list: [
                        {
                            webName: item.webName,
                            times: 1,
                            forcedTimes: item.forced ? 1 : 0,
                        },
                    ],
                });
            }
            const last = acc[acc.length - 1];
            if (item.createTime === last.createTime) {
                const match = last.list.find((child) => child.webName === item.webName);
                if (match) {
                    match.times += 1;
                    match.forcedTimes += item.forced ? 1 : 0;
                } else {
                    last.list.push({
                        webName: item.webName,
                        times: 1,
                    });
                }
                return acc;
            } else {
                return acc.concat({
                    createTime: item.createTime,
                    list: [
                        {
                            webName: item.webName,
                            times: 1,
                            forcedTimes: item.forced ? 1 : 0,
                        },
                    ],
                });
            }
        }, []);
    },
};
