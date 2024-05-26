# Documentation
- Class name: RetrieveBackendData
- Category: InspirePack/Backend
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在从后端缓存系统中提取数据，为基于指定键访问存储信息提供了一种流线化的方法。它作为数据检索工作流中的关键组件，确保了高效准确的访问后端数据，无需重复获取数据。

# Input types
## Required
- key
    - ‘key’参数对于从后端缓存中识别要检索的特定数据集至关重要。它作为一个唯一标识符，使节点能够定位并返回正确的信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- data
    - ‘data’输出代表从后端缓存中检索到的信息。它是节点功能的关键组成部分，因为它将请求的数据传递给工作流的后续阶段。
    - Comfy dtype: COMBO[any_typ]
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class RetrieveBackendData:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'key': ('STRING', {'multiline': False, 'placeholder': "Input data key (e.g. 'model a', 'chunli lora', 'girl latent 3', ...)"})}}
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('data',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Backend'

    def doit(self, key):
        global cache
        (is_list, data) = cache[key][1]
        if is_list:
            return (data,)
        else:
            return ([data],)
```