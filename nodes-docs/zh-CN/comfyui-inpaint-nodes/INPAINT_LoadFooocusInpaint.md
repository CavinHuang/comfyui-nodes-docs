# Documentation
- Class name: LoadFooocusInpaint
- Category: inpaint
- Output node: False
- Repo Ref: https://github.com/Acly/comfyui-inpaint-nodes

该节点旨在加载并整合用于图像修复任务的两个关键组件：头部模型和补丁数据。它协调从保存的状态字典中加载头部模型和从指定文件中加载补丁数据的过程，确保这两个组件准备就绪，可用于图像修复过程。

# Input types
## Required
- head
    - ‘head’参数指定头部模型的文件路径，这对于图像修复过程至关重要。它用于引导生成修复的内容。
    - Comfy dtype: str
    - Python dtype: str
- patch
    - ‘patch’参数表示补丁数据的文件路径，这对于图像修复任务是不可或缺的。它提供了模型理解待修复区域上下文所需的信息。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- INPAINT_PATCH
    - 输出包含一对：已加载的头部模型和补丁数据。这些对于图像修复过程至关重要，因为它们提供了生成最终修复结果所需的结构和上下文信息。
    - Comfy dtype: COMBO[(torch.nn.Module, Any)]
    - Python dtype: Tuple[torch.nn.Module, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class LoadFooocusInpaint:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'head': (folder_paths.get_filename_list('inpaint'),), 'patch': (folder_paths.get_filename_list('inpaint'),)}}
    RETURN_TYPES = ('INPAINT_PATCH',)
    CATEGORY = 'inpaint'
    FUNCTION = 'load'

    def load(self, head: str, patch: str):
        head_file = folder_paths.get_full_path('inpaint', head)
        inpaint_head_model = InpaintHead()
        sd = torch.load(head_file, map_location='cpu')
        inpaint_head_model.load_state_dict(sd)
        patch_file = folder_paths.get_full_path('inpaint', patch)
        inpaint_lora = comfy.utils.load_torch_file(patch_file, safe_load=True)
        return ((inpaint_head_model, inpaint_lora),)
```