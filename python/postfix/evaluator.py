# A python utility to evaluate an Infix expression.
from all_operators import all_operators
from handle_invalid_scenarios import handle_invalid_scenario
from variables_operations import *
from utils import is_valid_operand
from converter import convert

def evaluate(postfix, variables):
    if variables is not None:
        variables = {**default_variables, **variables}
    else:
        variables = default_variables
    stack=[]
    elements = postfix.split()

    def check_postfix():
        counter = 0
        for element in elements:
            if is_valid_operand(element, variables):
                counter += 1
                if counter < 0:
                    break
            elif element == ',' or element == "(" or element == ")":
                handle_invalid_scenario("Invalid Postfix Notation: Contains ',' or '(' or ')'")
            elif element in all_operators:
                operator_definition = all_operators[element]
                numOfOperand = operator_definition["argument"]
                counter -= numOfOperand
                if counter < 0:
                    break    
                counter += 1
            else:
                handle_invalid_scenario("Unknown Symbol in expression: " + element)
        if counter < 0:
            handle_invalid_scenario("Invalid Postfix Notation: Causes Stack Underflow - " + postfix)
        elif counter != 1:
            handle_invalid_scenario("Invalid Postfix Notation: Stack not 1")
                
        return True


    def handle_expression(argument):
        expr = argument.get("exp")
        expVariables = argument.get("variables", None)
        expConvert = argument.get("convert", None)
        if isinstance(expr, dict):
            return handle_expression(expr)
        else:
            if expConvert is None or expConvert==True:
                convertedExp = convert(expr, expVariables)
                value = evaluate(convertedExp, expVariables)
            else:
                value = evaluate(expr, expVariables)
                
        return value
        


    def handle_operation(operator):
        nonlocal stack
        arguments = []
        operator_definition = all_operators[operator]
        numOfOperand = operator_definition["argument"]
        for x in range(numOfOperand):
            argument  = stack.pop()

            if argument in variables:
                argument = variables[argument]
            if isinstance(argument, dict):
                value =handle_expression(argument)
            elif is_float(argument):
                value = float(argument)
            elif is_int(argument):
                value = int(argument)
            elif isinstance(argument, str):
                convertedExp = convert(argument, None)
                value = evaluate(convertedExp, None)
            else:
                value = argument
            check = is_int(argument) or is_float(argument)
            if check == False and value is None:
                handle_invalid_scenario("Value Error: invalid value passed: " + argument)
            arguments.append(float(value))
        result = perform_operation(operator, arguments)
        stack.append(result)

    check_postfix()
    for element in elements:
        if is_valid_operand(element, variables):
            stack.append(element)
        elif element == ',':
            handle_invalid_scenario("Invalid expression: contains comma")
        elif element in all_operators:
            handle_operation(element)
        else:
            handle_invalid_scenario("Unknown Symbol in expression: " + element)
    
    result = stack[0]
    
    if isinstance(result, str):
        return variables[result]
    if is_int(result):
        return int(result)
    else:
        return float(result)
