from postfix.postfix import Postfix
from math import *
import sys

#Call the infix to postfix converter to convert the exprression
'''
tests = [
    "-", "-2", "-9*-4", "-2--7", "2+-7", "-(2*7*-7)-8", "-(2*7*-7)*-8",
    "-(2*7*-7)*(-8)", "-(2*7*-7)*cos(-8)", "-(2*7*(-7))*cos(-8)",
    "-(2*7*(-7))*atan(-8)", "-(2 + 7)", "4 * -8", " 4*  - 8 ", " 2 *(-4 +8)",
    "1-4", "1 - 4 ", " 4*8 - 2", " 4 -  +2", " 4 +  -2", "+++++", "------",
    "+", "+2", "+9*+4", "+2-+7", "2++7", "+(2*7*+7)+8", "+(2*7*+7)*+8",
    "+(2*7*+7)*(+8)", "+(2*7*+7)*cos(+8)", "+(2*7*(+7))*cos(+8)",
    "+(2*7*(+7))*atan(+8)", "+(2 + 7)", "4 * +8", " 4*  + 8 ", " 2 *(+4 +8)",
    "1+4", "1 + 4 ", " 4*8 + 2", " 4 +  +2", "4+log(5)", "", "2+3-4/5*9",
    "2+3*log(9)-", {
        "exp": "2*x-t*y",
        "variables": {
            "x": 1,
            "t": 1
        }
    }, {
        "exp": "2*x-t*y",
        "variables": {
            "x": 1,
            "t": 1,
            "y": 1
        }
    }
    "2*4-3"
]
'''
tests = ["2.445*4-3.9*log(5)"]
html = '<html><body><table border="1px solid black"><thead style="background-color: lightgray"><td>Original exprression</td><td>Variables</td><td>Prescanned exprression</td><td>Postfix exprression</td><td>Status</td><td>Result</td></thead>'

for exp in tests:
    p = Postfix()

    if isinstance(exp, dict):
        expr = exp["exp"]
        variables = exp["variables"]
    else:
        expr = exp
        variables = None
    converted = p.prescan(expr)
    postfix = p.evaluate(expr, variables)
    variableStr = str(variables) if variables is not None else "No Variable"
    html += "<tr><td>" + expr + "</td><td>" + variableStr + "</td><td>" + converted + "</td><td>" + postfix + "</td>"
    try:
        if eval(converted) == eval(expr):
            result = eval(expr)
            html += "<td>Passed</td><td>" + format(result) + "</td>"
        else:
            html += "<td>Failed</td><td>NA</td>"
    except:
        html += "<td>Evaluation failed</td><td>NA</td>"
    html += "</tr>"

f = open("result.html", "w")
f.write(html)
f.close()
