# TypeScript泛型(Generics)

## 题目
什么是TypeScript泛型？请详细解释泛型的概念、使用方法和实际应用场景。

## 答案

### 1. 泛型基本概念

泛型是TypeScript中创建可重用组件的一种方式，它允许我们创建可以处理多种数据类型的函数、类或接口。

### 2. 泛型函数

```typescript
// 基本泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 使用
let output1 = identity<string>("myString");
let output2 = identity("myString"); // 类型推断

// 泛型函数重载
function processData<T>(data: T[]): T[];
function processData<T>(data: T): T;
function processData<T>(data: T | T[]): T | T[] {
    if (Array.isArray(data)) {
        return data.map(item => item);
    }
    return data;
}
```

### 3. 泛型接口

```typescript
// 基本泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// 实现
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

// 泛型接口约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

### 4. 泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// 泛型约束
class BeeKeeper {
    hasMask: boolean = true;
}

class ZooKeeper {
    nametag: string = "Mikle";
}

class Animal {
    numLegs: number = 4;
}

class Bee extends Animal {
    keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
    keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

### 5. 泛型约束

```typescript
// 使用extends约束泛型
interface Constraint {
    length: number;
}

function getLength<T extends Constraint>(arg: T): number {
    return arg.length;
}

getLength("hello"); // 5
getLength([1, 2, 3]); // 3
// getLength(123); // 错误，number没有length属性

// 多重约束
interface Lengthwise {
    length: number;
}

interface Printable {
    print(): void;
}

function process<T extends Lengthwise & Printable>(arg: T): T {
    console.log(arg.length);
    arg.print();
    return arg;
}
```

### 6. 实际应用场景

```typescript
// 1. 状态管理
interface State<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

class Store<T> {
    private state: State<T> = {
        data: null,
        loading: false,
        error: null
    };

    setState(newState: Partial<State<T>>): void {
        this.state = { ...this.state, ...newState };
    }

    getState(): State<T> {
        return this.state;
    }
}

// 2. API请求封装
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    return response.json();
}

// 使用
interface User {
    id: number;
    name: string;
}

const userData = await fetchData<User>('/api/user/1');

// 3. 缓存系统
class Cache<T> {
    private cache = new Map<string, T>();

    set(key: string, value: T): void {
        this.cache.set(key, value);
    }

    get(key: string): T | undefined {
        return this.cache.get(key);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }
}

// 4. 事件系统
type EventHandler<T> = (data: T) => void;

class EventEmitter<T> {
    private handlers: Map<string, EventHandler<T>[]> = new Map();

    on(event: string, handler: EventHandler<T>): void {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, []);
        }
        this.handlers.get(event)!.push(handler);
    }

    emit(event: string, data: T): void {
        const handlers = this.handlers.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }
}
```

### 7. 高级泛型技巧

```typescript
// 条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

// 映射类型
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 工具类型
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```
```

