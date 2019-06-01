from .converter import convert
def evaluate(exp):
    postfix = convert(exp)
    return postfix