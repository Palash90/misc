from math import *
default_variables = {"pi": pi, "e": e, "tau": 2 * pi}


def perform_operation(operator, arguments):
    if operator == '+':
        return float(arguments[1]) + float(arguments[0])
    elif operator == '-':
        return float(arguments[1]) - float(arguments[0])
    elif operator == '*':
        return float(arguments[1]) * float(arguments[0])
    elif operator == '/':
        return float(arguments[1]) / float(arguments[0])
    elif operator == '%':
        return float(arguments[1]) % float(arguments[0])
    elif operator == '^':
        return float(arguments[1])**float(arguments[0])
    elif operator == 'abs':
        return abs(arguments[0])


'''
    elif operator == 'ceil':
    elif operator == 'fact':
    elif operator == 'floor':
    elif operator == 'gcd':
    elif operator == 'exp':
    elif operator == 'pow':
    elif operator == 'sqrt':
    elif operator == 'log':
    elif operator == 'ln':
    elif operator == 'log2':
    elif operator == 'sin':
    elif operator == 'cos':
    elif operator == 'tan':
    elif operator == 'asin':
    elif operator == 'acos':
    elif operator == 'atan':
    elif operator == 'sinh':
    elif operator == 'cosh':
    elif operator == 'tanh':
    elif operator == 'asinh':
    elif operator == 'acosh':
    elif operator == 'atanh':
    elif operator == 'hypot':
    elif operator == 'deg':
    elif operator == 'rad':

perform_operation("x", "s")
'''