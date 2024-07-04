
# Documentation
- Class name: Display Int (rgthree)
- Category: rgthree
- Output node: True

Display Int节点旨在用户界面中展示整数值。它作为一种直观的机制来可视化呈现整数数据，使用户更容易解读和理解数值信息。

# Input types
## Required
- input
    - 此参数代表要显示的整数值。它对节点的运行至关重要，因为它决定了将在用户界面中可视化的数值数据。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- ui
    - 此输出参数提供一个用户界面元素，用于显示传递给节点的整数值。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeDisplayInt:
  """Old DisplayInt node.

  Can be ported over to DisplayAny if https://github.com/comfyanonymous/ComfyUI/issues/1527 fixed.
  """

  NAME = get_name('Display Int')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(s):
    return {
      "required": {
        "input": ("INT", {
          "forceInput": True
        }),
      },
    }

  RETURN_TYPES = ()
  FUNCTION = "main"
  OUTPUT_NODE = True

  def main(self, input=None):
    return {"ui": {"text": (input,)}}

```
