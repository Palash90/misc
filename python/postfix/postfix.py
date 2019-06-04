from .prescan import pre_scan
from .converter import convert
from .evaluator import evaluate
from .handle_invalid_scenarios import PostfixError

class Postfix:
    def prescan(self, exp):
        try:
            return pre_scan(exp)
        except PostfixError as e:
            raise e

    def convert(self, exp, variables=None):
        try:
            prescanned = pre_scan(exp)
            if variables is None:
                postfix = convert(prescanned, None)
            else:
                postfix = convert(prescanned, variables)
            return postfix
        except PostfixError as e:
            raise e

    def evaluate(self, exp, convert=True, variables=None):
        try:
            if convert==True:
                postfix = self.convert(exp, variables)
            else:
                postfix = exp
            result = evaluate(postfix, variables)
            return result
        except PostfixError as e:
            raise e
