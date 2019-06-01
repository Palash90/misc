# A python utility to evaluate an Infix expression.
from .prescan import pre_scan
from .all_operators import all_operators
from .postfix_exception import PostfixException


def is_float(x):
    try:
        a = float(x)
    except ValueError:
        return False
    else:
        return True


def is_int(x):
    try:
        a = float(x)
        b = int(a)
    except ValueError:
        return False
    else:
        return a == b


def is_valid_operand(operand):
    operand = operand.strip()
    return is_float(operand) or is_int(operand) or len(operand) == 0


def handle_invalid_scenario(msg):
    raise PostFixException(msg)


def convert(exp):
    expr = pre_scan(exp)

    operands = []
    stack = []
    operand = ""
    postFix = ""
    stack.append('(')
    return expr

    def add_operand():
        nonlocal postFix, operand
        operand = operand.strip()
        if is_valid_operand(operand):
            operands.append(operand)
            postFix += operand + " "
            return True
        else:
            return False

    def add_operator(operator):
        nonlocal stack
        if operator in allOperators:
            if operator == '(':
                stack.append(operator)
            elif operator == 'log':
                print("Need to write algo for log")
            return True
        else:
            return False


'''
    if exp[-1] in allOperators and exp[-1] != ')':
        handle_invalid_scenario(
            "Expression ends with an operator, which is invalid. System will exit"
        )
    exp += ')'

    for letter in exp:
        if letter in allOperators:
            #Some operators can be more than one letter. So, checking if that is an operator
            check = add_operand() or add_operator(operand)
            if not check:
                handle_invalid_scenario("Invalid input " + operand)
            operand = ""
        else:
            operand += letter
    add_operand()
'''
