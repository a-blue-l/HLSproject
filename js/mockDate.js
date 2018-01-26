// 中奖列表部分
Mock.mock('http://winner1.cn', {
    'status'     : '1',
    'peopleList': '这是三等奖添加'
});
Mock.mock('http://winner2.cn', {
    'status'     : '1',
    'peopleList': '这是二等奖添加'
});
Mock.mock('http://winner3.cn', {
    'status'     : '1',
    'peopleList': '这是一等奖添加'
});
// 提交表单部分
Mock.mock('http://submit.cn', {
    'status|1-3'     : 1
});