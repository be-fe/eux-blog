/**
 * @file: About us
 * @author: 陈蔓青
 * @date: 2017/11/26
 * @description: 关于我们
 */

import React from 'picidae/exports/react';
import PropTypes from 'picidae/exports/prop-types';

import './assets/style/index.less';
import './assets/style/about-us.less';

const About = () => {
    // 稍后数据抽成可配置项
    const ours = [
        {img: 'jinjing', name: '金晶'},
        {img: 'liuyuan', name: '刘源'},
        {img: 'fanhuimin', name: '范慧敏'},
        {img: 'zhengmingjian', name: '郑明键'},
        {img: 'zhanghua', name: '张华'},
        {img: 'zhangziqing', name: '张紫庆'},
        {img: 'lipenghui', name: '李鹏辉'},
        {img: 'wangxiaoying', name: '王晓莹'},
        {img: 'yangmeng', name: '杨萌'},
        {img: 'yanlong', name: '闫龙'},
        {img: 'zhouyijing', name: '周逸景'},
        {img: 'suntiecheng', name: '孙铁成'},
        {img: 'liangdong', name: '梁冬'},
        {img: 'wuxueyan', name: '吴雪艳'},
        {img: 'kangjiamei', name: '康佳美'},
        {img: 'jiaoyang', name: '焦阳'},
        {img: 'suweirong', name: '苏伟荣'},
        {img: 'wangxinlei', name: '王新蕾'},
        {img: 'hujiani', name: '胡佳妮'},
        {img: 'lirongfei', name: '栗荣飞'},
        {img: 'zhaolinlin', name: '赵琳琳'},
        {img: 'xieyu', name: '谢郁'},
        {img: 'shipeilin', name: '石培林'},
        {img: 'majian', name: '马建'},
        {img: 'xuzhongyuan', name: '徐忠元'},
        {img: 'fanhaiwang', name: '樊海旺'},
        {img: 'muzhilong', name: '母志龙'},
        {img: 'chenchengxing', name: '陈承星'},
        {img: 'gaoqiuju', name: '高秋菊'},
        {img: 'huayun', name: '花云'},
        {img: 'liuhui', name: '刘慧'},
        {img: 'taole', name: '淘乐'},
        {img: 'zhouguangxia', name: '周光夏'},
        {img: 'zhangxuan', name: '张璇'},
        {img: 'zhangpeng', name: '张鹏'},
        {img: 'caiyu', name: '蔡宇'},
        {img: 'feiqianzhe', name: '费千哲'},
        {img: 'leiquan', name: '雷全'},
        {img: 'luoxincheng', name: '罗心成'},
        {img: 'wangying', name: '王颖'},
        {img: 'wujun', name: '吴俊'},
        {img: 'yangjinglin', name: '杨景麟'},
        {img: 'zhengliangliang', name: '郑亮亮'},
        {img: 'chenxiao', name: '陈晓'},
        {img: 'suntiantian', name: '孙甜甜'},
        {img: 'chenjianwei', name: '陈建伟'},
        {img: 'meijingjing', name: '梅晶晶'}
    ];

    // 随机排序
    ours.sort((a, b) => {
        return Math.random() > 0.5 ? -1 : 1;
    })
    // 插入 logo 图
    ours.splice(23, 0, {img: 'big', name: 'logo'});
    
    // 默认图
    // <img className="default-avatar" src="http://eux.baidu.com/wp-content/themes/eux/images/default-avatar/3.jpg"/>
    const lists = ours.map((item,index) => {
        const imgSrc = `http://eux.baidu.com/wp-content/themes/eux/images/avatar/${item.img}.png`;
        if (item.name === 'logo') {
            return (
                <li className="big-logo"></li>
            )
        } else {
            return (
                <li key={index} data-title={item.name}>
                    <img className="avatar" src={imgSrc}/>
                </li>
            )
        }
    })
    
    return (
        <div className="eux-aboutus clearfix">
            <div className="container-aboutus clearfix">
                <div className="eux-aboutus-img-list">
                    <ul className="about-grid">
                        {lists}
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About;
