# A python utility to evaluate an Infix expression.
from .all_operators import all_operators
from .handle_invalid_scenarios import handle_invalid_scenario
from .variables_operations import default_variables
from .utils import is_valid_operand

def evaluate(postfix, variables):
    if variables is not None:
        variables = {**default_variables, **variables}
    else:
        variables = default_variables
    print()
    print("Evaluating Postfix", postfix, "variables", variables)
    stack=[]
    operator =[]
    elements = postfix.split()


    def handle_operation(operator):
        

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
        

    print("Segments", elements, stack, operator)
