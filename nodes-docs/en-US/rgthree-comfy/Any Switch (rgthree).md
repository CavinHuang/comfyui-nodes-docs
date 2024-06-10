---
tags:
- ConditionalSelection
---

# Any Switch (rgthree)
## Documentation
- Class name: `Any Switch (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Any Switch node is designed to select and output the first non-empty item from a set of optional inputs. It abstracts the complexity of handling various types of inputs by evaluating them to find the first one that is not considered 'empty' or 'none', making it versatile for different data types and scenarios.
## Input types
### Required
### Optional
- **`any_i`**
    - Represents an optional input that can be of any type. The node sequentially evaluates these inputs, starting from the first, and selects the first non-empty one, directly affecting the output. This naming convention applies to all inputs from 'any_01' to 'any_05', indicating their order in the selection process.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - Outputs the first non-empty input encountered among the optional inputs. This output is versatile, accommodating any data type provided to the node.
    - Python dtype: `Any`
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
