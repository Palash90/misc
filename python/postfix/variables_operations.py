from math import *
from .utils import *
from .handle_invalid_scenarios import handle_invalid_scenario
default_variables = {"pi": pi, "e": e, "tau": 2 * pi}


def perform_operation(operator, arguments):

    if operator == '+':
        return arguments[1] + arguments[0]
    elif operator == '-':
        return arguments[1] - arguments[0]
    elif operator == '*':
        return arguments[1] * arguments[0]
    elif operator == '/':
        return arguments[1] / arguments[0]
    elif operator == '%':
        return arguments[1] % arguments[0]
    elif operator == '^':
        return arguments[1]**arguments[0]
    elif operator == 'abs':
        return abs(arguments[0])
    elif operator == 'ceil':
        return ceil(arguments[0])
    elif operator == 'factorial':
        if is_int(arguments[0]) == False:
            handle_invalid_scenario(
                "Value Error: " + argument[0] +
                ". Factorial calculation can only be done for integers.")
        return factorial(int(arguments[0]))
    elif operator == 'floor':
        return floor(arguments[0])
    elif operator == 'gcd':
        return gcd(arguments[1], arguments[1])
        '''
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

perform_operation("x", "s"
'''