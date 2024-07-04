
# Documentation
- Class name: RetrieveBackendDataNumberKey __Inspire
- Category: InspirePack/Backend
- Output node: False

RetrieveBackendDataNumberKey节点旨在通过数字键从后端缓存中获取并返回相关数据。它抽象了数据检索过程的复杂性，实现了通过键高效访问缓存数据，并支持根据缓存内容结构将数据作为列表处理。

# Input types
## Required
- key
    - key参数是一个用于从后端缓存中检索特定数据的数字标识符。它在高效访问所需数据方面发挥着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- data
    - data输出代表使用数字键从后端缓存中检索到的数据。根据缓存内容的结构，它可能以单个项目或列表的形式返回。
    - Comfy dtype: *
    - Python dtype: Tuple[Any, ...]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RetrieveBackendDataNumberKey(RetrieveBackendData):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "key": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

```
