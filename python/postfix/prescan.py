#Prescan the expression to correctly identify the negation and subtraction
from .all_operators import all_operators


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
    exp = expr
    return exp
    #End of prescan