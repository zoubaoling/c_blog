## es5 中的类和es6中的class有什么区别
> es5中主要是通过构造函数和原型来定义一个类，es6中通过class关键字来定义

### Class类
1. 必须用new关键字调用，不能直接执行，ES5本质上和普通函数没什么区别
2. 不存在变量提升，在声明之前使用会报错, 函数声明会变量提升
3. class类无法遍历实例原型链上的属性和方法（constructor之外的），比如用for-in遍历
     - 只有在构造函数里创建的属性是自有属性，不会出现在原型上
     - constructor以外的方法是原型上的，等同于`ClassName.prototype.func`
4. class除constructor外的方法不可以使用new调用
5. 类中所有代码都在严格模式下执行，且不可修改为非严格模式
6. 类声明和类表达式
     - `class Foo`，名称为Foo，不存在变量提升
     - `let Foo2 = class {}` `let Foo2 = class Foo {}`,外部使用的名称为Foo2,Foo只能在类内部使用，外部无法访问。使用`let`声明不存在变量提升
     - 立即调用类构造函数`new class{}`
7. 访问器属性getter: get, setter: set
     - 可以在原型上定义访问器属性，不可以与其他属性包括自有属性重名
     - getter: `get name (){}`
     - setter: `set name() {}`,不要直接修改set后的name，往往是处理类中其他属性并返回
8. 可计算属性名，在[]中使用，和对象类似
9. 可以在类中添加生成器（* yield）和迭代器（Symbol.iterator）
10. 静态方法，使用static关键字来修饰方法和属性
      - 静态方法在构造函数上声明，不依赖于实例`Person.fun`,不是`Person.prototype.fun`
      - static不可用于构造函数
      - static成员无法被遍历，for-in Object.keys
      - 静态成员只能通过类名调用ClassName.xx，其他方法this.xx都不可以
      - static方法内只能访问static方法和属性(this.xxx, ClassName.xxx都可以)，可以继承父类的静态属性方法
11. 继承，使用`extends`关键字。继承自其他类的类为派生类，父类为基类
      - 派生类中如果有构造函数，必须执行`super()`,并传入参数，如果没有构造函数，会默认调用
      - super是访问基类的构造函数，super(args)等同于`基类.call(this, args)`
      - 非派生类不可以使用super
      - 派生类构造函数使用this之前必须使用super,负责初始化this
      - 可以通过super调用基类的属性和方法, 派生类同名的属性和方法会覆盖基类，可以用super.xx来调用
      - static属性和方法可以被继承，使用派生类名称来调用
      - 派生类构造函数中`this instance 基类｜派生类`都为true
      - class可以继承具有`[[construct]]`属性和原型的方法，比如ES5的构造函数
12. private,*TS特有* 私有属性，只在类内部使用，子类和实例不可使用
13. protected，*TS特有* 类和子类内部使用，实例不可使用
14. public， *TS特有* 所有地方都可以使用，类内部，子类内部，实例，默认public