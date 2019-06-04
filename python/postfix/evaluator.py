# A python utility to evaluate an Infix expression.
from .all_operators import all_operators
from .handle_invalid_scenarios import handle_invalid_scenario
from .variables_operations import *
from .utils import is_valid_operand

def evaluate(postfix, variables):
    if variables is not None:
        variables = {**default_variables, **variables}
    else:
        variables = default_variables
    stack=[]
    operator =[]
    elements = postfix.split()


    def handle_operation(operator):
        nonlocal stack
        arguments = [];
        operator_definition = all_operators[operator]
        numOfOperand = operator_definition["argument"]
        for x in range(numOfOperand):
            argument  = stack.pop()
            if argument in variables:
                argument = variables[argument]
            check = is_int(argument) or is_float(argument)
            if check == False:
                handle_invalid_scenario("Value Error: invalid value passed", argument)
            arguments.append(float(argument))
        result = perform_operation(operator, arguments)
        stack.append(result)
        
    for element in elements:
        if is_valid_operand(element, variables):
            stack.append(element)
        elif element == ',':
            handle_invalid_scenario("Invalid expression: contains comma")
        elif element in all_operators:
            operator.append(element)
            handle_operation(element)
        else:
            handle_invalid_scenario("Unknown Symbol in expression: " + element)
    
    result = stack[0]
       
    if is_int(stack[0]):
        return int(stack[0])
    else:
        return float(stack[0])
