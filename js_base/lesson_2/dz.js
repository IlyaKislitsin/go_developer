// 1. Дан код. Почему он даёт именно такие результаты?
    console.log("Задание 1");
    let a = 1, b = 1, c, d;
    c = ++a; console.log(c);           // 2
    // Префиксная форма инкремента => сначала a = 1 + 1 (2), затем с = 2.
    // После операции a === 2, c === 2.

    d = b++; console.log(d);           // 1
    // Постфиксная форма инкремента => сначала d = 1, затем b = 1 + 1.
    // После операции d === 1, b === 2.

    c = (2+ ++a); console.log(c);      // 5
    // Последовательность действий: 1. инкремент -> 2. сложение -> 3. присваивание.
    // 1) префиксная форма инкремента, a = 2 + 1 (3)
    // 2) сложение 2 + 3 (5)
    // 3) присваивание с = 5
    // После операции a === 3, c === 5.

    d = (2+ b++); console.log(d);      // 4
    // Последовательность действий: 1. сложение -> 2. инкремент -> 3. присваивание.
    // 1) сложение 2 + 2 (4)
    // 2) постфиксная форма инкремента, b = 2 + 1 (3)
    // 3) присваивание d = 4
    // После операции b === 3, d === 4.

    console.log(a);                    // 3
    console.log(b);                    // 3

// 2. Чему будет равен x в примере ниже?
    console.log("Задание 2");
    let y = 2;
    let x = 1 + (y *= 2);
    // x будер равен 5. пример равносилен записи 1 + (2 * 2). После операции a === 4

    console.log(x);

// 3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения.
//    Затем написать скрипт, который работает по следующему принципу:
//    если a и b положительные, вывести их разность;
//    если а и b отрицательные, вывести их произведение;
//    если а и b разных знаков, вывести их сумму;
//    ноль можно считать положительным числом.

    function task3(a, b) {
        if (a >= 0 && b >= 0) {
            console.log('Разность: ' + (a - b));
        } else if (a < 0 && b < 0) {
            console.log('Произведение: ' + (a * b));
        } else {
            console.log('Сумма: ' + (a + b));
        }
    }

    console.log("Задание 3");
    task3(5, 8);
    task3(-5, -8);
    task3(-5, 8);

// 4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

    function task4() {
        const a = 7;

        switch (a) {
            case 0:
                console.log(0);
            case 1:
                console.log(1);
            case 2:
                console.log(2);
            case 3:
                console.log(3);
            case 4:
                console.log(4);
            case 5:
                console.log(5);
            case 6:
                console.log(6);
            case 7:
                console.log(7);
            case 8:
                console.log(8);
            case 9:
                console.log(9);
            case 10:
                console.log(10);
            case 11:
                console.log(11);
            case 12:
                console.log(12);
            case 13:
                console.log(13);
            case 14:
                console.log(14);
            case 15:
                console.log(15);
                break;
            default:
                console.log('a number ' + a + ' not in the range from 0 to 15');
        }
    }

    console.log("Задание 4");
    task4();

// 5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.

    function sum(x, y) {
        const result = x + y;
        console.log('Сумма: ' + result);
        return result;
    }

    function subtraction(x, y) {
        const result = x - y;
        console.log('Разность: ' + result);
        return result;
    }

    function multiplication(x, y) {
        const result = x * y;
        console.log('Произведение: ' + result);
        return result;
    }

    function division(x, y) {
        if (y === 0) {
            console.log('Результат деления: Ошибка. На ноль делить нельзя.');
            return ;
        }
        const result = x / y;
        console.log('Результат деления: ' + result);
        return result;
    }

// 6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
//    где arg1, arg2 – значения аргументов, operation – строка с названием операции.
//    В зависимости от переданного значения операции выполнить одну из арифметических операций
//    (использовать функции из пункта 3) и вернуть полученное значение (использовать switch).

    function mathOperation(arg1, arg2, operation) {
        switch (operation) {
            case '+':
                return sum(arg1, arg2);
            case '-':
                return subtraction(arg1, arg2);
            case '*':
                return multiplication(arg1, arg2);
            case '/':
                return division(arg1, arg2);
            default:
                console.log('unknown operation');
        }
        
        return null;
    }

    console.log("Задание 5, 6");
    mathOperation(9, -35, '+');
    mathOperation(9, -35, '-');
    mathOperation(9, -35, '*');
    mathOperation(9, -35, '/');

// 7. *Сравнить null и 0. Попробуйте объяснить результат.

    console.log("Задание 7");
    console.log(null == 0); // false. Согласно спецификации, сравнение такого типа не подходит ни  под одно правило => возвращается false
    console.log(null > 0); // false. Т.к. один из операндов число, мы пытаемся второй привести к числу => null приводится к 0 и просходит сравнение 0 > 0 => возвращается false
    console.log(null >= 0); // true. По спецификации вместо сравнения >=, производится сравнение null < 0. Его результат false, по правилу выше.
                            // Дальше логика такая: если (null < 0) === false, то (null >= 0) === true( если что-то не меньше ноля, значит оно больше или равно нолю).

// 8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.

    function power(val, pow) {
        if (!Number.isInteger(pow) || pow < 0) {
            console.log('Степень должна быть натуральным числом');
            return ;
        }

        if (pow === 0) {
            return 1;
        }

        if (pow === 1) {
            return val;
        }

        return val * power(val, pow - 1);
    }

    console.log("Задание 8");
    console.log(power(3, 10));
