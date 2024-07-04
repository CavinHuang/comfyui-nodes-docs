
# Documentation
- Class name: SaltDisplayAny
- Category: SALT/Utility
- Output node: True

SaltDisplayAny节点旨在通用地显示任何类型的输入数据，将其转换为人类可读的格式，或者指示无法显示该数据类型。它支持广泛的数据类型，包括基本类型如字符串和数字，复杂数据结构如字典和列表，甚至PyTorch张量，使其成为数据可视化和调试的多功能实用工具。

# Input types
## Required
- input_value
    - input_value参数接受任何数据类型，这使得该节点在显示各种形式的数据时具有高度的通用性。它决定了将被转换为可读格式或被指示为不可显示的内容，具体取决于数据类型。
    - Comfy dtype: *
    - Python dtype: AnyType

# Output types
- output
    - output参数提供输入数据的人类可读表示，或者一条指示无法显示该数据类型的消息。它对于以用户友好的方式可视化数据至关重要。
    - Comfy dtype: *
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltDisplayAny:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input_value": (WILDCARD, {}),
            },
        }

    RETURN_TYPES = (WILDCARD, )
    RETURN_NAMES = ("output", )
    WEB_DIRECTORY = "./web"

    FUNCTION = "main"
    OUTPUT_NODE = True
    CATEGORY = "SALT/Utility"

    def main(self, input_value=None):
        if input_value is None:
            return {"ui": {"text":""}, "result": ("",)}

        if isinstance(input_value, (str, int, float, bool)):
            value = str(input_value)
        elif isinstance(input_value, (dict, list)):
            try:
                value = json.dumps(input_value)
            except Exception:
                value = "Data could not be serialized."
        elif isinstance(input_value, torch.Tensor):
            value = str(input_value.shape)
        else:
            value = f"Data type {type(input_value).__name__} cannot be displayed"

        return {"ui": {"text": value}, "result": (input_value,)}

```
