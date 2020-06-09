# 学子问答系统 API 说明文档

​	***目录***

- 接口根路径:  `http://127.0.0.1:3000`
- 数据库:  `xzqa`





##  1. 数据表结构

### 1.1 *xzqa_category* ( 分类表 )

| 字段名称 | 数据类型    | 说明                   |
| -------- | ----------- | ---------------------- |
| id       | SMALLINT    | 分类ID, 主键约束, 自增 |
| category | VARCHAR(30) | 分类名称               |

### 1.2 *xzqa_author* ( 文章作者表 )

| 字段名称       | 数据类型    | 说明                   |
| -------------- | ----------- | ---------------------- |
| id             | INT         | 用户ID, 主键约束, 自增 |
| username       | VARCHAR(30) | 用户名, 唯一约束       |
| password       | VARCHAR(32) | 用户密码, MD5          |
| nickname       | VARCHAR(30) | 用户昵称               |
| avator         | VARCHAR(50) | 用户头像               |
| article_number | MEDIUMINT   | 发表的文章数量         |

### 1.3 *xzqa_article* ( 文章表 )

| 字段名称    | 数据类型     | 说明                   |
| ----------- | ------------ | ---------------------- |
| id          | INT          | 文章ID, 主键约束, 自增 |
| subject     | VARCHAR(50)  | 文章标题               |
| description | VARCHAR(255) | 文章描述               |
| content     | MEDIUMTEXT   | 文章正文               |
| image       | VARCHAR(50)  | 文章缩略图             |
| category_id | SMALLINT     | 分类ID                 |
| author_id   | INT          | 作者ID                 |
| created_at  | INT          | 创建时间               |



