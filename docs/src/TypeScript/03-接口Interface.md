# TypeScript接口(Interface)

## 题目
请详细解释TypeScript中的接口概念，包括接口的定义、使用场景和高级特性。

## 答案

### 1. 基本接口定义

```typescript
interface User {
    name: string;
    age: number;
    email?: string; // 可选属性
    readonly id: number; // 只读属性
}

// 使用接口
const user: User = {
    name: "张三",
    age: 25,
    id: 1
};
```

### 2. 函数类型接口

```typescript
// 函数接口
interface SearchFunc {
    (source: string, subString: string): boolean;
}

// 实现接口
const mySearch: SearchFunc = function(source: string, subString: string) {
    const result = source.search(subString);
    return result > -1;
};
```

### 3. 可索引接口

```typescript
// 数组接口
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];

// 对象接口
interface Dictionary {
    [key: string]: string;
}

let myDict: Dictionary = {
    "name": "张三",
    "city": "北京"
};
```

### 4. 类接口

```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
}
```

### 5. 接口继承

```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

interface Circle extends Shape {
    radius: number;
}

// 多重继承
interface ColoredSquare extends Square, Circle {
    borderWidth: number;
}
```

### 6. 混合类型接口

```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
```

### 7. 接口合并

```typescript
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

// 等价于
interface Box {
    height: number;
    width: number;
    scale: number;
}
```

### 8. 实际应用场景

```typescript
// API响应接口
interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    success: boolean;
}

// 用户数据接口
interface UserData {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    createdAt: Date;
}

// 使用示例
async function fetchUser(id: number): Promise<ApiResponse<UserData>> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}
```
```

