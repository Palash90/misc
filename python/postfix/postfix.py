# A python utility to evaluate an Infix expression.
allOperators = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "%": 2,
    "root": 2,
    "^": 2,
    "log": 2,
    "sqrt": 1,
    "fact": 1,
    "ln": 1,
    "Log": 1,
    "abs": 1,
    "sin": 1,
    "cos": 1,
    "tan": 1,
    "(": 1,
    ")": 1
}


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
    print(msg)
    print("System will exit")
    sys.exit(0)


def infix_to_postfix(exp):
    print("Evaluating", exp)
    

    #Prescan the expression to correctly identify the negation and subtraction
    newExp = list(exp)
    expr = ''
    segment = False

    for idx, letter in enumerate(exp):
        if letter == '-':
            #Write all the logic for negation and subtraction
            if idx == 0:
                expr += "0" + letter
            elif exp[idx - 1] == "(":
                expr += "0" + letter
            elif exp[idx - 1] in allOperators and exp[idx - 1] != ")":
                expr += "(0" + letter
                segment = True
            else:
                expr += letter

        else:
            if letter in allOperators and segment:
                expr += ")"
                segment = False
            newExp += letter
            expr += letter
    exp = expr

    print("Changed Expression", exp)
   
    #End of prescan

    operands = []
    stack = []
    operand = ""
    postFix = ""
    stack.append('(')

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

    return exp