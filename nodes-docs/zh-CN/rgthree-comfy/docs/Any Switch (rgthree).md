
# Documentation
- Class name: Any Switch (rgthree)
- Category: rgthree
- Output node: False

Any Switch节点设计用于从一组可选输入中选择并输出第一个非空项。它通过评估各种类型的输入来抽象处理复杂性,以找到第一个不被视为"空"或"无"的输入,使其在不同的数据类型和场景中都具有versatility。

# Input types
## Required
## Optional
- any_i
    - 表示可以是任何类型的可选输入。该节点从第一个开始依次评估这些输入,并选择第一个非空输入,直接影响输出。这种命名约定适用于从'any_01'到'any_05'的所有输入,表明它们在选择过程中的顺序。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
- *
    - 输出在可选输入中遇到的第一个非空输入。这个输出是多功能的,可以容纳提供给节点的任何数据类型。
    - Comfy dtype: *
    - Python dtype: Any


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeAnySwitch:
  """The any switch. """

  NAME = get_name("Any Switch")
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {},
      "optional": {
        "any_01": (any_type,),
        "any_02": (any_type,),
        "any_03": (any_type,),
        "any_04": (any_type,),
        "any_05": (any_type,),
      },
    }

  RETURN_TYPES = (any_type,)
  RETURN_NAMES = ('*',)
  FUNCTION = "switch"

  def switch(self, any_01=None, any_02=None, any_03=None, any_04=None, any_05=None):
    """Chooses the first non-empty item to output."""
    any_value = None
    if not is_none(any_01):
      any_value = any_01
    elif not is_none(any_02):
      any_value = any_02
    elif not is_none(any_03):
      any_value = any_03
    elif not is_none(any_04):
      any_value = any_04
    elif not is_none(any_05):
      any_value = any_05
    return (any_value,)

```
