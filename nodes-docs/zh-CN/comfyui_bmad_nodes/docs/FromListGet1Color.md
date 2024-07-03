
# Documentation
- Class name: FromListGet1Color
- Category: Bmad/Lists/Get1
- Output node: False

FromListGet1Color 节点设计用于从颜色列表中根据指定索引检索单个颜色值。它简化了访问列表元素的过程，允许以用户友好的方式直接检索颜色信息。

# Input types
## Required
- list
    - 此参数表示将从中检索单个颜色的颜色列表。该列表必须包含颜色值，节点将根据提供的索引访问其中之一。
    - Comfy dtype: COLOR
    - Python dtype: List[str]
- index
    - 索引参数指定从颜色列表中检索颜色的位置。它支持正向和负向索引，使得可以从列表的开头或末尾访问元素。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- color
    - 输出是从输入颜色列表中指定位置检索到的单个颜色值。
    - Comfy dtype: COLOR
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGet1Color(metaclass=GetSingleFromListMeta):  TYPE = "COLOR"

```
