# FlowScrape

[English](README.md) | 中文

FlowScrape 是一个基于 Next.js 构建的工作流自动化平台，让用户可以通过可视化界面创建和管理自动化工作流。

## 主要功能

- 🔄 可视化工作流编辑器
- 🤖 自动化任务执行
- 📊 执行状态监控
- 🔐 用户认证与授权
- 🌙 深色模式支持
- 🌍 国际化支持
- 📅 定时任务调度
- 🔄 实时进度显示

## 技术栈

### 核心框架

- [Next.js 14](https://nextjs.org/) - React 框架
- [React 18](https://react.dev/) - UI 库
- [TypeScript](https://www.typescriptlang.org/) - 类型安全

### 数据层

- [Prisma](https://www.prisma.io/) - 数据库 ORM
- [React Query](https://tanstack.com/query/latest) - 数据获取与缓存

### UI 框架

- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Radix UI](https://www.radix-ui.com/) - 无障碍组件原语
- [Lucide Icons](https://lucide.dev/) - 图标库
- [Sonner](https://sonner.emilkowal.ski/) - Toast 通知
- [Vaul](https://vaul.emilkowal.ski/) - 抽屉组件

### 功能组件

- [@xyflow/react](https://reactflow.dev/) - 工作流编辑器
- [Recharts](https://recharts.org/) - 数据可视化
- [React Hook Form](https://react-hook-form.com/) - 表单处理
- [Zod](https://zod.dev/) - 数据验证
- [date-fns](https://date-fns.org/) - 日期处理
- [Puppeteer](https://pptr.dev/) - 网页自动化
- [Cheerio](https://cheerio.js.org/) - HTML 解析

### 功能增强

- [Clerk](https://clerk.com/) - 用户认证
- [next-themes](https://github.com/pacocoursey/next-themes) - 主题切换
- [i18next](https://www.i18next.com/) - 国际化
- [cron-parser](https://github.com/harrisiirak/cron-parser) - Cron 表达式解析
- [nextjs-toploader](https://github.com/TheSGJ/nextjs-toploader) - 页面加载进度条

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

```
flowscrape/
├── app/           # Next.js 应用路由与页面
├── components/    # React 组件
├── lib/          # 工具函数和业务逻辑
├── prisma/       # 数据库模型和迁移
├── public/       # 静态资源
├── actions/      # 服务器操作
└── i18n/         # 国际化文件
```

## 环境要求

- Node.js 18+
- PostgreSQL 数据库
- npm 或 yarn 包管理器

## 开发工具

- [TypeScript](https://www.typescriptlang.org/) - 类型检查
- [ESLint](https://eslint.org/) - 代码检查
- [Prisma Studio](https://www.prisma.io/studio) - 数据库管理
- [React Query Devtools](https://tanstack.com/query/latest/docs/react/devtools) - 数据查询调试

## 许可证

[MIT](LICENSE)
