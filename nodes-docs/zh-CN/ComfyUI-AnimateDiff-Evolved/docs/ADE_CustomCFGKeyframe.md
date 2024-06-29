
# Custom CFG Keyframe 🎭🅐🅓
## Documentation
- Class name: ADE_CustomCFGKeyframe
- Category: Animate Diff 🎭🅐🅓/sample settings
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADE_CustomCFGKeyframe节点旨在创建和管理Animate Diff框架内的自定义配置关键帧。它允许在动画时间线上指定各种动画参数，从而精确控制动画的行为和外观。

## Input types
### Required
- cfg_multival
    - 定义关键帧的配置值，可以影响动画过程的各个方面。对于在特定时间段定制动画特性至关重要。
    - Comfy dtype: MULTIVAL
    - Python dtype: Union[float, torch.Tensor]
- start_percent
    - 指定关键帧在动画时间线中的起始点，以百分比表示，允许精确的时间控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- guarantee_steps
    - 确定应用关键帧配置的最小步数，确保一定的效果持续时间。
    - Comfy dtype: INT
    - Python dtype: int

### Optional
- prev_custom_cfg
    - 通过指定先前的自定义配置组，允许自定义配置关键帧的链式连接，从而实现复杂的动画序列。
    - Comfy dtype: CUSTOM_CFG
    - Python dtype: CustomCFGKeyframeGroup or None

## Output types
- custom_cfg
    - Comfy dtype: CUSTOM_CFG
    - 输出一个封装了定义关键帧的自定义配置对象，准备集成到动画管道中。
    - Python dtype: CustomCFGKeyframeGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CustomCFGKeyframeNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cfg_multival": ("MULTIVAL",),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
            },
            "optional": {
                "prev_custom_cfg": ("CUSTOM_CFG",),
            }
        }

    RETURN_TYPES = ("CUSTOM_CFG",)
    CATEGORY = "Animate Diff 🎭🅐🅓/sample settings"
    FUNCTION = "create_custom_cfg"

    def create_custom_cfg(self, cfg_multival: Union[float, Tensor], start_percent: float=0.0, guarantee_steps: int=1,
                          prev_custom_cfg: CustomCFGKeyframeGroup=None):
        if not prev_custom_cfg:
            prev_custom_cfg = CustomCFGKeyframeGroup()
        prev_custom_cfg = prev_custom_cfg.clone()
        keyframe = CustomCFGKeyframe(cfg_multival=cfg_multival, start_percent=start_percent, guarantee_steps=guarantee_steps)
        prev_custom_cfg.add(keyframe)
        return (prev_custom_cfg,)