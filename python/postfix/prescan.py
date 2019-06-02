#Prescan the expression to correctly identify the negation and subtraction
from .all_operators import all_operators
from .handle_invalid_scenarios import handle_invalid_scenario


def pre_scan(exp):
    exp = exp.replace(" ", "")
    expr = ''
    segment = False

    for idx, letter in enumerate(exp):
        if letter == '-':
            #Write all the logic for negation and subtraction
            if idx == 0:
                expr += "0" + letter
            elif exp[idx - 1] == "(":
                expr += "0" + letter
            elif exp[idx - 1] in all_operators and exp[idx - 1] == "-":
                expr = expr[:-1] + '+'
            elif exp[idx - 1] in all_operators and exp[idx - 1] != ")":
                expr += "(0" + letter
                segment = True
            else:
                expr += letter
        elif letter == '+':
            #Write all the logic for positive number and addition
            if idx == 0:
                continue
            elif exp[idx - 1] == "(":
                continue
            elif exp[idx - 1] in all_operators and exp[idx - 1] == "+":
                continue
            elif exp[idx - 1] in all_operators and exp[idx - 1] != ")":
                continue
            else:
                expr += letter

        else:
            check = True
            if letter in all_operators and segment:
                expr += ")"
                segment = False
            elif segment and idx == len(exp) - 1:
                expr += letter + ")"
                check = False
            if check:
                expr += letter

    if len(expr) > 0:
        endsWith = exp[-1]
        if endsWith in all_operators and endsWith != ")":
            handle_invalid_scenario(
                "Expresssion Error: ends with an operator - '" + exp + "'")
    exp = expr

    return exp


#End of prescan