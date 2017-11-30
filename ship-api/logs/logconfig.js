module.exports = {
    config: {
        appenders: [
            { type: 'console' }, //控制台输出
            {
                type: 'file', //文件输出
                filename: 'logs/access.log',//输出日志的文件夹/文件名，不会自动生成文件夹，请先自行创建logs文件夹
                maxLogSize: 1024 * 12,//一个文件的大小，超出后会自动新生成一个文件
                backups: 3,//备份的文件数量
                category: 'normal'
            }
        ],
        replaceConsole: true
    }
}