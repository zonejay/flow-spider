# FlowScrape

FlowScrape 是一个基于 Next.js 构建的工作流自动化平台,让用户可以通过可视化界面创建和管理自动化工作流。

## 主要功能

- 🔄 可视化工作流编辑器
- 🤖 自动化任务执行
- 📊 执行状态监控
- 🔐 用户认证与授权
- 💰 积分/信用管理
- 🌙 深色模式支持

## 技术栈

- [Next.js 14](https://nextjs.org/) - React 框架
- [Prisma](https://www.prisma.io/) - 数据库 ORM
- [Clerk](https://clerk.com/) - 用户认证
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [React Flow](https://reactflow.dev/) - 工作流编辑器
- [React Query](https://tanstack.com/query/latest) - 数据获取与缓存
- [TypeScript](https://www.typescriptlang.org/) - 类型安全

## 开始使用

1. 克隆项目并安装依赖:

   ```bash
   git clone <repository-url>
   cd flowscrape
   npm install
   ```

2. 配置环境变量:

   ```bash
   cp .env.example .env.local
   ```

3. 初始化数据库:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. 启动开发服务器:

   ```bash
   npm run dev
   ```

## 项目结构

    flowscrape/
    ├── app/ # Next.js 应用路由与页面
    ├── components/ # React 组件
    ├── lib/ # 工具函数和业务逻辑
    ├── prisma/ # 数据库模型和迁移
    └── public/ # 静态资源
