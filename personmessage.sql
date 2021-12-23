/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : personmessage

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2021-12-20 12:45:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for education
-- ----------------------------
DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `education` varchar(255) NOT NULL,
  `edu_money` int(10) unsigned NOT NULL COMMENT '学历底薪',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of education
-- ----------------------------
INSERT INTO `education` VALUES ('1', '高中', '2000');
INSERT INTO `education` VALUES ('2', '大专', '3500');
INSERT INTO `education` VALUES ('3', '本科', '4000');
INSERT INTO `education` VALUES ('4', '硕士', '4500');
INSERT INTO `education` VALUES ('5', '博士', '5000');

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `per_id` int(10) unsigned NOT NULL,
  `loginame` varchar(255) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `port_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('1', '1', 'admin', '0192023a7bbd73250516f069df18b500', '1');
INSERT INTO `login` VALUES ('2', '2', 'zjm', '4b3b98720cacd0bab50e1fcca7f1e0cd', '2');
INSERT INTO `login` VALUES ('3', '3', 'mu', 'a5be6fba2707fe2d61f617fe23e3838b', '3');
INSERT INTO `login` VALUES ('4', '4', 'song', '1a145a23d6e47aadfe2063f1f951e691', '1');
INSERT INTO `login` VALUES ('5', '5', 'hao', '0192023a7bbd73250516f069df18b500', '1');
INSERT INTO `login` VALUES ('6', '6', 'xin', '0192023a7bbd73250516f069df18b500', '1');
INSERT INTO `login` VALUES ('8', '8', 'xun', '0192023a7bbd73250516f069df18b500', '1');

-- ----------------------------
-- Table structure for pay
-- ----------------------------
DROP TABLE IF EXISTS `pay`;
CREATE TABLE `pay` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `per_id` int(10) unsigned NOT NULL,
  `month` int(10) unsigned DEFAULT NULL,
  `year` int(10) unsigned DEFAULT NULL,
  `kbi` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'KBI绩效考核奖金',
  `perfor` int(11) NOT NULL DEFAULT '0' COMMENT '提成',
  `edu_id` int(10) unsigned NOT NULL,
  `sta_id` int(10) unsigned NOT NULL,
  `status` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pay
-- ----------------------------
INSERT INTO `pay` VALUES ('1', '1', '4', '2021', '2', '1', '2', '1', '1');
INSERT INTO `pay` VALUES ('2', '2', '4', '2021', '3500', '0', '3', '2', '1');
INSERT INTO `pay` VALUES ('3', '3', '4', '2021', '3500', '0', '3', '3', '1');
INSERT INTO `pay` VALUES ('4', '4', '4', '2021', '2000', '1000', '4', '1', '0');
INSERT INTO `pay` VALUES ('5', '5', '4', '2021', '3000', '1000', '4', '1', '0');
INSERT INTO `pay` VALUES ('6', '6', '4', '2021', '4500', '1000', '5', '1', '0');
INSERT INTO `pay` VALUES ('8', '8', '4', '2021', '0', '0', '5', '1', '0');

-- ----------------------------
-- Table structure for permsg
-- ----------------------------
DROP TABLE IF EXISTS `permsg`;
CREATE TABLE `permsg` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) NOT NULL,
  `gender` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '0为女，1为男',
  `age` int(10) unsigned DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `isMarry` int(11) DEFAULT '0' COMMENT '0为否，1为已婚',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `personNum` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `entryTime` date DEFAULT NULL,
  `edu_id` int(10) unsigned NOT NULL,
  `status` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '1为在职，0为离职',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permsg
-- ----------------------------
INSERT INTO `permsg` VALUES ('1', '小小', '0', '21', '1998-10-10', '0', '广东省广州市天河区', '440883200012345645', '2021-10-10', '2', '1');
INSERT INTO `permsg` VALUES ('2', '小白', '0', '27', '1997-09-15', '0', '广东省广州市天河区', '44088320000945124', '2020-11-12', '3', '1');
INSERT INTO `permsg` VALUES ('3', '沐沐', '1', '20', '1996-10-13', '1', '广东省广州市天河区', '440883200076545907', '2021-10-10', '3', '1');
INSERT INTO `permsg` VALUES ('4', '宋强', '1', '21', '1995-11-21', '0', '广东省东莞市寮步镇', '440883200012345786', '2008-01-16', '4', '1');
INSERT INTO `permsg` VALUES ('5', '昊昊', '1', '21', '2001-10-09', '0', '广东省深圳市宝安区', '440883200098045645', '2009-01-26', '4', '1');
INSERT INTO `permsg` VALUES ('6', '欣欣', '0', '30', '1990-07-08', '0', '广东省深圳市光明区', '440886700014245656', '2021-01-02', '5', '1');
INSERT INTO `permsg` VALUES ('7', '西西', '0', '20', '1995-07-01', '1', '广东省佛山市顺德区', '440663200552338245', '2020-08-19', '4', '0');
INSERT INTO `permsg` VALUES ('8', '勋勋', '1', '21', '1996-04-08', '0', '广东省东莞市南城区', '440223200056340683', '2020-01-30', '5', '1');
INSERT INTO `permsg` VALUES ('9', '熊熊', '1', '19', '1989-06-05', '0', '广东省惠州市惠城区', '440773200034045676', '2021-06-16', '3', '0');

-- ----------------------------
-- Table structure for station
-- ----------------------------
DROP TABLE IF EXISTS `station`;
CREATE TABLE `station` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sta_name` varchar(255) NOT NULL,
  `sta_money` int(10) unsigned NOT NULL COMMENT '岗位津贴',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of station
-- ----------------------------
INSERT INTO `station` VALUES ('1', '普通员工', '2000');
INSERT INTO `station` VALUES ('2', '行政主管', '3000');
INSERT INTO `station` VALUES ('3', '财务总监', '3500');
