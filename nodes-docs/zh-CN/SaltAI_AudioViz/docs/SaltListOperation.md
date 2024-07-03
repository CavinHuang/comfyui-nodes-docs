
# Documentation
- Class name: `SaltListOperation`
- Category: `SALT/Scheduling/Filter`
- Output node: `False`

SaltListOperation节点旨在对调度列表执行数值运算，允许基于预定义的操作动态调整调度值。该节点有助于在调度上下文中操作数值列表，实现更复杂和定制化的调度行为。

# Input types
## Required
- operation
    - 'operation'参数指定要应用于调度列表的数值运算类型。它的选择决定了如何操作列表值，从而影响最终调度的特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- output_type
    - 'output_type'参数定义了运算结果的期望数据类型，允许自定义输出格式以满足后续处理需求。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
## Optional
- schedule_list_a
    - 'schedule_list_a'参数表示要操作的主要数值列表，作为指定操作的输入之一。
    - Comfy dtype: *
    - Python dtype: List[float]
- schedule_list_b
    - 'schedule_list_b'参数是涉及需要两个输入列表的操作（如'add'或'subtract'）的次要数值列表。
    - Comfy dtype: *
    - Python dtype: List[float]
- expression
    - 'expression'参数允许输入自定义数学表达式，以应用于调度列表，为列表操作提供高级灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- schedule_list
    - 'schedule_list'是将指定操作应用于输入调度列表的结果。它反映了修改后的值序列，可用于进一步的调度使用。
    - Comfy dtype: *
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltListOperation:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "operation": (
                    ["add", "subtract", "multiply", "divide", "average", "max", "min", "normalize_a",
                     "logarithmic", "exponential", "sin", "cos", "tan", "arcsin", "arccos", "arctan",
                     "percentage_of", "modulo", "custom_expression"],
                ),
                "output_type": (["default", "int", "float", "boolean"],)
            },
            "optional": {
                "schedule_list_a": (WILDCARD,),
                "schedule_list_b": (WILDCARD,),
                "expression": ("STRING", {"default": "", "placeholder": "Custom expression...", "multiline": True})
            }
        }

    RETURN_TYPES = (WILDCARD,)
    RETURN_NAMES = ("schedule_list",)
    FUNCTION = "calculate"
    CATEGORY = "SALT/Scheduling/Filter"

    def calculate(self, operation, output_type, schedule_list_a=[0], schedule_list_b=[0], expression=""):
        if not isinstance(schedule_list_a, list):
            schedule_list_a = [schedule_list_a]
        if not isinstance(schedule_list_b, list):
            schedule_list_b = [schedule_list_b]

        # expand the lists to match the longest list
        longest_list_length = max(len(schedule_list_a), len(schedule_list_b))
        if len(schedule_list_a) < longest_list_length:
            schedule_list_a += [schedule_list_a[-1]] * (longest_list_length - len(schedule_list_a))
        if len(schedule_list_b) < longest_list_length:
            schedule_list_b += [schedule_list_b[-1]] * (longest_list_length - len(schedule_list_b))

        result_list = []

        if operation != "custom_expression":
            for i in range(longest_list_length):
                a = schedule_list_a[i]
                b = schedule_list_b[i] if schedule_list_b is not None else 0

                match operation:
                    case "add":
                        result_list.append(a + b)
                    case "subtract":
                        result_list.append(a - b)
                    case "multiply":
                        result_list.append(a * b)
                    case "divide":
                        result_list.append(a / b if b != 0 else 0)
                    case "average":
                        result_list.append((a + b) / 2)
                    case "max":
                        result_list.append(max(a, b))
                    case "min":
                        result_list.append(min(a, b))
                    case "logarithmic":
                        result_list.append(math.log(a) if a > 0 else 0)
                    case "exponential":
                        result_list.append(math.exp(a))
                    case "sin":
                        result_list.append(math.sin(a))
                    case "cos":
                        result_list.append(math.cos(a))
                    case "tan":
                        result_list.append(math.tan(a))
                    case "arcsin":
                        result_list.append(math.asin(a) if -1 <= a <= 1 else 0)
                    case "arccos":
                        result_list.append(math.acos(a) if -1 <= a <= 1 else 0)
                    case "arctan":
                        result_list.append(math.atan(a))
                    case "percentage_of":
                        result_list.append(a * (b / 100))
                    case "modulo":
                        result_list.append(a % b if b != 0 else 0)
        else:
            try:
                # Evaluate custom expression
                result_list = [
                    safe_eval(expression, custom_vars={"a": a_val, "b": b_val}) 
                    for a_val, b_val in zip(schedule_list_a, schedule_list_b)
                ]
            except Exception as e:
                raise ValueError(f"Unable to evaluate given expression `{expression}`: {e}")

        if operation == "normalize_a":
            max_val = max(schedule_list_a)
            min_val = min(schedule_list_a)
            range_val = max_val - min_val
            if range_val > 0:
                normalized_result_list = []
                for a in schedule_list_a:
                    normalized = (a - min_val) / range_val
                    normalized_result_list.append(normalized)
                result_list = normalized_result_list
            else:
                result_list = schedule_list_a

        # Output type conversion
        match(output_type):
            case "int":
                result_list = [int(val) for val in result_list]
            case "float":
                result_list = [float(val) for val in result_list]
            case "boolean":
                result_list = [bool(val) for val in result_list]

        return (result_list[0],) if len(result_list) == 1 else (result_list,)

```
