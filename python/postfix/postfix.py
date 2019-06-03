from .prescan import pre_scan
from .converter import convert
from .evaluator import evaluate


class Postfix:
    def prescan(self, exp):
        try:
            return pre_scan(exp)
        except Exception as e:
            return str(e)

    def evaluate(self, exp, variables=None):
        try:
            prescanned = pre_scan(exp)
            if variables is None:
                postfix = convert(prescanned, None)
            else:
                postfix = convert(prescanned, variables)
            result = evaluate(postfix, variables)
            return postfix
        except Exception as e:
            return str(e)