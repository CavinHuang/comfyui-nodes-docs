# LoRA Hook Keyframes From List 🎭🅐🅓
## Documentation
- Class name: ADE_LoraHookKeyframeFromStrengthList
- Category: Animate Diff 🎭🅐🅓/conditioning/schedule lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点用于根据强度列表创建一系列LoRA挂钩关键帧，从而动态调整模型行为的多个步骤。它允许自定义关键帧属性，如强度和起始百分比，从而精确控制动画或转换过程。

## Input types
### Required
- strengths_float
    - 指定序列中每个关键帧的强度。此参数可以接受单个浮点值或浮点值列表，允许灵活定义每个关键帧的强度。
    - Comfy dtype: FLOAT
    - Python dtype: Union[float, List[float]]
- start_percent
    - 定义关键帧序列的起始百分比，设置动画或转换的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_percent
    - 设置关键帧序列的结束百分比，标记动画或转换的终点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- print_keyframes
    - 一个布尔标志，启用时会将每个关键帧的详细信息打印到日志中，有助于调试和可视化关键帧序列。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

### Optional
- prev_hook_kf
    - 一个可选参数，允许从前一个LoRA挂钩关键帧序列继续，启用序列之间的无缝过渡。
    - Comfy dtype: LORA_HOOK_KEYFRAMES
    - Python dtype: LoraHookKeyframeGroup

## Output types
- HOOK_KF
    - Comfy dtype: LORA_HOOK_KEYFRAMES
    - 返回一组LoRA挂钩关键帧，表示将应用于模型的一系列调整。
    - Python dtype: LoraHookKeyframeGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CreateLoraHookKeyframeFromStrengthList:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "strengths_float": ("FLOAT", {"default": -1, "min": -1, "step": 0.001, "forceInput": True}),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
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

    def create_hook_keyframes(self, strengths_float: Union[float, list[float]],
                              start_percent: float, end_percent: float,
                              prev_hook_kf: LoraHookKeyframeGroup=None, print_keyframes=False):
        if prev_hook_kf:
            prev_hook_kf = prev_hook_kf.clone()
        else:
            prev_hook_kf = LoraHookKeyframeGroup()
        if type(strengths_float) in (float, int):
            strengths_float = [float(strengths_float)]
        elif isinstance(strengths_float, Iterable):
            pass
        else:
            raise Exception(f"strengths_floast must be either an interable input or a float, but was {type(strengths_float).__repr__}.")
        percents = InterpolationMethod.get_weights(num_from=start_percent, num_to=end_percent, length=len(strengths_float), method=InterpolationMethod.LINEAR)

        is_first = True
        for percent, strength in zip(percents, strengths_float):
            guarantee_steps = 0
            if is_first:
                guarantee_steps = 1
                is_first = False
            prev_hook_kf.add(LoraHookKeyframe(strength=strength, start_percent=percent, guarantee_steps=guarantee_steps))
            if print_keyframes:
                logger.info(f"LoraHookKeyframe - start_percent:{percent} = {strength}")
        return (prev_hook_kf,)