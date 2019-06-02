from .prescan import pre_scan
from .converter import convert


class Postfix:
    def prescan(self, exp):
        try:
            return pre_scan(exp)
        except Exception as e:
            print(e)
            return str(e)

    def evaluate(self, exp, variables=None):
        try:
            prescanned = pre_scan(exp)
            if variables is None:
                postfix = convert(prescanned, None)
            else:
                postfix = convert(prescanned, variables)
            print(exp, variables, postfix, "converted")
            return postfix
        except Exception as e:
            print("Line 22: " + str(e))
            return str(e)