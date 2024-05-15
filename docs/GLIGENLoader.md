# Documentation
- Class name: GLIGENLoader
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GLIGENLoader节点旨在高效地加载和处理GLIGEN数据。它在数据准备阶段扮演着关键角色，确保正确检索GLIGEN数据并使其可用于后续处理步骤。

# Input types
## Required
- gligen_name
    - 参数'gligen_name'对于识别要加载的特定GLIGEN数据至关重要。节点使用它来定位和检索相应的数据文件，然后处理该文件以供工作流使用。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- GLIGEN
    - 输出的GLIGEN数据代表了从指定GLIGEN文件加载和处理的信息。它为下游任务如分析或进一步数据操作做好了准备。
    - Comfy dtype: GLIGEN
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class GLIGENLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'gligen_name': (folder_paths.get_filename_list('gligen'),)}}
    RETURN_TYPES = ('GLIGEN',)
    FUNCTION = 'load_gligen'
    CATEGORY = 'loaders'

    def load_gligen(self, gligen_name):
        gligen_path = folder_paths.get_full_path('gligen', gligen_name)
        gligen = comfy.sd.load_gligen(gligen_path)
        return (gligen,)
```