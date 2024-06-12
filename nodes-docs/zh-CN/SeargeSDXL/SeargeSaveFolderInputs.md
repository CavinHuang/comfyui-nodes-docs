# Documentation
- Class name: SeargeSaveFolderInputs
- Category: Searge/_deprecated_/Inputs
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

这个节点类旨在促进将数据保存到指定文件夹的过程，作为用户和保存功能之间的中介。它强调易用性，并确保根据用户的要求将数据引导到正确的位置。

# Input types
## Required
- save_to
    - ‘save_to’参数对于确定数据的目的地文件夹至关重要。它是一个字符串，指定了数据将被保存的路径，其正确使用对节点功能的成功执行至关重要。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- save_to
    - 输出‘save_to’代表确认的文件夹路径，数据将被保存于此。这是标志着节点成功操作和数据正确路由的关键信息。
    - Comfy dtype: str
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeSaveFolderInputs:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'save_to': (SeargeParameterProcessor.SAVE_TO, {'default': SeargeParameterProcessor.SAVE_TO[0]})}}
    RETURN_TYPES = ('SAVE_FOLDER',)
    RETURN_NAMES = ('save_to',)
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Inputs'

    def get_value(self, save_to):
        return (save_to,)
```