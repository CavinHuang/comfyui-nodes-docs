
# Documentation
- Class name: ExtendImageList
- Category: Bmad/Lists/Extend
- Output node: False

ExtendImageList节点旨在向现有图像列表中添加新的图像。它专注于将多个图像资源聚合到一个综合集合中，便于进行需要批量图像数据管理的操作。

# Input types
## Required
- inputs_len
    - 'inputs_len'参数对于定义扩展前集合的起始点至关重要。它代表了要扩展的初始图像数量，为扩展过程奠定了基础。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 'image'参数代表扩展过程后的最终图像集合。它包含了原始图像和新添加的图像，为进一步处理提供了一个统一的集合。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendImageList(metaclass=ExtendListMeta): TYPE = "IMAGE"

```
