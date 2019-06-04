from postfix import Postfix
from math import *
import sys
from testExpressions import tests

# Call the infix to postfix converter to convert the exprression

html = '<html><body><table border="1px solid black"><thead style="background-color: lightgray"><td>Sl. No.</td><td>Original exprression</td><td>Variables</td><td>Prescanned exprression</td><td>Postfix exprression</td><td>Postfix Result</td><td>Eval Result</td><td>Status</td></thead>'

serial = 1

#tests = ["e"]

for exp in tests:
    p = Postfix()

    if isinstance(exp, dict):
        expr = exp.get("exp")
        variables = exp.get("variables", None)
        convert = exp.get("convert", None)
    else:
        expr = exp
        variables = None
        convert = None
    variableStr = str(
        variables) if variables is not None else "No Variable"
    html += "<tr><td>" + format(
        serial
    ) + "</td><td>" + expr + "</td><td>" + variableStr + "</td>"

    try:
        converted = p.prescan(expr)
        html += "<td>" + converted + "</td>"
    except Exception as e:
        html += "<td>" + str(e) + "</td>"
    try:
        postfix = p.convert(expr, variables)
        html += "<td>" + postfix + "</td>"
    except Exception as e:
        html += "<td>" + str(e) + "</td>"
    try:
        result = p.evaluate(expr, convert, variables)
        html += "<td>" + format(result) + "</td>"
    except Exception as e:
       # raise e
        html += "<td>" + str(e) + "</td>"
    try:
        evalresult = eval(exp)
        html += "<td>" + format(evalresult) + "</td>"

        if result == evalresult:
            html += "<td>Passed</td>"
        else:
            html += "<td>Failed</td>"
    except Exception as e:
        html += "<td>"+str(e)+"</td><td>NA</td>"

    html += "</tr>"
    serial += 1

f = open("result.html", "w")
f.write(html)
f.close()
