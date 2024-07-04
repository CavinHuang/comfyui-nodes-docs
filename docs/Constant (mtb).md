# Documentation
- Class name: `Constant (mtb)`
- Category: `mtb/utils`
- Output node: `False`

MTB_Constant节点旨在输出一个常量值。它作为图中的一个工具节点，提供一个固定值，可以作为其他节点的输入，方便基于预定义常量创建静态或动态流程。

## Input types
### Required
- **`Value`**
    - 表示节点将输出的常量值。此参数对于定义将在图中传递的静态数据至关重要，影响后续操作。
    - Comfy dtype: `*`
    - Python dtype: `str | int | float | dict | list | bool | None`

## Output types
- **`output`**
    - Comfy dtype: `*`
    - MTB_Constant节点的输出，即由输入参数定义的常量值。该值将在图中传递，以供后续节点使用。
    - Python dtype: `str | int | float | dict | list | bool | None`

## Usage tips
- Infra type: `CPU`
- Common nodes: unknown

## Source code
```python
class MTB_Constant:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"Value": ("*",)},
        }

    RETURN_TYPES = ("*",)
    RETURN_NAMES = ("output",)
    CATEGORY = "mtb/utils"
    FUNCTION = "execute"

    def execute(
        self,
        **kwargs,
    ):
        log.debug("Received kwargs")
        log.debug(json.dumps(kwargs, check_circular=True))
        return (kwargs.get("Value"),)
```