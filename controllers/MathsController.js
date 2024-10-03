import MathModel from '../models/math.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';

export default class ContactsController extends Controller {
    params
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathModel()));
        this.params = HttpContext.path.params;
    }
    get() {
        if (Object.keys(this.params).some(key => key === 'n')) {
            if (this.params.n !== undefined) {
                if (!isNaN(this.params.n) && this.params.n != '' && this.params.n != ' ') {
                    switch (this.params.op) {
                        case '!':
                            if (parseFloat(this.params.n) > 0) {
                                this.params.value = factorial(this.params.n);
                                this.HttpContext.response.JSON(this.params);
                            }
                            else {
                                this.params.error = "n need to be a integrer > 0";
                                this.HttpContext.response.JSON(this.params);
                            }
                            break;
                        case 'p':
                            this.params.value = isPrime(this.params.n);
                            this.HttpContext.response.JSON(this.params);
                            break;
                        case 'np':
                            this.params.value = findPrime(this.params.n);
                            this.HttpContext.response.JSON(this.params);
                            break;
                    }
                }
                else
                {
                    this.params.error = "n need to be a number";
                    this.HttpContext.response.JSON(this.params);
                }
            }
            else{
                this.params.error = "n need to be define";
                this.HttpContext.response.JSON(this.params);
            }
        }
        else if (Object.keys(this.params).some(key => key === 'x')) {
            if (Object.keys(this.params).some(key => key === 'y')) {
                if (this.params.x !== undefined) {
                    if (this.params.y !== undefined) {
                        if (!isNaN(this.params.x) && this.params.x != '' && this.params.x != ' ') {
                            if (!isNaN(this.params.y) && this.params.y != '' && this.params.y != ' ') {

                                switch (this.params.op) {
                                    case ' ':
                                        this.params.op = '+'
                                        this.params.value = addition(this.params.x, this.params.y);
                                        this.HttpContext.response.JSON(this.params);
                                        break;
                                    case '-':
                                        this.params.value = soustraction(this.params.x, this.params.y);
                                        this.HttpContext.response.JSON(this.params);
                                        break;
                                    case '*':
                                        this.params.value = multiplication(this.params.x, this.params.y);
                                        this.HttpContext.response.JSON(this.params);
                                        break;
                                    case '/':
                                        this.params.value = division(this.params.x, this.params.y);
                                        this.HttpContext.response.JSON(this.params);
                                        break;
                                    case '%':
                                        this.params.value = modulo(this.params.x, this.params.y);
                                        this.HttpContext.response.JSON(this.params);
                                        break;
                                }
                            }
                            else {
                                this.params.error = "y need to be a number";
                                this.HttpContext.response.JSON(this.params);
                            }
                        }
                        else {
                            this.params.error = "x need to be a number";
                            this.HttpContext.response.JSON(this.params);
                        }
                    }
                    else {
                        this.params.error = "y need to be define";
                        this.HttpContext.response.JSON(this.params);
                    }
                }
                else {
                    this.params.error = "x need to be define";
                    this.HttpContext.response.JSON(this.params);
                }
            }
            else {
                this.params.error = "y need to be define";
                this.HttpContext.response.JSON(this.params);
            }
        }
        else {
            this.params.error = "x need to be define";
            this.HttpContext.response.JSON(this.params);
        }
    }
}
function addition(x, y) {
    return parseFloat(x) + parseFloat(y);
};
function soustraction(x, y) {
    return parseFloat(x) - parseFloat(y);
};
function multiplication(x, y) {
    return parseFloat(x) * parseFloat(y);
};
function division(x, y) {
    return parseFloat(x) / parseFloat(y);
};
function modulo(x, y) {
    return parseFloat(x) % parseFloat(y);
};
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
function findPrime(n) {
    let primeNumber = 0;
    for (let i = 0; i < n; i++) {
        primeNumber++;
        while (!isPrime(primeNumber)) {
            primeNumber++;
        }
    }
    return primeNumber;
}