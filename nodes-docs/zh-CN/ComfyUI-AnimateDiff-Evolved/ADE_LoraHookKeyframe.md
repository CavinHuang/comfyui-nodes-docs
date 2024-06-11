# LoRA Hook Keyframe 🎭🅐🅓
## Documentation
- Class name: ADE_LoraHookKeyframe
- Category: Animate Diff 🎭🅐🅓/conditioning/schedule lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点用于创建LoRA挂钩关键帧，这是在动画序列中特定点调整LoRA（低秩适应）挂钩影响的机制。它允许动态调度LoRA挂钩的强度，从而在动画过程中精确控制其效果。

## Input types
### Required
- strength_model
    - 指定关键帧处LoRA挂钩的强度，影响挂钩在动画中此点对模型行为的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_percent
    - 确定关键帧效果的起始点，占总动画长度的百分比，允许精确控制LoRA挂钩影响的时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guarantee_steps
    - 保证关键帧效果将应用的最小步数，确保LoRA挂钩的影响至少维持此持续时间。
    - Comfy dtype: INT
    - Python dtype: int

### Optional
- prev_hook_kf
    - 可选的前一个LoRA挂钩关键帧组，新的关键帧将添加到其中，允许链式连接多个关键帧以实现复杂的动画效果。
    - Comfy dtype: LORA_HOOK_KEYFRAMES
    - Python dtype: LoraHookKeyframeGroup

## Output types
- HOOK_KF
    - Comfy dtype: LORA_HOOK_KEYFRAMES
    - 返回一组LoRA挂钩关键帧，包括新创建的关键帧，便于在动画中管理和应用多个关键帧。
    - Python dtype: LoraHookKeyframeGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CreateLoraHookKeyframe:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
            },
            "optional": {
                "prev_hook_kf": ("LORA_HOOK_KEYFRAMES",),
            }
        }
    
    RETURN_TYPES = ("LORA_HOOK_KEYFRAMES",)
    RETURN_NAMES = ("HOOK_KF",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/schedule lora hooks"
    FUNCTION = "create_hook_keyframe"

    def create_hook_keyframe(self, strength_model: float, start_percent: float, guarantee_steps: float,
                             prev_hook_kf: LoraHookKeyframeGroup=None):
        if prev_hook_kf:
            prev_hook_kf = prev_hook_kf.clone()
        else:
            prev_hook_kf = LoraHookKeyframeGroup()
        keyframe = LoraHookKeyframe(strength=strength_model, start_percent=start_percent, guarantee_steps=guarantee_steps)
        prev_hook_kf.add(keyframe)
        return (prev_hook_kf,)