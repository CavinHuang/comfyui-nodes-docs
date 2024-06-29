# Math Expression 🐍
## Documentation
- Class name: MathExpression|pysssss
- Category: utils
- Output node: True
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

MathExpression节点允许评估数学表达式，包括基本的算术运算、函数调用和变量引用。它支持动态和灵活的数学操作，用户可以输入包含预定义变量并使用各种数学函数的表达式。

## Input types
### Required
- expression
    - 要评估的数学表达式。支持算术运算、函数调用和变量引用。其灵活性允许基于输入进行动态计算。
    - Comfy dtype: STRING
    - Python dtype: str

### Optional
- a
    - 可以在表达式中引用的可选变量。支持整数、浮点数、图像和潜在类型，增加了数学运算的多样性。
    - Comfy dtype: INT,FLOAT,IMAGE,LATENT
    - Python dtype: Union[int, float, object]
- b
    - 类似于'a'的可选变量，为表达式提供了额外的参考点，以进行更复杂的计算。
    - Comfy dtype: INT,FLOAT,IMAGE,LATENT
    - Python dtype: Union[int, float, object]
- c
    - 作为表达式中的另一个参考点的可选变量，进一步扩展了计算的可能性。
    - Comfy dtype: INT,FLOAT,IMAGE,LATENT
    - Python dtype: Union[int, float, object]

## Output types
- int
    - Comfy dtype: INT
    - unknown
    - Python dtype: unknown
- float
    - Comfy dtype: FLOAT
    - unknown
    - Python dtype: unknown
- ui
    - 提供一个用户界面元素来显示数学表达式评估的结果。

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class MathExpression:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "expression": ("STRING", {"multiline": True, "dynamicPrompts": False, "pysssss.autocomplete": {
                    "words": autocompleteWords,
                    "separator": ""
                }}),
            },
            "optional": {
                "a": ("INT,FLOAT,IMAGE,LATENT", ),
                "b": ("INT,FLOAT,IMAGE,LATENT",),
                "c": ("INT,FLOAT,IMAGE,LATENT", ),
            },
            "hidden": {"extra_pnginfo": "EXTRA_PNGINFO",
                       "prompt": "PROMPT"},
        }

    RETURN_TYPES = ("INT", "FLOAT", )
    FUNCTION = "evaluate"
    CATEGORY = "utils"
    OUTPUT_NODE = True

    @classmethod
    def IS_CHANGED(s, expression, **kwargs):
        if "random" in expression:
            return float("nan")
        return expression

    def get_widget_value(self, extra_pnginfo, prompt, node_name, widget_name):
        workflow = extra_pnginfo["workflow"] if "workflow" in extra_pnginfo else { "nodes": [] }
        node_id = None
        for node in workflow["nodes"]:
            name = node["type"]
            if "properties" in node:
                if "Node name for S&R" in node["properties"]:
                    name = node["properties"]["Node name for S&R"]
            if name == node_name:
                node_id = node["id"]
                break
            if "title" in node:
                name = node["title"]
            if name == node_name:
                node_id = node["id"]
                break
        if node_id is not None:
            values = prompt[str(node_id)]
            if "inputs" in values:
                if widget_name in values["inputs"]:
                    return values["inputs"][widget_name]
            raise NameError(f"Widget not found: {node_name}.{widget_name}")
        raise NameError(f"Node not found: {node_name}.{widget_name}")

    def get_size(self, target, property):
        if isinstance(target, dict) and "samples" in target:
            # Latent
            if property == "width":
                return target["samples"].shape[3] * 8
            return target["samples"].shape[2] * 8
        else:
            # Image
            if property == "width":
                return target.shape[2]
            return target.shape[1]

    def evaluate(self, expression, prompt, extra_pnginfo={}, a=None, b=None, c=None):
        expression = expression.replace('\n', ' ').replace('\r', '')
        node = ast.parse(expression, mode='eval').body

        lookup = {"a": a, "b": b, "c": c}

        def eval_expr(node):
            if isinstance(node, ast.Num):
                return node.n
            elif isinstance(node, ast.BinOp):
                return operators[type(node.op)](float(eval_expr(node.left)), float(eval_expr(node.right)))
            elif isinstance(node, ast.UnaryOp):
                return operators[type(node.op)](eval_expr(node.operand))
            elif isinstance(node, ast.Attribute):
                if node.value.id in lookup:
                    if node.attr == "width" or node.attr == "height":
                        return self.get_size(lookup[node.value.id], node.attr)

                return self.get_widget_value(extra_pnginfo, prompt, node.value.id, node.attr)
            elif isinstance(node, ast.Name):
                if node.id in lookup:
                    val = lookup[node.id]
                    if isinstance(val, (int, float, complex)):
                        return val
                    else:
                        raise TypeError(
                            f"Compex types (LATENT/IMAGE) need to reference their width/height, e.g. {node.id}.width")
                raise NameError(f"Name not found: {node.id}")
            elif isinstance(node, ast.Call):
                if node.func.id in functions:
                    fn = functions[node.func.id]
                    l = len(node.args)
                    if l < fn["args"][0] or (fn["args"][1] is not None and l > fn["args"][1]):
                        if fn["args"][1] is None:
                            toErr = " or more"
                        else:
                            toErr = f" to {fn['args'][1]}"
                        raise SyntaxError(
                            f"Invalid function call: {node.func.id} requires {fn['args'][0]}{toErr} arguments")
                    args = []
                    for arg in node.args:
                        args.append(eval_expr(arg))
                    return fn["call"](*args)
                raise NameError(f"Invalid function call: {node.func.id}")
            else:
                raise TypeError(node)

        r = eval_expr(node)
        return {"ui": {"value": [r]}, "result": (int(r), float(r),)}