
# Documentation
- Class name: ToImageList
- Category: Bmad/Lists/Make or Intercalate
- Output node: False
- Repo Ref: https://github.com/bmad4ever/ComfyUI-Bmad-Custom-Nodes

ToImageList节点旨在将一组图像转换为标准化的列表格式。这一功能对于以统一的方式处理多个图像至关重要，使得对整个图像集合进行操作、分析和应用图像处理变得更加容易。

# Input types
## Required
- inputs_len
    - 'inputs_len'参数代表要转换为列表的图像集合。这个输入对节点的操作至关重要，因为它决定了将要进行转换处理的图像集合。
    - Comfy dtype: INT
    - Python dtype: List[torch.Tensor]

# Output types
- image
    - 'image'输出是一个由输入集合转换而来的图像列表。这种标准化的格式便于对图像进行进一步的处理和操作。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToImageList(metaclass=MakeListMeta): TYPE = "IMAGE"

```
