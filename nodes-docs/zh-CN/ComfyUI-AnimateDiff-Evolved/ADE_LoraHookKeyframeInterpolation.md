# LoRA Hook Keyframes Interpolation 🎭🅐🅓
## Documentation
- Class name: ADE_LoraHookKeyframeInterpolation
- Category: Animate Diff 🎭🅐🅓/conditioning/schedule lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点用于创建插值的LoRA挂钩关键帧，从而动态调整模型行为随时间的变化。它基于指定的起始和结束百分比、强度和插值方法生成一系列关键帧，从而实现对模型参数的细粒度控制。

## Input types
### Required
- start_percent
    - 定义插值的起始百分比，设置生成关键帧序列的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 指定插值的结束百分比，确定生成关键帧序列的终点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_start
    - 设置插值的初始强度值，标记强度调整范围的开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_end
    - 确定插值的结束强度值，结束强度调整范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- interpolation
    - 选择用于生成关键帧序列的插值方法，影响起始和结束值之间的过渡。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: InterpolationMethod
- intervals
    - 指定起始和结束点之间生成的间隔（或关键帧）数，影响插值的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- print_keyframes
    - 可选。控制是否记录生成的关键帧，有助于调试和可视化插值过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

### Optional
- prev_hook_kf
    - 可选。允许包括先前定义的一组LoRA挂钩关键帧，新的插值关键帧将添加到其中。
    - Comfy dtype: LORA_HOOK_KEYFRAMES
    - Python dtype: LoraHookKeyframeGroup

## Output types
- HOOK_KF
    - Comfy dtype: LORA_HOOK_KEYFRAMES
    - 返回一组LoRA挂钩关键帧，包括先前存在的和新插值的关键帧，准备在模型条件中应用。
    - Python dtype: LoraHookKeyframeGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CreateLoraHookKeyframeInterpolation:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "strength_start": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.001}, ),
                "strength_end": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.001}, ),
                "interpolation": (InterpolationMethod._LIST, ),
                "intervals": ("INT", {"default": 5, "min": 2, "max": 100, "step": 1}),
                "print_keyframes": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "prev_hook_kf": ("LORA_HOOK_KEYFRAMES",),
            }
        }
    
    RETURN_TYPES = ("LORA_HOOK_KEYFRAMES",)
    RETURN_NAMES = ("HOOK_KF",)
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/schedule lora hooks"
    FUNCTION = "create_hook_keyframes"

    def create_hook_keyframes(self,
                              start_percent: float, end_percent: float,
                              strength_start: float, strength_end: float, interpolation: str, intervals: int,
                              prev_hook_kf: LoraHookKeyframeGroup=None, print_keyframes=False):
        if prev_hook_kf:
            prev_hook_kf = prev_hook_kf.clone()
        else:
            prev_hook_kf = LoraHookKeyframeGroup()
        percents = InterpolationMethod.get_weights(num_from=start_percent, num_to=end_percent, length=intervals, method=interpolation)
        strengths = InterpolationMethod.get_weights(num_from=strength_start, num_to=strength_end, length=intervals, method=interpolation)
        
        is_first = True
        for percent, strength in zip(percents, strengths):
            guarantee_steps = 0
            if is_first:
                guarantee_steps = 1
                is_first = False
            prev_hook_kf.add(LoraHookKeyframe(strength=strength, start_percent=percent, guarantee_steps=guarantee_steps))
            if print_keyframes:
                logger.info(f"LoraHookKeyframe - start_percent:{percent} = {strength}")
        return (prev_hook_kf,)