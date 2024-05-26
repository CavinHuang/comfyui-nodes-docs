# Documentation
- Class name: RetrieveBackendDataNumberKey
- Category: Data Retrieval
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在根据提供的键从后端服务中提取数值数据，便于在无需复杂的数据处理程序的情况下获取特定信息。

# Input types
## Required
- key
    - ‘key’参数至关重要，因为它唯一标识了从后端所需的数据。它作为节点定位和检索正确数值的参考。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- data
    - 输出‘data’代表从后端获取的与输入‘key’对应的数值。它是节点执行的直接结果，对进一步的数据分析或处理具有重要价值。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]

# Usage tips
- Infra type: CPU

# Source code
```
class RetrieveBackendDataNumberKey(RetrieveBackendData):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'key': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
```