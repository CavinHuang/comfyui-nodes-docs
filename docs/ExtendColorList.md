
# Documentation
- Class name: ExtendColorList
- Category: Bmad/Lists/Extend
- Output node: False

ExtendColorList 节点旨在通过添加更多颜色值来扩展现有的颜色列表。这一功能在需要动态扩展颜色选择的场景中至关重要，例如在图像处理、设计应用或数据可视化任务中，更广泛的调色板可能会增强输出的美观性或信息价值。

# Input types
## Required
- inputs_len
    - 指定要添加到现有颜色列表中的颜色值数量。此参数决定了调色板扩展的规模。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- color
    - 扩展后的颜色列表，将原有的颜色列表与新添加的颜色值相结合。这个输出对于后续需要更广泛或修改后的调色板的应用来说意义重大。
    - Comfy dtype: COLOR
    - Python dtype: List[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendColorList(metaclass=ExtendListMeta): TYPE = "COLOR"

```
