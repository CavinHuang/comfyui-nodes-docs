# AnimateDiff+CameraCtrl Keyframe 🎭🅐🅓
## Documentation
- Class name: ADE_CameraCtrlAnimateDiffKeyframe
- Category: Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在生成和管理包含摄像机控制的动画关键帧，从而在AnimateDiff框架内创建动态和复杂的摄像机运动。它允许指定动画的起始百分比，应用多值进行缩放、效果和摄像机控制，并继承缺失值以确保关键帧之间的连续性。

## Input types
### Required
- start_percent
    - 指定动画的起始百分比，允许精确控制动画中摄像机运动和效果的时间。
    - Comfy dtype: FLOAT
    - Python dtype: float

### Optional
- prev_ad_keyframes
    - 可选。允许包括先前定义的AnimateDiff关键帧，使动画可以进行更复杂的序列链和层叠。
    - Comfy dtype: AD_KEYFRAMES
    - Python dtype: ADKeyframeGroup or None
- scale_multival
    - 可选。应用缩放因子到动画，允许调整动画元素的大小。
    - Comfy dtype: MULTIVAL
    - Python dtype: float or torch.Tensor
- effect_multival
    - 可选。应用各种效果到动画，允许添加视觉增强或修改。
    - Comfy dtype: MULTIVAL
    - Python dtype: float or torch.Tensor
- cameractrl_multival
    - 可选。指定摄像机控制的多个值，允许在动画中创建复杂的摄像机运动。
    - Comfy dtype: MULTIVAL
    - Python dtype: float or torch.Tensor
- inherit_missing
    - 确定当前关键帧中的缺失值是否应继承自前面的关键帧，以确保动画的连续性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- guarantee_steps
    - 指定动画中保证的最小步数，确保一定程度的平滑和连续性。
    - Comfy dtype: INT
    - Python dtype: int

## Output types
- ad_keyframes
    - Comfy dtype: AD_KEYFRAMES
    - 生成一系列AnimateDiff关键帧，使动画具有复杂的摄像机运动。
    - Python dtype: ADKeyframeGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class CameraCtrlADKeyframeNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}, ),
            },
            "optional": {
                "prev_ad_keyframes": ("AD_KEYFRAMES", ),
                "scale_multival": ("MULTIVAL",),
                "effect_multival": ("MULTIVAL",),
                "cameractrl_multival": ("MULTIVAL",),
                "inherit_missing": ("BOOLEAN", {"default": True}, ),
                "guarantee_steps": ("INT", {"default": 1, "min": 0, "max": BIGMAX}),
            }
        }
    
    RETURN_TYPES = ("AD_KEYFRAMES", )
    FUNCTION = "load_keyframe"

    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②/CameraCtrl"

    def load_keyframe(self,
                      start_percent: float, prev_ad_keyframes=None,
                      scale_multival: Union[float, torch.Tensor]=None, effect_multival: Union[float, torch.Tensor]=None,
                      cameractrl_multival: Union[float, torch.Tensor]=None,
                      inherit_missing: bool=True, guarantee_steps: int=1):
        return ADKeyframeNode.load_keyframe(self,
                    start_percent=start_percent, prev_ad_keyframes=prev_ad_keyframes,
                    scale_multival=scale_multival, effect_multival=effect_multival, cameractrl_multival=cameractrl_multival,
                    inherit_missing=inherit_missing, guarantee_steps=guarantee_steps
                )