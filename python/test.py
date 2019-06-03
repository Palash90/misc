from postfix.postfix import Postfix
from math import *
import sys

#Call the infix to postfix converter to convert the exprression
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
    }, "2*4-3", "cos(5)", "2.445*4-3.9*log(5, 10)", "2*4-3*log(5, 10)",
    "((((ln(1)+2)*3)-cos((sqrt(4)+5)))+(sqrt(ln((6*4)))+4))",
    "2*3-2*8*5/2%3*abs(-4)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2)*factorial(2)",
    "factorial(2)*2*3-2*8*5/2%3*abs(-4)*ceil(2)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2.8)*factorial(2)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2.8)*factorial(2)*gcd(5,15)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2.8)*factorial(2)*gcd(5.2,15)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2.8)*factorial(1.2)*gcd(5,15)",
    "2*3-2*8*5/2*exp(2)",
    "2*pow(2,3)",
    "2*pow(2,3)*sqrt(4)",
    "2*pow(2,3)*log(1000)",
    "2*pow(2,3)*log2(16)",
    "2*pow(2,3)*Log(16, 2)",
    "2*pow(2,3)*ln(e^2)",
    "-(2*7*-7)*sin(-8)",
    "-(2*7*-7)*tan(-8)",
    "-(2*7*-7)*sinh(-8)",
    "-(2*7*-7)*cosh(-8)",
    "-(2*7*-7)*tanh(-8)",
    "-(2*7*-7)*atan(-8)",
    "-(2*7*-7)*asin(-8)",
    "-(2*7*-7)*acos(-8)",
    "-(2*7*-7)*asin(-.8)",
    "-(2*7*-7)*acos(-.8)",
    "-(2*7*-7)*atanh(-8)",
    "-(2*7*-7)*asinh(-8)",
    "-(2*7*-7)*acosh(-8)",
    "hypot(4,3)",
    "deg(pi/3)",
    "rad(60)"
]
html = '<html><body><table border="1px solid black"><thead style="background-color: lightgray"><td>Sl. No.</td><td>Original exprression</td><td>Variables</td><td>Prescanned exprression</td><td>Postfix exprression</td><td>Postfix Result</td><td>Eval Result</td><td>Status</td></thead>'

serial = 1

for exp in tests:
    p = Postfix()

    if isinstance(exp, dict):
        expr = exp["exp"]
        variables = exp["variables"]
    else:
        expr = exp
        variables = None
    converted = p.prescan(expr)
    postfix = p.convert(expr, variables)
    variableStr = str(variables) if variables is not None else "No Variable"
    html += "<tr><td>" + format(
        serial
    ) + "</td><td>" + expr + "</td><td>" + variableStr + "</td><td>" + converted + "</td><td>" + postfix + "</td>"
    try:
        result = p.evaluate(converted, variables)
        html += "<td>" + format(result) + "</td><td>" + format(
            eval(exp)) + "</td>"
        if result == eval(expr):
            html += "<td>Passed</td>"
        else:
            html += "<td>Failed</td>"
    except:
        print(result)
        html += "<td>" + format(
            result) + "</td><td>NA</td><td>Evaluation failed</td>"
    html += "</tr>"
    serial += 1

f = open("result.html", "w")
f.write(html)
f.close()
