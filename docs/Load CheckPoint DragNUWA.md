# Documentation
- Class name: LoadCheckPointDragNUWA
- Category: DragNUWA
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-DragNUWA.git

这个节点类封装了加载和操作DragNUWA模型的功能，使用户能够通过各种输入（如跟踪点或光流数据）对模型进行条件化，从而生成高保真度的视频帧。它通过抽象底层模型的复杂性并为视频帧生成提供一个简单的接口，简化了创建复杂视觉效果的过程。

# Input types
## Required
- ckpt_name
    - 检查点名称至关重要，因为它标识了要加载的特定DragNUWA模型。它影响生成的视频帧的质量和特性，确保为手头任务使用正确的模型配置。
    - Comfy dtype: COMBO
    - Python dtype: str
- dimension
    - 尺寸参数决定了模型将生成的视频帧的分辨率。它对于确保输出匹配所需的格式和质量标准至关重要，这对于下游处理和显示非常关键。
    - Comfy dtype: COMBO
    - Python dtype: str
- model_length
    - 模型长度参数很重要，因为它设置了模型的时间维度，决定了模型可以处理的帧数。它影响生成视频的范围和模型随时间捕捉运动和细节的能力。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 输出模型是后续视频帧生成的核心组件。它封装了产生高质量视觉内容所需的学习模式和特性。模型的输出在实现期望的视觉效果和满足创意目标方面起着关键作用。
    - Comfy dtype: DragNUWA
    - Python dtype: Drag

# Usage tips
- Infra type: GPU

# Source code
```
class LoadCheckPointDragNUWA:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'ckpt_name': (['dragnuwa-svd-pruned.fp16.safetensors'], {'default': 'dragnuwa-svd-pruned.fp16.safetensors'}), 'dimension': (['576x320', '512x512', '320x576'], {'default': '576x320'}), 'model_length': ('INT', {'default': 14})}}
    RETURN_TYPES = ('DragNUWA',)
    RETURN_NAMES = ('model',)
    FUNCTION = 'load_dragnuwa'
    CATEGORY = 'DragNUWA'

    def load_dragnuwa(self, ckpt_name, dimension, model_length):
        width = int(dimension.split('x')[0])
        height = int(dimension.split('x')[1])
        comfy_path = os.path.dirname(folder_paths.__file__)
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        current_path = os.path.abspath(os.path.dirname(__file__))
        sys.path.append(current_path)
        DragNUWA_net = Drag('cuda:0', ckpt_path, f'{comfy_path}/custom_nodes/ComfyUI-DragNUWA/DragNUWA_net.py', height, width, model_length)
        return (DragNUWA_net,)
```