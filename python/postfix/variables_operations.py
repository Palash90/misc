from math import *
from .utils import *
from .handle_invalid_scenarios import handle_invalid_scenario
default_variables = {"pi": pi, "e": e, "tau": 2 * pi}


def perform_operation(operator, arg):

    if operator == '+':
        return arg[1] + arg[0]
    elif operator == '-':
        return arg[1] - arg[0]
    elif operator == '*':
        return arg[1] * arg[0]
    elif operator == '/':
        return arg[1] / arg[0]
    elif operator == '%':
        return arg[1] % arg[0]
    elif operator == '^':
        return arg[1]**arg[0]
    elif operator == 'abs':
        return abs(arg[0])
    elif operator == 'ceil':
        return ceil(arg[0])
    elif operator == 'factorial':
        if is_int(arg[0]) == False:
            handle_invalid_scenario(
                "Value Error: " + format(arg[0]) +
                ". Factorial calculation can only be done for integers.")
        return factorial(int(arg[0]))
    elif operator == 'floor':
        return floor(arg[0])
    elif operator == 'gcd':
        if (is_int(arg[0]) == False) or (is_int(arg[1]) == False):
            handle_invalid_scenario(
                "Value Error: " + format(arg[0]) + " , " +
                format(arg[1]) +
                ". GCD can only be determined for integers.")
        return gcd(int(arg[1]), int(arg[0]))
    elif operator == 'exp':
        return exp(arg[0])
    elif operator == 'pow':
        return pow(arg[1], arg[0])
    elif operator == 'sqrt':
        return sqrt(arg[0])
    elif operator == 'log':
        return log10(arg[0])
    elif operator == 'ln':
        return log(arg[0])
    elif operator == 'log2':
        return log2(arg[0])
    elif operator == 'Log':
        return log(arg[1], arg[0])
    '''
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

perform_operation("x", "s"
'''