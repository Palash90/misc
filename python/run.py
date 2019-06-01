import postfix.postfix as p
import sys
#Call the infix to postfix converter to convert the expression
exp = sys.argv[1]
print(eval(exp))
print(p.infix_to_postfix(exp))