import postfix.postfix as p
import math as m
#Call the infix to postfix converter to convert the expression
tests = [
    "-", "-2", "-9*-4", "-2--7", "2+-7", "-(2*7*-7)-8", "-(2*7*-7)*-8",
    "-(2*7*-7)*(-8)", "-(2*7*-7)*m.cos(-8)", "-(2*7*(-7))*m.cos(-8)",
    "-(2*7*(-7))*m.atan(-8)", "-(2 + 7)", "4 * -8", " 4*  - 8 ", " 2 *(-4 +8)",
    "1-4", "1 - 4 ", " 4*8 - 2", " 4 -  +2", " 4 +  -2", "+++++"
    "+", "+2", "+9*+4", "+2-+7", "2++7", "+(2*7*+7)+8", "+(2*7*+7)*+8",
    "+(2*7*+7)*(+8)", "+(2*7*+7)*m.cos(+8)", "+(2*7*(+7))*m.cos(+8)",
    "+(2*7*(+7))*m.atan(+8)", "+(2 + 7)", "4 * +8", " 4*  + 8 ", " 2 *(+4 +8)",
    "1+4", "1 + 4 ", " 4*8 + 2", " 4 +  +2"
]

html = '<html><body><table border="1px solid black"><thead><td>Original Expression</td><td>Converted Expression</td><td>Result</td></thead>'

for exp in tests:
    converted = p.evaluate(exp)
    html += "<tr><td>" + exp + "</td><td>" + converted + "</td>"
    try:
        if eval(converted) == eval(exp):
            html += "<td>Passed</td>"
        else:
            html += "<td>Failed</td>"
    except Exception:
        html += "<td>Evaluation failed</td>"
    html += "</tr>"

f = open("result.html", "w")
f.write(html)
f.close()
#print(html)
