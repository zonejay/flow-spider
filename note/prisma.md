# Prisma

## 工作流

- 用户不能同时拥有相同名称的工作流

# prisma 使用

- 安装 prisma

```bash
npm install --save-dev prisma
npm install @prisma/client
```

- 初始化 prisma

```bash
npx prisma init
```

- 定义 prisma schema

- 启动 prisma migrate

```bash
npx prisma migrate dev
```

- 启动 prisma studio

```bash
npx prisma studio
```

Prisma Studio 提供了一个直观的界面来:

- 查看和编辑数据库中的数据
- 添加、修改和删除记录
- 过滤和排序数据
- 导航表之间的关系

默认运行在 http://localhost:5555
