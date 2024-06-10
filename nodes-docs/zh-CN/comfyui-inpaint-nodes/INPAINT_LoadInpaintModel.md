# Documentation
- Class name: LoadInpaintModel
- Category: inpaint
- Output node: False
- Repo Ref: https://github.com/Acly/comfyui-inpaint-nodes

LoadInpaintModel 类旨在方便加载修复模型，这些是专门用于填充图像中缺失或损坏部分的神经网络架构。它抽象了模型加载的复杂性，确保加载过程是流畅和可靠的。该节点的功能对于初始化修复过程至关重要，为进一步的图像操作提供了基础。

# Input types
## Required
- model_name
    - 参数 'model_name' 非常重要，因为它标识了要加载的特定修复模型。它通过确定将用于修复任务的神经网络架构，影响节点的执行。正确的模型名称对于实现所需的图像恢复结果至关重要。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- INPAINT_MODEL
    - 输出 'INPAINT_MODEL' 代表已加载的修复模型，可供后续图像处理任务使用。它封装了模型的已训练权重和架构，标志着加载过程的完成，并使模型能够执行其指定功能。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class LoadInpaintModel:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model_name': (folder_paths.get_filename_list('inpaint'),)}}
    RETURN_TYPES = ('INPAINT_MODEL',)
    CATEGORY = 'inpaint'
    FUNCTION = 'load'

    def load(self, model_name: str):
        model_file = folder_paths.get_full_path('inpaint', model_name)
        if model_file is None:
            raise RuntimeError(f'Model file not found: {model_name}')
        if model_file.endswith('.pt'):
            sd = torch.jit.load(model_file, map_location='cpu').state_dict()
        else:
            sd = comfy.utils.load_torch_file(model_file, safe_load=True)
        if 'synthesis.first_stage.conv_first.conv.resample_filter' in sd:
            model = mat.load(sd)
        else:
            model = comfy_extras.chainner_models.model_loading.load_state_dict(sd)
        model = model.eval()
        return (model,)
```