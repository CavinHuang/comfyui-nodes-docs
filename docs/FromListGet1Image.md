
# Documentation
- Class name: FromListGet1Image
- Category: Bmad/Lists/Get1
- Output node: False

FromListGet1Image 节点的设计目的是从一个图像列表中根据指定的索引检索单个图像。该节点支持随机访问，包括使用负索引从列表末尾访问元素，使其在各种图像处理任务中具有多功能性。

# Input types
## Required
- list
    - 要从中检索单个图像的图像列表。该参数对于指定图像的来源至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- index
    - 从列表中检索图像的索引。支持使用负索引进行反向访问。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从列表中指定索引检索到的单个图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Image(metaclass=GetSingleFromListMeta):  TYPE = "IMAGE"

```
