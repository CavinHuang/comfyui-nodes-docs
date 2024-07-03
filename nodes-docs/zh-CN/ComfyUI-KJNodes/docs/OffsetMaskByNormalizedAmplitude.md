
# Documentation
- Class name: OffsetMaskByNormalizedAmplitude
- Category: KJNodes/audio
- Output node: False

OffsetMaskByNormalizedAmplitude节点根据音频信号的归一化振幅对掩码进行变换。它调整掩码的方向和位置，利用振幅来决定旋转和位移的程度，从而实现与音频强度同步的动态视觉效果。

# Input types
## Required
- normalized_amp
    - 音频信号的归一化振幅值数组，用于确定变换的程度。
    - Comfy dtype: NORMALIZED_AMPLITUDE
    - Python dtype: numpy.ndarray
- mask
    - 待变换的掩码，代表一个视觉元素，其修改由音频振幅驱动。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- x
    - 水平位移因子，影响掩码响应振幅变化的横向移动。
    - Comfy dtype: INT
    - Python dtype: float
- y
    - 垂直位移因子，影响掩码根据振幅变化的纵向位移。
    - Comfy dtype: INT
    - Python dtype: float
- rotate
    - 布尔值，指示是否根据归一化振幅旋转掩码。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- angle_multiplier
    - 旋转角度的乘数，用于缩放归一化振幅对掩码旋转的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- mask
    - 根据音频归一化振幅应用旋转和位移调整后的变换掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OffsetMaskByNormalizedAmplitude:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "normalized_amp": ("NORMALIZED_AMPLITUDE",),
                "mask": ("MASK",),
                "x": ("INT", { "default": 0, "min": -4096, "max": MAX_RESOLUTION, "step": 1, "display": "number" }),
                "y": ("INT", { "default": 0, "min": -4096, "max": MAX_RESOLUTION, "step": 1, "display": "number" }),
                "rotate": ("BOOLEAN", { "default": False }),
                "angle_multiplier": ("FLOAT", { "default": 0.0, "min": -1.0, "max": 1.0, "step": 0.001, "display": "number" }),
            }
        }

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)
    FUNCTION = "offset"
    CATEGORY = "KJNodes/audio"
    DESCRIPTION = """
Works as a bridge to the AudioScheduler -nodes:  
https://github.com/a1lazydog/ComfyUI-AudioScheduler  
Offsets masks based on the normalized amplitude.
"""

    def offset(self, mask, x, y, angle_multiplier, rotate, normalized_amp):

         # Ensure normalized_amp is an array and within the range [0, 1]
        offsetmask = mask.clone()
        normalized_amp = np.clip(normalized_amp, 0.0, 1.0)
       
        batch_size, height, width = mask.shape

        if rotate:
            for i in range(batch_size):
                rotation_amp = int(normalized_amp[i] * (360 * angle_multiplier))
                rotation_angle = rotation_amp
                offsetmask[i] = TF.rotate(offsetmask[i].unsqueeze(0), rotation_angle).squeeze(0)
        if x != 0 or y != 0:
            for i in range(batch_size):
                offset_amp = normalized_amp[i] * 10
                shift_x = min(x*offset_amp, width-1)
                shift_y = min(y*offset_amp, height-1)
                if shift_x != 0:
                    offsetmask[i] = torch.roll(offsetmask[i], shifts=int(shift_x), dims=1)
                if shift_y != 0:
                    offsetmask[i] = torch.roll(offsetmask[i], shifts=int(shift_y), dims=0)
        
        return offsetmask,

```
