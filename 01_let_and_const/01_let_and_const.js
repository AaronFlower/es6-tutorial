// Var 在整个循环中有效。
(function () {
	'use strict'
	var arr = []
	for (var i = 0; i < 10; i++) {
		arr[i] = () => {console.log('Index i:', i)}
	}
	arr[0]()
	arr[5]()
})(); 
// Let 仅在一次循环中有效。
(function () {
	'use strict'
	var arr = []
	for (let i = 0; i < 10; i++) {
		arr[i] = () => {console.log('Index i:', i)}
	}
	arr[0]()
	arr[5]()
})(); 

/**
 * 只要块级作用域存在 let,const 命令，那么它所声明的变量，常量就绑定在这个区域，不再受外部影响。
 * 这就是所谓的 TDZ(Temporay Dead Zone), 临时死区。
 * 总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
 */
// ES6引入了块级作用域，明确允许在块级作用域之中声明函数。
// 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
(function () {
	'use strict'
	if (true) {
		var f = function () {
			console.log('function...')			
		}
	}
	f()
	if (true) {
		let foo = () => {console.log('Foo...')}
		foo()
	}
	// foo() ReferenceError: foo is not defined  , 因为 foo是在块级作用域中定义的。 {}
})(); 


/**
 * const 指令，一旦声明，常量的值就不能改变。
 * const一旦声明变量，就必须立即初始化，不能留到以后赋值。
 *
 * 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。
 * const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。
 */
(function () {
	'use strict'
	const PI = 3.14
	console.log('PI:', PI)
	// PI = 3; TypeError: Assignment to constant variable.
	
	const Foo = {a: 'Apple', c:{c: 'Cat'}}
	Foo.b = 'Banana'
	console.log(Object.keys(Foo)) 

	// 如果真的想将对象冻结，应该使用Object.freeze方法。
	// 注意除了，冻结对象本身之外，对象的属性也要冻结。下面是一个完整的冻结函数。
	var constantize = (obj) => {
		Object.freeze(obj)
		Object.keys(obj).forEach((key) => {
			if (typeof obj[key] === 'object') {
				constantize(obj[key])
			}
		})
	}
	constantize(Foo)
	// Foo.c.c = 'Canada' // TypeError: Cannot assign to read only property 'c' of object '#<Object>'
	console.log(Foo.c.c)

})(); 