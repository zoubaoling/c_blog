# TypeScript装饰器(Decorators)

## 题目
请详细解释TypeScript装饰器的概念、类型和使用方法。

## 答案

### 1. 装饰器基本概念

装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上。装饰器使用 `@expression` 这种形式，expression求值后必须为一个函数。

### 2. 类装饰器

```typescript
// 基本类装饰器
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

// 带参数的类装饰器
function logger(prefix: string) {
    return function (constructor: Function) {
        console.log(`${prefix} - Class ${constructor.name} is being instantiated`);
    };
}

@logger("DEBUG")
class Example {
    constructor() {
        console.log("Example instance created");
    }
}

// 类装饰器工厂
function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    };
}

@classDecorator
class Greeter2 {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}
```

### 3. 方法装饰器

```typescript
// 基本方法装饰器
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };
    
    return descriptor;
}

class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

// 带参数的方法装饰器
function validate(min: number, max: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = function (...args: any[]) {
            const value = args[0];
            if (value < min || value > max) {
                throw new Error(`Value must be between ${min} and ${max}`);
            }
            return originalMethod.apply(this, args);
        };
        
        return descriptor;
    };
}

class User {
    @validate(0, 120)
    setAge(age: number) {
        this.age = age;
    }
}
```

### 4. 属性装饰器

```typescript
// 基本属性装饰器
function readonly(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        writable: false,
        configurable: false
    });
}

class Example2 {
    @readonly
    name: string = "John";
}

// 属性装饰器工厂
function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        let value = target[propertyKey];
        
        const getter = function() {
            return value;
        };
        
        const setter = function(newVal: string) {
            value = formatString.replace('{value}', newVal);
        };
        
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}

class Message {
    @format("Hello, {value}!")
    greeting: string = "World";
}
```

### 5. 参数装饰器

```typescript
// 基本参数装饰器
function parameterDecorator(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`Parameter ${parameterIndex} of method ${propertyKey} is decorated`);
}

class Example3 {
    method(@parameterDecorator param1: string, @parameterDecorator param2: number) {
        // method body
    }
}

// 参数验证装饰器
function validateParameter(target: any, propertyKey: string, parameterIndex: number) {
    const originalMethod = target[propertyKey];
    
    target[propertyKey] = function (...args: any[]) {
        const param = args[parameterIndex];
        if (param === undefined || param === null) {
            throw new Error(`Parameter ${parameterIndex} is required`);
        }
        return originalMethod.apply(this, args);
    };
}

class Example4 {
    method(@validateParameter name: string, @validateParameter age: number) {
        console.log(`Name: ${name}, Age: ${age}`);
    }
}
```

### 6. 装饰器组合

```typescript
// 多个装饰器
function first() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("first(): called");
    };
}

function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("second(): called");
    };
}

class Example5 {
    @first()
    @second()
    method() {}
}

// 执行顺序：从下到上，从右到左
// 输出：
// second(): factory evaluated
// first(): factory evaluated
// first(): called
// second(): called
```

### 7. 实际应用场景

```typescript
// 1. 缓存装饰器
function cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cacheMap = new Map();
    
    descriptor.value = function (...args: any[]) {
        const key = JSON.stringify(args);
        if (cacheMap.has(key)) {
            return cacheMap.get(key);
        }
        const result = originalMethod.apply(this, args);
        cacheMap.set(key, result);
        return result;
    };
    
    return descriptor;
}

class DataService {
    @cache
    async fetchUser(id: number) {
        // 模拟API调用
        return { id, name: `User ${id}` };
    }
}

// 2. 性能监控装饰器
function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`${propertyKey} took ${end - start} milliseconds`);
        return result;
    };
    
    return descriptor;
}

class PerformanceTest {
    @measure
    expensiveOperation() {
        // 模拟耗时操作
        for (let i = 0; i < 1000000; i++) {
            Math.random();
        }
    }
}

// 3. 权限控制装饰器
function requireRole(role: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = function (...args: any[]) {
            const userRole = this.currentUser?.role;
            if (userRole !== role) {
                throw new Error(`Access denied. Required role: ${role}`);
            }
            return originalMethod.apply(this, args);
        };
        
        return descriptor;
    };
}

class AdminService {
    @requireRole('admin')
    deleteUser(userId: number) {
        console.log(`Deleting user ${userId}`);
    }
}
```

### 8. 装饰器元数据

```typescript
// 需要启用 emitDecoratorMetadata 选项
import "reflect-metadata";

function type(type: any) {
    return Reflect.metadata("design:type", type);
}

function paramTypes(...types: any[]) {
    return Reflect.metadata("design:paramtypes", types);
}

function returnType(type: any) {
    return Reflect.metadata("design:returntype", type);
}

class Example6 {
    @type(String)
    @paramTypes(String, Number)
    @returnType(String)
    method(name: string, age: number): string {
        return `Name: ${name}, Age: ${age}`;
    }
}
```
