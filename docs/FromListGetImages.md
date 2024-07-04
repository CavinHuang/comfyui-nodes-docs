
# Documentation
- Class name: FromListGetImages
- Category: Bmad/Lists/GetAll
- Output node: False

FromListGetImages节点旨在根据给定索引从图像列表中检索特定图像。它支持随机访问列表中的图像，包括使用负索引实现反向访问图像的功能。

# Input types
## Required
- list
    - list参数代表要从中检索特定图像的图像列表。它对于指定图像来源至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Output types
- image
    - 此输出是从列表中指定位置检索到的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetImages(metaclass=UnMakeListMeta):  TYPE = "IMAGE"

```
