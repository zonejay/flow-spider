# Next.js 路由约定 - 特殊文件命名

## 方括号 `[]` - 动态路由

方括号用于创建动态路由段。方括号内的内容将作为参数传递给页面组件。

### 示例:

- `[id]` - 单个动态段

  ```tsx
  // app/blog/[id]/page.tsx
  export default function Page({params}: {params: {id: string}}) {
    return <div>博客文章 ID: {params.id}</div>
  }
  ```

- `[...slug]` - 捕获所有路由

  ```tsx
  // app/shop/[...slug]/page.tsx
  // 可匹配: /shop/clothes, /shop/clothes/tops, /shop/clothes/tops/t-shirts
  export default function Page({params}: {params: {slug: string[]}}) {
    return <div>当前路径: {params.slug.join('/')}</div>
  }
  ```

- `[[...slug]]` - 可选的捕获所有路由
  ```tsx
  // 可匹配: /shop, /shop/clothes, /shop/clothes/tops
  ```

## 圆括号 `()` - 路由分组

圆括号用于创建路由组，它不会影响 URL 路径结构。主要用于组织代码结构。

### 用途:

1. **代码组织** - 将相关路由分组但不影响 URL
2. **布局隔离** - 在不同路由组间创建独立的布局
3. **路由分段** - 将复杂路由分解成更小的部分

### 示例:

```
app/
  ├── page.js
  ├── (admin)/
  │   ├── dashboard/
  │   │   └── page.js
  ├── (user)/
  │   ├── profile/
  │   │   └── page.js
```

### 注意事项:

- 圆括号分组不会影响最终的 URL 结构
- 可以在分组内使用独立的布局文件 (layout.tsx)
- 分组名称仅用于组织目的，可以使用任意有效的文件夹名称
