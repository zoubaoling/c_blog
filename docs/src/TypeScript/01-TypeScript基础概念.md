# TypeScript基础概念

## 题目
请解释TypeScript是什么，它与JavaScript有什么区别？

## 答案

### TypeScript是什么
TypeScript是JavaScript的超集，它添加了可选的静态类型检查和基于类的面向对象编程等特性。

### 主要区别

1. **静态类型检查**
```typescript
// JavaScript
let name = "张三";
name = 123; // 运行时才知道错误

// TypeScript
let name: string = "张三";
name = 123; // 编译时就报错
```

2. **类型注解**
```typescript
// 函数参数和返回值类型
function add(a: number, b: number): number {
    return a + b;
}

// 接口定义
interface User {
    name: string;
    age: number;
    email?: string; // 可选属性
}
```

3. **面向对象特性**
```typescript
class Animal {
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    public makeSound(): void {
        console.log("Some sound");
    }
}
```

4. **编译时错误检查**
- TypeScript在编译时就能发现类型错误
- JavaScript只能在运行时发现错误

5. **更好的IDE支持**
- 智能提示
- 重构支持
- 自动补全

### 优势
- 提高代码可维护性
- 减少运行时错误
- 更好的开发体验
- 支持最新的JavaScript特性
