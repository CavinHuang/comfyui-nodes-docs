# Documentation
- Class name: AnimateDiffModuleLoader
- Category: Animate Diff
- Output node: False
- Repo Ref: https://github.com/ArtVentureX/comfyui-animatediff.git

该节点旨在动画框架内管理和操作运动模块，专注于集成和应用高级运动技术，以增强动画的动态性和流畅性。

# Input types
## Required
- model_name
    - 模型名称对于识别要加载和操作的特定运动模块至关重要。它决定了动画资产的来源，并为后续操作奠定了基础。
    - Comfy dtype: string
    - Python dtype: str
## Optional
- lora_stack
    - LoRa堆栈是一个可选参数，提供后允许通过逐层调整来微调运动模块。它增强了动画适应性和定制性，以满足特定要求。
    - Comfy dtype: list
    - Python dtype: List[Tuple[Dict[str, torch.Tensor], float]]

# Output types
- motion_module
    - 输出的运动模块是节点处理的结果，代表最终确定和优化的动画模块，准备在动画流程中使用。
    - Comfy dtype: object
    - Python dtype: MotionWrapper

# Usage tips
- Infra type: CPU

# Source code
```
class AnimateDiffModuleLoader:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model_name': (get_available_models(),)}, 'optional': {'lora_stack': ('MOTION_LORA_STACK',)}}
    RETURN_TYPES = ('MOTION_MODULE',)
    CATEGORY = 'Animate Diff'
    FUNCTION = 'load_motion_module'

    def inject_loras(self, motion_module: MotionWrapper, lora_stack: List[Tuple[Dict[str, Tensor], float]]):
        for lora in lora_stack:
            (state_dict, alpha) = lora
            for key in state_dict:
                layer_infos = key.split('.')
                curr_layer = motion_module
                while len(layer_infos) > 0:
                    temp_name = layer_infos.pop(0)
                    curr_layer = curr_layer.__getattr__(temp_name)
                curr_layer.weight.data += alpha * state_dict[key].to(curr_layer.weight.data.device)

    def eject_loras(self, motion_module: MotionWrapper, lora_stack: List[Tuple[float, Dict[str, Tensor]]]):
        lora_stack.reverse()
        for lora in lora_stack:
            (state_dict, alpha) = lora
            for key in state_dict:
                layer_infos = key.split('.')
                curr_layer = motion_module
                while len(layer_infos) > 0:
                    temp_name = layer_infos.pop(0)
                    curr_layer = curr_layer.__getattr__(temp_name)
                curr_layer.weight.data -= alpha * state_dict[key].to(curr_layer.weight.data.device)

    def load_motion_module(self, model_name: str, lora_stack: List=None):
        motion_module = load_motion_module(model_name)
        if motion_module.is_v2:
            if hasattr(motion_module, 'lora_stack') and isinstance(motion_module.lora_stack, list):
                self.eject_loras(motion_module, motion_module.lora_stack)
                delattr(motion_module, 'lora_stack')
            if isinstance(lora_stack, list):
                self.inject_loras(motion_module, lora_stack)
                setattr(motion_module, 'lora_stack', lora_stack)
        elif isinstance(lora_stack, list):
            logger.warning('LoRA is provided but only motion module v2 is supported.')
        return (motion_module,)
```