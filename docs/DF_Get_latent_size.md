
# Documentation
- Class name: DF_Get_latent_size
- Category: Derfuu_Nodes/Functions
- Output node: False

DF_Get_latent_size节点旨在计算并返回潜在表示的尺寸，可以是原始尺寸或缩放后的尺寸。它简化了处理潜在数据结构的复杂性，提供了直接访问其大小属性的方法。

# Input types
## Required
- latent
    - latent输入代表了需要计算大小的数据结构。它对于根据潜在变量的当前状态确定尺寸至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict
- original
    - 这个布尔参数决定是返回潜在变量的原始大小还是缩放后的大小。它通过可能改变返回的尺寸来影响计算结果。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool

# Output types
- WIDTH
    - Comfy dtype: INT
    - 代表潜在变量大小的宽度维度。
    - Python dtype: int
- HEIGHT
    - Comfy dtype: INT
    - 代表潜在变量大小的高度维度。
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetLatentSize:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent": Field.latent(),
                "original": Field.field([False, True]),
            }
        }

    RETURN_TYPES = ("INT", "INT",)
    RETURN_NAMES = ("WIDTH", "HEIGHT")
    CATEGORY = TREE_FUNCTIONS

    FUNCTION = 'get_size'

    def get_size(self, latent, original):
        size = sizes.get_latent_size(latent, original)
        return (size[0], size[1],)

```
