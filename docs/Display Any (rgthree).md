
# Documentation
- Class name: Display Any (rgthree)
- Category: rgthree
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Display Any节点旨在显示任何类型的数据，它能够优雅地处理各种数据格式和类型。该节点尝试将输入数据序列化为JSON字符串以便显示，如果序列化失败，则会退回到简单的字符串表示。这确保了任何数据都可以被可视化。

# Input types
## Required
- source
    - source参数接受任何类型的数据，这使得该节点在显示不同数据格式方面具有高度的通用性。它在节点处理和可视化任何输入数据的能力中扮演着至关重要的角色，无论数据的复杂性或类型如何。
    - Comfy dtype: *
    - Python dtype: AnyType

# Output types
- ui
    - ui输出参数提供了一个用户界面元素，具体来说是一个文本显示，用于可视化输入数据。这允许以可读格式轻松显示任何数据类型。
    - Comfy dtype: UI
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeDisplayAny:
  """Display any data node."""

  NAME = get_name('Display Any')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "source": (any, {}),
      },
    }

  RETURN_TYPES = ()
  FUNCTION = "main"
  OUTPUT_NODE = True

  def main(self, source=None):
    value = 'None'
    if source is not None:
      try:
        value = json.dumps(source)
      except Exception:
        try:
          value = str(source)
        except Exception:
          value = 'source exists, but could not be serialized.'

    return {"ui": {"text": (value,)}}

```
