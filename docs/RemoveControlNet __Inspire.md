
# Documentation
- Class name: RemoveControlNet __Inspire
- Category: InspirePack/Util
- Output node: False

该节点旨在从给定数据集中的区域提示中移除控制网络。它遍历每个区域提示，提取正面和负面条件文本，应用一个过程来从这些文本中移除控制网络，然后使用更新后的条件重新组装提示。其目的是清除数据集中特定控制网络的影响，使其适合进一步处理或分析。

# Input types
## Required
- conditioning
    - 需要从中移除控制网络影响的条件数据。此过程旨在净化条件以供后续使用，确保其不包含特定的控制网络属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]

# Output types
- conditioning
    - 已移除控制网络的条件数据。此输出已经过净化，不再包含先前指定的控制网络影响，可以用于进一步处理。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemoveControlNet:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning": ("CONDITIONING", )}}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, conditioning):
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]

            if 'control' in n[1]:
                del n[1]['control']
            if 'control_apply_to_uncond' in n[1]:
                del n[1]['control_apply_to_uncond']
            c.append(n)

        return (c, )

```
